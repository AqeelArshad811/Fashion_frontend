import { CommonHeading } from "../components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrder,
  getOrdersByUserId,
} from "../components/Admin/Services/OrderServices";
import { checkAuth } from "../components/Admin/Services/UserServices";
const baseURL = import.meta.env.VITE_SERVER_URI;
const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const result = await fetch(`${baseURL}/api/getOrderById`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log("order data is : ", data.orders);
      if (data.success) {
        // setUserId(data.userId);
        setOrders(data.orders);
      } else {
        setOrders([]); 
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);  
    }
  };
  // const userIdFetch=async()=>{
  //   const result =await checkAuth()
  //   if (result && result.success && result.user) {
  //     setUserId(result.user._id);
  //   } else {
  //     console.error("Failed to fetch user ID or user not authenticated.");
  //   }
  // }
  const isAuth = async () => {
    try {
      const response = await checkAuth();
      console.log("user services response in profile component is : ", response);
      if (response) {
        setUserId(response.user._id);
      } else {
        setUserId(null);
      }
      return response.success;
    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    isAuth();
  }, []);
  const handleCancelOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { status: "Cancelled" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStepClass = (orderStatus, step) => {
    const statusSteps = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Completed",
      "Cancelled",
    ];
    const currentIndex = statusSteps.indexOf(orderStatus);
    const stepIndex = statusSteps.indexOf(step);
    if (orderStatus === "Cancelled") {
      return " step step-error ";
    }
    return stepIndex <= currentIndex ? "step step-primary" : "step";
  };

  if (loading) {
    return <div>Loading...</div>;  // You can add a spinner here instead of "Loading..."
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <CommonHeading title={"My Orders"} />
      
      {  !userId ? (
        <div className="flex flex-col items-center ">
        

        <p className=" text-lg font-semibold ">Please login to see your orders</p>
        <button onClick={() => window.location.href = "/login"} className="btn btn-error mt-5">Login First </button>
        </div>
      ) : 
      Array.isArray(orders) && orders.length === 0 ? (
        <div className="flex flex-col items-center ">
        <p className=" text-lg font-semibold ">No orders found.</p>
        <button onClick={() => window.location.href = "/"} className="btn btn-primary mt-5">Explore Products</button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-6 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-600">
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </p>
              <p className="text-gray-600">Total: PKR {order.totalPrice}</p>

              <ul className="steps my-4 flex gap-x-2">
                <li className={getStepClass(order.status, "Pending")}>
                  Pending
                </li>
                <li className={getStepClass(order.status, "Processing")}>
                  Processing
                </li>
                <li className={getStepClass(order.status, "Shipped")}>
                  Shipped
                </li>
                <li className={getStepClass(order.status, "Delivered")}>
                  Delivered
                </li>
                <li className={getStepClass(order.status, "Completed")}>
                  Completed
                </li>
                <li className={getStepClass(order.status, "Cancelled")}>
                  Cancelled
                </li>
              </ul>

              {order.status !== "Completed" &&
                order.status !== "Delivered" &&
                order.status !== "Cancelled" && 
                 (
                  <button
                    className="btn btn-error text-white mt-3"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                )}

              <ul className="mt-2 text-gray-600">
                {order.cartItems.map((item, index) => (
                  <li key={item.id}>
                    {console.log(item)}
                    {item.productId.title} (x{item.quantity} {item.size||"N/A"})
                  </li>
                ))} 
              </ul>

              {order.status === "Cancelled" && (
                <p className="text-red-500 font-semibold mt-2">
                  Order Cancelled
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
