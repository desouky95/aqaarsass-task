import React from "react";
import * as CSS from "csstype";
import styles from "./Skeleton.module.css";

type LayoutProps = Pick<CSS.Properties, "width" | "height">;

type SkeletonProps = {} & LayoutProps;

export const Skeleton = ({ ...layout }: SkeletonProps) => {
  return <div style={layout} className={styles.skeleton}></div>;
};
