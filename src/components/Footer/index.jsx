import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Container } from "../Container";

export const Footer = ({children}) => {
    return (
      <footer className={cn(s.footer)}>
          <Container>
              {/* {children} */}
              <div className='row_jc_center'>Шатров Константин. 2022</div>
			    </Container>
      </footer>
    );
  };