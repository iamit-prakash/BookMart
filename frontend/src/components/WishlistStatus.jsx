import WishlistContext from "../contexts/WishlistContext";
import { useContext } from "react";

export default function WishlistStatus(){
    const {wishlist} = useContext(WishlistContext)
    return(
       <span>{wishlist.length}</span>
    )
}