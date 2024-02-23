import { v4 as uuid } from "uuid";
import styles from "./Breadcrumb.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import React from "react";

type BreadcrumbProps = {
  withInitial?: boolean;
  items: Array<{ title: string; path: string }>;
};

const Breadcrumb = ({ items, withInitial = false }: BreadcrumbProps) => {
  const list = (withInitial ? [{ title: "الرئيسية", path: "/" }] : []).concat(
    items
  );

  return (
    <ul className={styles.breadcrumb}>
      {list.map((item, index) => {
        return (
          <React.Fragment key={uuid()}>
            <li>
              <Link to={item.path}>{item.title}</Link>
            </li>
            {index < list.length - 1 && <IoIosArrowForward />}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
