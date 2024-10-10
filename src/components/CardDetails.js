import React, { useEffect, useState } from "react";
import Tabel from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DLT, ADD, RMV } from "../redux/actions/action";

function CardDetails() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();

  const getData = useSelector((state) => state.cartReducer.cart);

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  const send = (e) => {
    dispatch(ADD(e));
  };

  const rem = (e) => {
    dispatch(RMV(e));
  };

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id === parseInt(id);
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <div className="container">
      <h1 className="text-center">Item Details Page</h1>
      {data.map((ele) => {
        return (
          <div className="iteamsdetails p-3">
            <div>
              <img src={ele.imgdata} alt="" style={{ height: "18rem" }} />
            </div>
            <div className="ml-2">
              <Tabel>
                <tr>
                  <td>
                    <p>
                      <strong>Restaurent</strong> : {ele.rname}
                    </p>
                    <p>
                      <strong>Price</strong> : ₹ {ele.price}
                    </p>
                    <p>
                      <strong>Dishes</strong> : {ele.address}
                    </p>
                    <p>
                      <strong>Total</strong> : ₹ {ele.price * ele.qnty}{" "}
                    </p>
                    <div
                      className="d-flex justify-content-center align-items-center m-4 p-0"
                      style={{
                        width: 70,
                        cursor: "pointer",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <span
                        style={{ fontSize: "24px", margin: " 2px" }}
                        onClick={() => rem(ele)}
                      >
                        -
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          marginLeft: " 4px",
                          marginRight: "4px",
                        }}
                      >
                        {ele.qnty}
                      </span>
                      <span
                        style={{ fontSize: "24px", margin: " 2px" }}
                        onClick={() => send(ele)}
                      >
                        +
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>
                      <strong>Ratings</strong> :{" "}
                      <span
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: " 2px",
                          borderRadius: "5px",
                        }}
                      >
                        {ele.rating} ★
                      </span>
                    </p>
                    <p>
                      <strong>Order Review </strong> : {ele.somedata}
                    </p>
                    <p style={{ cursor: "pointer" }}>
                      <strong>Remove</strong> :{" "}
                      <i
                        className="fas fa-trash"
                        style={{ color: "red" }}
                        onClick={() => dlt(ele.id)}
                      ></i>
                    </p>
                  </td>
                </tr>
              </Tabel>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardDetails;
