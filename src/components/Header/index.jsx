import React, { useContext } from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Container } from "../Container";

import { Logo } from './../Logo/index';
import { KBreadcrumb } from './../KBreadcrumb/index';
import { CurrentUser } from './../CurrentUser/index';
import { CurrentUserContext } from './../../context/currentUserContext';

export const Header = ({children, arrBtn}) => {
    const user = useContext(CurrentUserContext)

    return (
        <header className={cn(s.header)}>
          <Container>
              <div className='row_jc_between'>
                    <Logo>Реактивные посты</Logo>
                    <KBreadcrumb separator="  " arrBtn={arrBtn}/>
                    <CurrentUser user={user}/>
              </div>
          </Container>
        </header>
    );
  };