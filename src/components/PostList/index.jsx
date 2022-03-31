import React from "react";
import { Post } from "../Post";
import cn from "classnames";
import s from "./styles.module.css";

export const PostsList = ({postsData, className, onPostLike, onDeletePost}) => {
  return (
    <>
      <div className={cn(s.postList, className)}>
        {postsData && postsData.length>0 && postsData.map(post => <Post key={post._id} {...post} onPostLike={onPostLike} onDeletePost={onDeletePost}/>)}
      </div>
    </>
  );
};