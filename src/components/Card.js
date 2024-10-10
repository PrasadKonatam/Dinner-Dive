import React from "react";
import { useDispatch } from "react-redux";
import cardData from "./CardData";
import "./style.css";
import { ADD } from "../redux/actions/action";

export default function Cards() {
  // const [data, setData] = useState(cardData);
  const data = cardData;

  const dispatch = useDispatch();

  const send = (item) => {
    dispatch(ADD(item));
  };

  return (
    <div className="card_style p-5">
      <h1 className="text-center">Add items to Cart</h1>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((item, id) => {
          return (
            <div
              className="card_style card m-1"
              key={id}
              style={{ width: "20rem" }}
            >
              <img
                src={item.imgdata}
                className="card-img-top mt-2"
                alt={item.rname}
                style={{ height: "15rem" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.rname}</h5>
                <p className="card-text">Price : ₹{item.price}</p>
                <button
                  type="button"
                  className="btn btn-primary col-lg-12"
                  onClick={() => send(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
