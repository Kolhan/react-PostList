import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Container } from "../Container";

export const Header = ({children}) => {
    return (
        <header className={cn(s.header)}>
          <Container>
              {children}
          </Container>
        </header>
    );
  };