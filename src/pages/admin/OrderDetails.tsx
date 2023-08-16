import { get, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { ordersType } from "../../types/types";
import moment from "moment";

const OrderDetails = () => {
  const param = useParams();
  const [order, setOrder] = useState<ordersType>();

  const toggleDeliveryState = () => {
    const orderRef = ref(db, "purchase/" + param.orderKey);

    // onValue(orderRef, (snapshot) => {
    //   if (!snapshot.exists()) {
    //     return;
    //   }
    // });

    const updates = {
      delivered: true,
    };

    update(orderRef, updates);
  };

  useEffect(() => {
    console.log(param.orderKey);
    const orderRef = ref(db, "purchase/" + param.orderKey);

    get(orderRef).then((snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      setOrder(snapshot.val());
    });
  });

  return (
    <div className="card lg:card-side shadow-xl mx-36 mt-20 p-10">
      <figure className="w-[300px]">
        <img
          src={order?.imageURL}
          alt={order?.title}
          width={100}
          height={100}
        />
      </figure>
      <div className="grid grid-cols-2 justify-between items-center text-black gap-3 w-[100%]">
        <div className="card-body text-black">
          <h2 className="card-title">{order?.title}</h2>
          <p>{order?.description}</p>
        </div>
        <div className="text-lg">
          <p>
            Ordered at:{" "}
            <span className="italic text-gray-500">
              {moment(order?.ordered_at).calendar()}
            </span>
          </p>
          <p>
            Quantity: <span className="text-gray-500">{order?.quantity}</span>
          </p>
        </div>
        <div className="flex justify-start items-end gap-5 relative left-8">
          <p>Price: {order?.price} DHS</p>
          <div className="flex justify-start items-end gap-3">
            <p>Delivery State: </p>
            <input
              type="checkbox"
              className="toggle toggle-success"
              onClick={toggleDeliveryState}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary">Return to dashboard</button>
    </div>
  );
};

export default OrderDetails;
