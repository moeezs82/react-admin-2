import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { userRequest } from "../../requestMethod";
import "./widgetLg.css";

const WidgetLg = () => {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("order/recent");
        setOrders(res.data.order);
        // console.log(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>

          {orders.map((order)=>(
            <tr className="widgetLgTr" key={order.id}>
              <td className="widgetLgUser">
                {/* <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                  className="widgetLgImg"
                /> */}
                <span className="widgetLgName">{order.user_id}</span>
              </td>
              <td className="widgetLgDate">{format(order.created_at)}</td>
              <td className="widgetLgAmount">$ {order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status === 1 ? "Approve" : "Pending"} />
              </td>
            </tr>
          ))}
          
          {/* <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Name Here</span>
            </td>
            <td className="widgetLgDate">2 Jun 2022</td>
            <td className="widgetLgAmount">$ 365</td>
            <td className="widgetLgStatus">
              <Button type="Pending" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Name Here</span>
            </td>
            <td className="widgetLgDate">2 Jun 2022</td>
            <td className="widgetLgAmount">$ 365</td>
            <td className="widgetLgStatus">
              <Button type="Approve" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Name Here</span>
            </td>
            <td className="widgetLgDate">2 Jun 2022</td>
            <td className="widgetLgAmount">$ 365</td>
            <td className="widgetLgStatus">
              <Button type="Decline" />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
