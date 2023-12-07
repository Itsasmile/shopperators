import React from 'react';

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
        <div className="item">
            <div className="item-info">
                <div className="item-name">{name}</div>
                <div className="item-price">{`$${price.toFixed(2)}`}</div>
                <div className="item-quantity">
                    <button onClick={onDecrement} className="quantity-btn">-</button>
                    <span>{`${quantity} kg`}</span>
                    <button onClick={onIncrement} className="quantity-btn">+</button>
                </div>
            </div>
            <div className="item-total">
                ${(price * quantity).toFixed(2)}
            </div>
            <button onClick={onRemove} className="remove-item">X</button>
        </div>
    );
};

export default Item;
