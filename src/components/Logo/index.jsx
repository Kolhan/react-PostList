import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import logo from '../../assets/favicon.svg';
import { Link } from "react-router-dom";

export const Logo = ({children}) => {
    return (
      <Link to={`/`} className={cn(s.logo)}>
        <img src={logo} alt="logo"/> <div className={s.title}>{children}</div>
      </Link>
    );
  };