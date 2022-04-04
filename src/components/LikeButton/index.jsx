import React, { useContext } from "react";
import cn from "classnames";
import s from "./styles.module.css";
import {ReactComponent as LikeIcon} from './img/like.svg'
import { CurrentUserContext } from './../../context/currentUserContext';

export const LikeButton = ({likeList, postId, onPostLike}) => {
    const {user} = useContext(CurrentUserContext)

    function handleLikeClick() {
      onPostLike({postId, likeList})
    }

    return (
      <>
        <div className={cn(s.likeBtn)} onClick={handleLikeClick}>
          <LikeIcon className={cn(likeList.includes(user._id)?s.like_active:'')}/>
          {likeList.length>0 && likeList.length}
        </div>
      </>
    );
  };