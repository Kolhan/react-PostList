import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Card, Avatar } from "antd";
const { Meta } = Card;
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { LikeButton } from "../LikeButton";
import { DeletePostButton } from "../DeletePostButton";


dayjs.locale('ru')

export const Post = ({onPostLike, onDeletePost, currentUser, image, title, author, text, created_at, likes, tags, _id} ) => {
    //const dataFormated = dayjs(created_at).format('dddd, DD MMMM YYYY') // формат типа 'суббота, 12 марта 2022'
    const dataFormated = dayjs(created_at).format('DD MMMM YYYY') // формат типа '12 марта 2022'

    return (
      <Card 
        title={
          <Meta
            avatar={<Avatar src={author.avatar} />}
            title={author.name}
            description={author.email}
          />     
        } 
        hoverable
        cover={<img alt="example" src={image} />}
      >         
        
        <h5><b>{title}</b></h5>
        <p className="mb-5">{text}</p>

        <div className="row_jc_between row_bottom mb-3">
          <div className="row">
            <LikeButton likeList={likes} userID={currentUser._id} postId={_id} onPostLike={onPostLike}/>
            {currentUser._id==author._id ? <DeletePostButton postId={_id} onDeletePost={onDeletePost}/> : <></> }
          </div>
          
          <div>{dataFormated}</div>
        </div>

              
      </Card>
    );
  };