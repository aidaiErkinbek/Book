import "./CartList.css";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function CartList() {
  const { products, cart, setCart } = useContext(AppContext);

  function onQuantityChange(product, qty) {
    setCart({
      ...cart,
      [product.id]: qty
    })
  }

  function onItemRemove(product) {
    const newCart = { ...cart };
    delete newCart[product.id];
    setCart(newCart);
  }

  const productIds = Object.keys(cart);

  const output = products
    .filter((product) => productIds.includes(product.id))
    .map((product) => (
      <div className="cartItem" key={product.id}>
        <Link to={"/products/" + product.slug}>
          <img src={product.img} alt={product.name} />
        </Link>
        <Link to={"/products/" + product.slug}>{product.name}</Link>

        <div className="inputs">
        <input className="CartCount"
          type="number"
          value={cart[product.id]}
          min={1}
          onChange={(event) => onQuantityChange(product, +event.target.value)} />
        <span>${(cart[product.id] * product.price).toFixed(2)}</span>
        <i className="CartDelete" onClick={() => onItemRemove(product)} />
          </div>
      </div>
    ));

  return (
    <div className="CartList">
      {output}
    </div>
  )
}