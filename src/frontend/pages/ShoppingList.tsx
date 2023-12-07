import React, { useState } from "react";
import Item from "./Item";
import Input from "../components/Input";
import Button from "../components/Button";

interface ShoppingItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingList: React.FC = () => {
  const [listName, setListName] = useState<string>("Weekend List");
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: "Banana", price: 3.5, quantity: 0.5 },
    { id: 2, name: "Apple", price: 4.0, quantity: 1 },
    { id: 3, name: "Strawberry", price: 6.0, quantity: 1.5 },
  ]);
  const [newItem, setNewItem] = useState<{
    name: string;
    price: string;
    quantity: string;
  }>({
    name: "",
    price: "",
    quantity: "",
  });

  const incrementQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 0.5 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 0.5) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewItem((prevNewItem) => ({ ...prevNewItem, [name]: value }));
  };

  const addItem = () => {
    setItems((prevItems) => {
      const { name, price, quantity } = newItem;
      if (name && price && quantity) {
        const id = prevItems.length + 1;
        return [
          ...prevItems,
          {
            id,
            name,
            price: parseFloat(price),
            quantity: parseFloat(quantity),
          },
        ];
      }
      return prevItems;
    });
    setNewItem({ name: "", price: "", quantity: "" });
  };

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="flex flex-col justify-between bg-gray-800 rounded-lg w-11/12 max-w-xs mt-5 mb-5 m-auto">
      <header className="p-5">
        <Input
          label="Product"
          type="text"
          value={listName}
          onChange={handleListNameChange}
        />
      </header>

      <article className="border border-solid border-[#E0E0E0] p-5 rounded mx-5">
        <Input
          label="Item Name"
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />

        <Input
          label="Price"
          type="number"
          placeholder="Price"
          name="price"
          value={newItem.price}
          onChange={handleInputChange}
        />

        <Input
          label="Quantity"
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <Button onClick={addItem} text="Add Item" />
      </article>

      <article className="flex flex-col p-5 gap-5">
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </article>
      <footer className="flex flex-col w-full items-center p-5">
        <div className="total">Total: ${total.toFixed(2)}</div>
        <a href="/cart" className="checkout-link">
          <Button text="checkout" className="bg-green-500" />
        </a>
      </footer>
    </section>
  );
};

export default ShoppingList;
