import React, {useState, useContext} from "react";
import cn from "classnames";
import s from "./styles.module.css";
import Avatar from "antd/lib/avatar/avatar";
import { Button } from "antd";
import { UserEditForm } from "../UserEditForm/UserEditForm";
import { CurrentUserContext } from "../../context/currentUserContext";

export const CurrentUser = () => {
  const {user} = useContext(CurrentUserContext)
  const [editUserFormVisible, setEditPostFormVisible] = useState(false)

    return (
        <div>
          {/* Модальное окно создания поста */}
          <UserEditForm isVisible={editUserFormVisible} onCancel={() => setEditPostFormVisible(false)} onOk={() => setEditPostFormVisible(false)}/>

          { user.email && 
            <div className={cn(s.currentUser__row)}>
              <Avatar icon={<img src={user.avatar}/>} />
              
              <div>
                <div>{user.name}</div>
                <div>{user.email} <Button onClick={()=>setEditPostFormVisible(true)}>изменить</Button></div>    
              </div>    
            </div>
          }
        </div>
    );
  };