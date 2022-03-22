import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import api from "../../utils/Api";

export const DeletePostButton = ({postId, onDeletePost}) => {
    function handleDeleteClick() {
      onDeletePost({postId})
      // let isDelete = confirm("Действительно хочешь удалить пост?");

      // if (isDelete) {
      //   api.deletePost(postId).catch((e) => {
      //     if  (e.includes('403') ) alert('Нельзя удалять чужую запись');
      //   })
      // }
    }

    return (
      <>
        <div className={cn(s.deletePostBtn)} onClick={handleDeleteClick}>
          <DeleteOutlined />
        </div>
      </>
    );
  };