import React from "react";
import { Post } from "../Post";
import cn from "classnames";
import s from "./styles.module.css";

export const PostsList = ({postsData, className}) => {
  return (
    <>
      <div className={cn(s.postList, className)}>
        {postsData.map(post => <Post key={post._id} {...post}/>)}
      </div>
    </>
  );
};