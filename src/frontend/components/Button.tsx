import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children?: JSX.Element;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function Button({
  children,
  text,
  onClick,
}: Readonly<Props>): ReactNode {
  return (
    <button
      className="bg-purple-500 w-24 border-2 border-double border-purple-600 rounded-xl hover:bg-purple-950 p-1"
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}
