import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AOS from "aos";
const Pizza = ({ pizza }) => {
  AOS.init();
  const dispatch = useDispatch();
  const [varient, setVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addToCartClick = () => {
    dispatch(addToCart(pizza, quantity, varient));
  };
  return (
    <div data-aos="zoom-in" className="m-3 shadow-lg p-3 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img
          src={pizza.image}
          alt="pizza"
          className="img-fluid"
          style={{ height: "200px", width: "200px" }}
        />
      </div>
      <div className="d-flex ">
        <div className="w-100 m-1">
          <p>Varients</p>
          <select
            className="form-select "
            value={varient}
            onChange={(e) => setVarient(e.target.value)}
          >
            {pizza.varients.map((item, i) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            value={quantity}
            className="form-select"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[...Array(10).keys()].map((item, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="d-flex mt-2">
        <div className="w-100">
          <p className="mt-1">
            Price: {pizza.prices[0][varient] * quantity} Tk
          </p>
        </div>
        <div className="w-100">
          <button className="btn" onClick={addToCartClick}>
            Add To Cart
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={pizza.image}
            alt="pizza"
            className="img-fluid w-100 h-100"
          />
          <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pizza;
