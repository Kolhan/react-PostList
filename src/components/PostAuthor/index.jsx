import React, { useState, useEffect } from 'react';
import cn from "classnames";
import s from "./styles.module.css";
import Avatar from "antd/lib/avatar/avatar";

export const PostAuthor = ({userName, subTitle, srcAvatar, className}) => {
    const [shortName, setShortName] = useState(userName)
    useEffect(() => {
      const arr = userName.split(' ')
      if (arr.length>2) setShortName(arr[0] + ' ' + arr[1])
      else setShortName(userName)

    },[userName])

    return (
        <>
          { userName && 
            <div className={cn(s.postAuthor__row, className)}>
              <Avatar className={s.postAuthor__avatar} icon={<img src={srcAvatar}/>} />
              
              <div>
                <div>{shortName}</div>
                <div className={s.postAuthor__subTitle}>{subTitle}</div>    
              </div>    
            </div>
          }
        </>
    );
  };