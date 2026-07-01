import { createContext, useState, useEffect } from "react";

const OrderContext = createContext()

export function OrderProvider({children}){
const[orders, setOrders] = useState(()=> {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders 
    ? JSON.parse(savedOrders)
    : [];
})

useEffect(() => {
    localStorage.setItem(
    "orders",
    JSON.stringify(orders)
    );
}, [orders])

return(
    <OrderContext.Provider
     value={{
            orders,
            setOrders
        }}
    > 
      {children}
    </OrderContext.Provider>
)
}

export default OrderContext;