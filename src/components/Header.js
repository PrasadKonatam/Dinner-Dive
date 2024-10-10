import * as React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@mui/material";
import { DLT } from "../redux/actions/action";

function Header() {
  const [price, setPrice] = React.useState();
  const getData = useSelector((state) => state.cartReducer.cart);

  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getData.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  React.useEffect(() => {
    total();
  }, [total]);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
        <Container className="m-3">
          <NavLink
            to="/"
            className="text-decoration-none text-light mx-2"
            href="#home"
          >
            Dinner Dive
          </NavLink>
          <Nav className="me-auto">
            <NavLink
              to="/"
              className="text-decoration-none text-light"
              href="#home"
            >
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={getData.length}
            color="primary"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle} // Moved click handler here for better UX
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        {/* Adjusted Popper for better z-index and positioning */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          modifiers={[
            {
              name: "zIndex",
              enabled: true,
              options: {
                zIndex: 1500, // Ensure Popper has a high z-index
              },
            },
          ]}
          style={{ zIndex: 1500 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {getData.length ? (
                      <div
                        className="cart-details "
                        style={{ width: "25rem", padding: "10px" }}
                      >
                        <Table>
                          <thead>
                            <tr>
                              <th>Photo</th>
                              <th>Restaurant Name</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <hr className="horizontal-line" />
                            </tr>
                            {getData.map((e) => {
                              return (
                                <tr key={e.id}>
                                  <td>
                                    <NavLink
                                      to={`/cart/${e.id}`}
                                      onClick={handleClose}
                                    >
                                      <img
                                        src={e.imgdata}
                                        alt={e.rname}
                                        style={{
                                          width: "9rem",
                                          borderRadius: "2px",
                                        }}
                                      />
                                    </NavLink>
                                  </td>
                                  <td>
                                    <p>{e.rname}</p>
                                    <p>Price : ₹{e.price}</p>
                                    <p>Quantity : {e.qnty}</p>
                                    <p
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i
                                        className="fas fa-trash smalltrash"
                                        onClick={() => dlt(e.id)}
                                      ></i>
                                    </p>
                                  </td>
                                  <td>
                                    <p
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                        margin: "1rem",
                                        marginTop: "2rem",
                                      }}
                                    >
                                      <i
                                        className="fas fa-trash largetrash "
                                        onClick={() => dlt(e.id)}
                                      ></i>
                                    </p>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>

                          <hr className="horizontal-line" />

                          <p style={{ marginLeft: "6rem" }}>Total : ₹{price}</p>
                        </Table>
                      </div>
                    ) : (
                      <div
                        className="cart-details d-flex justify-content-center align-center p-jjj2"
                        style={{ position: "relative" }}
                      >
                        <i
                          className="fas fa-close"
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 15,
                            cursor: "pointer",
                          }}
                          onClick={handleClose}
                        ></i>
                        <p className="mt-3 p-2">Your cart is Empty!</p>
                        <img
                          src="./cart.gif"
                          alt="Empty cart"
                          style={{
                            width: "3rem",
                            height: "3rem",
                            margin: "1rem",
                            marginBottom: "0",
                          }}
                        />
                      </div>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Navbar>
    </>
  );
}

export default Header;
