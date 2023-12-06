import { ReactNode, useEffect, useState } from "react";
import { Product } from "../../shared/Product";

type Group = {
  [key: number]: Product[];
};

export default function Cart(): ReactNode {
  const [products, setProducts] = useState<Group | null>(null);

  useEffect(() => {
    const jsonProducts = sessionStorage.getItem("cart");

    if (!jsonProducts) return;

    const cart = JSON.parse(jsonProducts) as Product[];

    const group = cart?.reduce((group: { [key: number]: Product[] }, item) => {
      if (!group[item.id]) group[item.id] = [];

      group[item.id].push(item);
      return group;
    }, {});

    setProducts(group);
  }, []);

  return !products ? (
    <p>Cart is empty</p>
  ) : (
    <div className="p-4 md:p-8 bg-gray-900 text-white">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Shopping Cart</h1>
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Product
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  Price
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  Quantity
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {Object.values(products).map((group) => {
                const product = group[0];
                return (
                  <tr
                    key={product.name}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <div className="flex items-center">
                        <img
                          src={product.imageSrc}
                          alt="Product image"
                          width="64"
                          height="64"
                          className="aspect-square rounded-md object-cover mr-4"
                        />
                        <span className="font-medium text-gray-300">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right text-gray-300">
                      ${product.price}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right text-gray-300">
                      {group.length}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right text-gray-300">
                      ${product.price * group.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <div
          className="rounded-lg border shadow-sm bg-gray-800 text-gray-300 border-gray-700"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Order Summary
            </h3>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">
                $
                {Object.values(products)
                  .map((group) => group[0].price)
                  .reduce((sum, current) => sum + current)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                $
                {Object.values(products)
                  .map((group) => group[0].price)
                  .reduce((sum, current) => sum + current)}
              </span>
            </div>
          </div>
          <div className="flex items-center p-6">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-gray-700 hover:bg-gray-600 text-white">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
