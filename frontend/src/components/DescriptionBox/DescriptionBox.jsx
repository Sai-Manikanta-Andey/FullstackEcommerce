import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Electronic commerce (e-commerce) refers to companies and individuals
          that buy and sell goods and services over the internet. E-commerce
          operates in different types of market segments and can be conducted
          over computers, tablets, smartphones, and other smart devices. Nearly
          every imaginable product and service is available through e-commerce
          transactions, including books, music, plane tickets, and financial
          services such as stock investing and online banking. As such, it is
          considered a very disruptive technology.
        </p>
        <p>
          Ecommerce is one way people buy and sell things in retail. Some
          companies sell products online only, while other sellers use ecommerce
          as a part of a broader strategy that includes physical stores and
          other distribution channels. Either way, ecommerce allows startups,
          small businesses, and large companies to sell products at scale and
          reach customers across the world.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
