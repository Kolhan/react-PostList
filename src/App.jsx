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

    // Пагинация
    const countCardOnPage = 12
    const [pageNum, setPageNum] = useState(1);  
    
    // возвращает фильтрованный список по номеру страницы
    const handlePagination = (pageNum) => {
        if(pageNum !== '') {
            const startIndex = ( pageNum-1 ) * countCardOnPage
            return postData.slice(startIndex, startIndex+countCardOnPage)
        } else return postData
    }

    const handleOnChangePagi = (inputValue) => {
        setPageNum(inputValue)
        setPosts(handlePagination(inputValue))
    }

    // Список постов
    const [posts, setPosts] = useState(handlePagination(pageNum));

    // конопки хедера
    const headerBtn = [
        {title:'Главная'},
        {title:'GitHub', href:'https://github.com/Kolhan'},
    ]

    // кнопки хлебных крошек
    const breadcrumbBtn = [
        {title:'Главная'},
        {title:'Все посты', href:''},
    ]
    
    // Клик по кнопке создать пост
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

                <div className='row_jc_center'>
                    <Pagination 
                        defaultCurrent={1} 
                        current={pageNum} 
                        onChange={handleOnChangePagi}
                        total={postData.length} 
                        defaultPageSize={countCardOnPage}
                    />
                </div>      
            </Main>

            <Footer>
                <div className='row_jc_center'>Шатров Константин. 2022</div>
            </Footer>
        </>
    )
}