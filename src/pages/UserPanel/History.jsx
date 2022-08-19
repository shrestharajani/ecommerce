import React, { useEffect } from "react";
import history from "../../images/download.png";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/userActions";

export default function History() {
  const historyItem = useSelector((state) => state.userReducer.order_details);
  console.log("history", historyItem);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div>
      <h3>Your History</h3>

      {historyItem.length === 0 && (
        <div className="history">
          <div>
            <img src={history} alt="not found" />
            <p>Sorry no purchase history yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
