import React from "react";
import cn from "classnames";
import s from "./styles.module.css";

export const Container = ({children}) => {
    return (      
      <div className={cn(s.container)}>        
          {children}        
      </div>      
    );
  };