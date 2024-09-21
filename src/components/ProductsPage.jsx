import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import pizzaIcon from "../assets/foodIcons/pizza.png";
import cheeseIcon from "../assets/foodIcons/cheese.png";
import hotDogIcon from "../assets/foodIcons/hotdog.png";
import GreetingBlock from "./GreetingBlock";

const products = [
  {
    id: "1",
    img: pizzaIcon,
    title: "Пицца",
    price: 120,
    description: "Пицца",
  },
  {
    id: "2",
    img: cheeseIcon,
    title: "Бургер",
    price: 240,
    description: "Бургер",
  },
  {
    id: "3",
    img: hotDogIcon,
    title: "Хот-дог",
    price: 140,
    description: "Хот-дог",
  },
];

const ProductsPage = ({ addedItems, setAddedItems }) => {
  useEffect(() => {
    console.log(addedItems);
  }, [addedItems]);

  const onAdd = (product) => {
    const itemInCart = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (itemInCart) {
      newItems = addedItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      newItems = [...addedItems, { ...product, quantity: 1 }];
    }

    setAddedItems(newItems);
  };

  const updateQuantity = (product, newQuantity) => {
    const newItems = addedItems
      .map((item) => {
        if (item.id === product.id) {
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);

    setAddedItems(newItems);
  };

  return (
    <div>
      <GreetingBlock />
      <div className={"products-list"}>
        {products.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            onAdd={onAdd}
            addedItem={addedItems.find((addedItem) => addedItem.id === item.id)}
            updateQuantity={updateQuantity}
            className={"item"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
