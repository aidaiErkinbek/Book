import { addDoc } from "firebase/firestore";
import "./OrderForm.css";
import { ordersCollection } from "../../firebase";
import { AppContext } from "../../App";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export default function OrderForm({ active, setActive }) {
  const { cart, setCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  if (Object.keys(cart).length === 0) {
    return "Your cart is empty";
  }
  if (!user) {
    return "(Please log in)";
  }


  function onFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    addDoc(ordersCollection, {
      name: formData.get('name'),
      phone: formData.get('phone'),
      user: user.uid,
      address: formData.get('address'),
      cart: cart,
    })
      .then(doc => {
        setCart({});
        navigate("/thank-you");
      })
  }


  return (
    <div className={active ? "OrderForm active" : "OrderForm"} onClick={() => setActive(false)}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <div className="popup-body">
          <form onSubmit={onFormSubmit} id="window">
            <label>
              <input type="text" name="name" placeholder="Name" required />
            </label>
            <label>
              <input type="tel" name="phone" placeholder="Phone" required />
            </label>
            <label>
              <input type="text" name="address" placeholder="Country, city, street" required />
            </label>
            <div>
              <Button>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}