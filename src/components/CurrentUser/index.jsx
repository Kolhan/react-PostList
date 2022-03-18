import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import Avatar from "antd/lib/avatar/avatar";

export const CurrentUser = ({user}) => {
    return (
        <div>
          { user.email && 
            <div className={cn(s.currentUser__row)}>
              <Avatar icon={<img src={user.avatar}/>} />
              
              <div>
                <div>{user.name}</div>
                <div>{user.email}</div>    
              </div>    
            </div>
          }
        </div>
    );
  };