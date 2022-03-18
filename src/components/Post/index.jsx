import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Card, Avatar} from "antd";
const { Meta } = Card;
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { LikeButton } from "../LikeButton";

dayjs.locale('ru')

export const Post = ({onPostLike, currentUser, image, title, author: {avatar, name, email}, text, created_at, likes, tags, _id} ) => {
    const dataFormated = dayjs(created_at).format('dddd, DD MMMM YYYY')

    return (
      <Card 
        title={
          <Meta
            avatar={<Avatar src={avatar} />}
            title={name}
            description={email}
          />     
        } 
        hoverable
        cover={<img alt="example" src={image} />}
      >
        
        <h5><b>{title}</b></h5>
        <p className="mb-5">{text}</p>
        <div className="row_jc_between row_bottom mb-3">
          <LikeButton likeList={likes} userID={currentUser._id} postId={_id} onPostLike={onPostLike}/>
          <div>{dataFormated}</div>
        </div>
        
      </Card>
    );
  };