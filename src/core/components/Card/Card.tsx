import React, { HTMLProps, PropsWithChildren } from "react";
import styles from "./Card.module.css";

interface CardComposition {
  Title: typeof Title;
}

type TitleProps = {} & HTMLProps<HTMLSpanElement>;

const Title = ({ children }: TitleProps) => (
  <span className={styles.title}>{children}</span>
);

type CardProps = {} & HTMLProps<HTMLDivElement>;

export const Card: CardComposition & React.FC<CardProps> = ({
  children,
  ...props
}) => {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};

Card.Title = Title;
