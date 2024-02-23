import clsx from "clsx";
import { HTMLAttributes, HTMLProps } from "react";
import styles from "./Button.module.css";
type ButtonColor = "primary" | "secondary";
type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonColor;
};

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const cssClasses = clsx([
    className,
    styles.btn,
    {
      "bg-valhalla-900 text-white": variant == "primary",
      "bg-slate-100": variant == "secondary",
    },
  ]);
  return (
    <button {...props} className={cssClasses} >
      {children}
    </button>
  );
};
