import React from "react";

interface ItemProps {
  name: string;
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const Item: React.FC<ItemProps> = ({
  name,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: ItemProps) => {
  return (
    <div className="flex justify-between items-center border border-solid border-[#E0E0E0] p-5">
      <div>
        <div className="mx-5">{name}</div>
        <div className="mx-5">{`$${price.toFixed(2)}`}</div>

        <div className="flex mx-5 justify-between w-full">
          <article className="flex gap-1">
            <button
              onClick={onDecrement}
              className="bg-none border-none cursor-pointer"
            >
              -
            </button>
            <span>{`${quantity} kg`}</span>
            <button
              onClick={onIncrement}
              className="bg-none border-none cursor-pointer"
            >
              +
            </button>
          </article>
        </div>
      </div>

      <div>${(price * quantity).toFixed(2)}</div>

      <button
        onClick={onRemove}
        className="bg-none border-none cursor-pointer text-red-600 self-center"
      >
        X
      </button>
    </div>
  );
};

export default Item;
