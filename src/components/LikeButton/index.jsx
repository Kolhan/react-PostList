import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import {ReactComponent as LikeIcon} from './img/like.svg'
import api from "../../utils/Api";

export const LikeButton = ({likeList, userID, postId, onPostLike}) => {
    console.dir(likeList);

    function handleLikeClick() {
      onPostLike({postId, likeList})
    }

    return (
      <>
        <div className={cn(s.likeBtn)} onClick={handleLikeClick}>
          <LikeIcon className={cn(likeList.includes(userID)?s.like_active:'')}/>
          {likeList.length>0 && likeList.length}
        </div>
      </>
    );
  };