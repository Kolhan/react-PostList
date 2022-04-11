import React, { useState, useEffect } from 'react';
import cn from "classnames";
import s from "./styles.module.css";
import Avatar from "antd/lib/avatar/avatar";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { PostAuthor } from './../PostAuthor/index';
import api from './../../utils/Api';

export const Comment = ({comment}) => {
    const [author, setAuthor] = useState({})
    useEffect(() => {
      //Получаем информацию об авторе
      api.getAuthorInfo(comment.author)
        .then ((authorData) => {
          setAuthor(authorData)
        })
    },[comment])

    return (
        <div className={cn(s.comment, 'mb-2')}>
          {author?.name && 
            <PostAuthor 
              userName={author.name} 
              subTitle={dayjs(comment.created_at).format('DD MMMM YYYY')} 
              srcAvatar={author.avatar}
            />
          }

          { comment.text }
        </div>
    );
  };