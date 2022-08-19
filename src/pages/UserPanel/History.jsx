import React from "react";
import history from "../../images/download.png";
import { useSelector } from "react-redux";

export default function History() {
  const historyItem = useSelector((state) => state.productReducer.history_item);
  return (
    <div>
      <h3>Your History</h3>
      <div className="history">
        <div>
          <img src={history} alt="not found" />
          <p>Sorry no purchase history yet</p>
        </div>
      </div>

      {/* {historyItem.cart_item.length === 0 && (
        <div className="empty-cart">
          <img src={history} alt="not found" />
        </div>
      )} */}
    </div>
  );
}
