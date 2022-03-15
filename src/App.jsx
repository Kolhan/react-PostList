import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer/index.jsx';
import { Header } from './components/Header/index.jsx';
import { Logo } from './components/Logo/index.jsx';
import { Main } from './components/Main/index.jsx';
import { postData } from "./posts.js";

import { Pagination, Button, Card } from 'antd';
import { PostsList } from './components/PostList/index.jsx';
import { KBreadcrumb } from './components/KBreadcrumb/index.jsx';

export const App = () => {

    const [posts, setPosts] = useState(postData);

    const headerBtn = [
        {title:'Главная'},
        {title:'GitHub', href:'https://github.com/Kolhan'},
    ]

    const breadcrumbBtn = [
        {title:'Главная'},
        {title:'Все посты', href:''},
    ]
    
    const handleClick = (e) => {
        e.preventDefault();
        console.log('Есть контакт');
        alert('Есть контакт');
    }
    

    return (
        <>
            <Header>
                <div className='row_jc_between'>
                    <Logo>Реактивные посты</Logo>
                    <KBreadcrumb separator="  " arrBtn={headerBtn}/>
                </div>
            </Header>

            <Main>
                <Card className='mb-4'>
                    <KBreadcrumb arrBtn={breadcrumbBtn} className="mb-3"/>

                    <h1> Добро пожаловать на мою страничку</h1>

                    <div className='row_jc_between'>
                        Здесь вы можете реактивно развлекаться
                        <Button type="primary" onClick={handleClick}>Создать пост</Button>
                    </div>
                </Card>

                <PostsList postsData={posts} className="mb-4"/>        

                <div className='row_jc_center'><Pagination defaultCurrent={1} total={50} /></div>      
            </Main>

            <Footer>
                <div className='row_jc_center'>Шатров Константин. 2022</div>
            </Footer>
        </>
    )
}