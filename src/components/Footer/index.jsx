import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Container } from "../Container";

export const Footer = ({children}) => {
    return (
      <footer className={cn(s.footer)}>
          <Container>
              {children}
			    </Container>
      </footer>
    );
  };