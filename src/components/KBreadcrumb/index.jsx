import React from "react";
import s from "./styles.module.css";

import { Breadcrumb } from 'antd';

export const KBreadcrumb = ({separator, arrBtn, className}) => {
  return (
    <Breadcrumb separator={separator? separator:' / '} className={className}>
      {arrBtn.map((item, index) => 
        <Breadcrumb.Item key={index} href={item.href}>{item.title}</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};