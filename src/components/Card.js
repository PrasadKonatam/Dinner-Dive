import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cardData from "./CardData";
import "./style.css";
import { ADD } from "../redux/actions/action";

export default function Cards() {
  const [data, setData] = useState(cardData);

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
  };

  return (
    <div className="card_style p-5">
      <h1 className="text-center">Add items to Cart</h1>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((item, id) => {
          return (
            <div
              className=" card_style card m-1"
              key={id}
              style={{ width: "20rem" }}
            >
              <img
                src={item.imgdata}
                className="card-img-top mt-2"
                alt="Cart"
                style={{ height: "15rem", width: "" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.rname}</h5>
                <p className="card-text">Price : ₹{item.price}</p>
                <a
                  href="#"
                  className="btn btn-primary col-lg-12"
                  onClick={() => send(item)}
                >
                  Add to Cart
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
