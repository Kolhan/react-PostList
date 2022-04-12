import React, { useContext } from "react";
import s from "./styles.module.css";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { LikeButton } from "../LikeButton";
import { DeletePostButton } from "../DeletePostButton";
import { useNavigate } from "react-router-dom";
import { PostAuthor } from "../PostAuthor";
import { Tag } from "antd";
import { CurrentUserContext } from './../../context/currentUserContext';
import { CommentOutlined } from "@ant-design/icons";
import cn from "classnames";


dayjs.locale('ru')

export const Post = ({ onPostLike, onDeletePost, image, title, author, text, created_at, likes, tags, _id, comments }) => {
  //const dataFormated = dayjs(created_at).format('dddd, DD MMMM YYYY') // формат типа 'суббота, 12 марта 2022'
  const dataFormated = dayjs(created_at).format('DD MMMM YYYY') // формат типа '12 марта 2022'
  const navigate = useNavigate();
  const {user} = useContext(CurrentUserContext)

  return (

    <div className="card-white">
      <div className="card-header">
          <PostAuthor userName={author.name} subTitle={author.about} srcAvatar={author.avatar}/>
      </div>
      <div className={cn(s.cardContent, 'curPointer')} onClick={() => navigate(`/post/${_id}`, { replace: false })}>
          <img alt="example" src={image} className="mb-3" />
          <div className="card-body">
            <h5><b>{title}</b></h5>
            <p className="mb-1">{text.length>=150?text.slice(0,150) + '...':text}</p>

            {tags && <div className='mb-2'>
                {tags.length>0 && tags.map((tag, index) => 
                    <Tag color="#87d068" key={index}>{tag}</Tag>
                )}
            </div>}
          </div>
      </div>
      <div className="card-footer">
        <div className="row_jc_between">
          <div className="row">
            <LikeButton likeList={likes} postId={_id} onPostLike={onPostLike} />
            {user._id == author._id ? <DeletePostButton postId={_id} onDeletePost={onDeletePost} /> : <></>}
            {comments?.length>0 && <div><CommentOutlined />{comments.length}</div>}
          </div>

          <div>{dataFormated}</div>
        </div>
      </div> 

    </div>
  );
};