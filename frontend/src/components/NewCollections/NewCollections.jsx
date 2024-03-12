import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Items from "../Items/Items";

const NewCollections = () => {
  const [new_collection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item) => (
          <Items props={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
