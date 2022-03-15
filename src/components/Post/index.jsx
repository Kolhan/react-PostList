import React from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Card, Avatar} from "antd";
const { Meta } = Card;
import dayjs from "dayjs";
import 'dayjs/locale/ru';

dayjs.locale('ru')

export const Post = ({image, title, author: {avatar, name, email}, text, created_at }) => {
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
        <p>{text}</p>
        <div className="row_jc_end row_bottom mb-2"><h5>{dataFormated}</h5></div>
        
      </Card>
    );
  };