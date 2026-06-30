import CartContext from "../contexts/CartContext";
import { useContext } from "react";

export default function CartStatus(){
    const {cart} = useContext(CartContext)
    return(
       <span>{cart.length}</span>
    )
}