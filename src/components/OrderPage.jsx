import { useCallback, useEffect, useState } from "react";
import { useTg } from "../hooks/useTg";
import { CHAT_ID, tgUrl, URI_API } from "../utils";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";

const OrderPage = ({ addedItems }) => {
  const { user, tg, queryId } = useTg();

  const [name, setName] = useState(
    `${user?.first_name || ""} ${user?.last_name || ""}`
  );
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const defaultTime = now.toTimeString().slice(0, 5);
    setTime(defaultTime);
  }, []);

  const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);
  };

  const generateOrderNumber = () => {
    const prefix = "A";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNum}`;
  };

  const sendToAdmin = () => {
    let message = `<b>Заявка с сайта</b>\n`;
    message += `<b>Отправитель: </b> ${name}\n`;
    message += `<b>Время получения: </b> ${time}\n`;
    message += `<b>Номер заказа: </b> ${orderNumber}\n`;
    message += `<b>Список товаров:</b>\n`;

    addedItems.forEach((item) => {
      message += `- ${item.title} (Цена: ${item.price}, Количество: ${item.quantity})\n`;
    });

    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .catch((error) => {
        console.error("Error sending message to admin:", error);
      });
  };

  const onSendData = useCallback(async () => {
    setLoading(true);
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);

    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
      name,
      time,
      orderNumber: newOrderNumber,
    };
    console.log(data);
    try {
      const response = await fetch(`${tgUrl}/web-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        sendToAdmin();
      } else {
        console.error("Failed to send order data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  }, [addedItems, name, time, queryId]);

  return (
    <div className="order-page">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="order-page__chapter">Оформление заказа</div>
          <span>ФИО</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="ФИО"
          />
          <span>Время получения</span>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            placeholder="Время получения"
          />
          <span>Заказ</span>
          <div className="order-list">
            {addedItems.map((item) => (
              <div className="order-product" key={item.id}>
                <img src={item.img} alt={item.title} />
                <div>
                  <span>Название: {item.title}</span>
                  <span>Цена за шт: {item.price}</span>
                  <span>Кол-во: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          {addedItems.length > 0 ? (
            <button
              onClick={onSendData}
              style={{ margin: "0 auto" }}
              className="order__submit"
              disabled={loading}
            >
              Оформить заказ!
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default OrderPage;
