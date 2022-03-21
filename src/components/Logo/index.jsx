import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import logo from '../../assets/favicon.svg';

export const Logo = ({children}) => {
    return (
      <a href="/" className={cn(s.logo)}>
          <img src={logo} alt="logo"/> <div className={s.title}>{children}</div>
      </a>
    );
  };