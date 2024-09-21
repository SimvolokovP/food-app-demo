const ProductItem = ({
  product,
  className,
  onAdd,
  addedItem,
  updateQuantity,
}) => {
  const handleAdd = () => {
    onAdd(product);
  };

  const handleQuantityChange = (delta) => {
    if (addedItem) {
      const newQuantity = addedItem.quantity + delta;
      updateQuantity(product, newQuantity);
    }
  };

  return (
    <div className={"product"}>
      <div className={"img"}>
        <img src={product.img} alt={product.title} />
      </div>
      <div className={"title"}>{product.title}</div>
      <div className={"price"}>
        <span>
          {product.price} руб
        </span>
      </div>
      {addedItem ? (
        <div className="product-quantity">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{addedItem.quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      ) : (
        <button className={"add-btn"} onClick={handleAdd}>
          Заказать
        </button>
      )}
    </div>
  );
};

export default ProductItem;
