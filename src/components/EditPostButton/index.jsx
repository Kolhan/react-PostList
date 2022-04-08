import React, { useContext } from "react";
import s from "./styles.module.css";
import { CurrentUserContext } from './../../context/currentUserContext';
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const EditPostButton = ({isEditMode, onEditModeChange, onOk, onCancel}) => {
    const {user} = useContext(CurrentUserContext)

    function handleOkClick() {
      onEditModeChange()
      onOk()
    }
    function handleCancelClick() {
      onEditModeChange()
      onCancel()
    }

    return (
      <>
        {isEditMode == false && <div><Button onClick={onEditModeChange}><EditOutlined /></Button></div>}
        {isEditMode == true && <div className="row">
          <Button type="primary" onClick={handleOkClick}>Сохранить</Button> 
          <Button onClick={handleCancelClick}>Отменить</Button>
        </div>}        
      </>
    );
  };