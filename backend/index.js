const port = 4000 || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();
app.use(express.json());
const deployed_url_backend = "https://good-erin-gosling-wig.cyclic.app";
const corsOptions = {
  origin: [
    "http://localhost:5173",deployed_url_backend,
    "https://fullstack-ecommerce-i476.vercel.app",
    "https://fullstack-ecommerce-sooty.vercel.app",
  ],
};
app.use(cors(corsOptions));
dotenv.config();

//Database connection with MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xslsgb9.mongodb.net/ecommerce`
);

mongoose.connection.once("open", async () => {
  try {
    const documents = await Product.find({}); // Replace YourModel with your actual Mongoose model

    // Update each document with the correct image URL
    for (const document of documents) {
      document.image = document.image.replace(
        "https://tender-plum-greyhound.cyclic.app",
        "https://good-erin-gosling-wig.cyclic.app"
      );
      await document.save();
    }

    console.log("URLs updated successfully.");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error updating URLs:", error);
  }
});
//API creation

app.get("/", (req, res) => {
  res.send("Express running");
});

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//creating upload  endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${deployed_url_backend}/images/${req.file.filename}`,
  });
});

//schema for creating products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({ success: true, name: req.body.name });
});

//creating api endpoint for deleting a product

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating api endpoint for getting all  products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});

//Scehma for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating an endpoint for user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "User already exist" });
  }
  let cart = {};

  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "wrong password" });
    }
  } else {
    res.json({ success: false, error: "Wrong email Id" });
  }
});

//creating endpoint for new collection data

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newcollection fetched");
  res.send(newcollection);
});

//creating an endpoint for popular in women
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("popular in women fetched");
  res.send(popular_in_women);
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  }
};

//creating an endpoint for adding products to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added ");
});

//creating an endpoint for removing a product from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed ");
});

//creating an endpoint for getting cart items
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, async (error) => {
  if (!error) {
    console.log("Server running on port" + port);
  } else {
    console.log("error : " + error);
  }
});
