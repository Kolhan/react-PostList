import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Container } from "../Container";

export const Main = ({children}) => {
    return (
        <main className={cn(s.main)}>
          <Container>
              {children}
          </Container>
        </main>
    );
  };