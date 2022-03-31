import { Result } from 'antd';
import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from "./styles.module.css";

export const NotFoundPage = ({}) => {
    return (
        <>
            <div className={cn(s.NotFoundContainer)}>
                <div className='card-white'>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Извините, эта страница не существует."
                        extra={<Link to="/"><button className=''>На главную</button></Link>}
                    />
                </div>
            </div>
        </>
    )
}