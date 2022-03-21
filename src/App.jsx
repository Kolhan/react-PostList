import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer/index.jsx';
import { Header } from './components/Header/index.jsx';

import { Main } from './components/Main/index.jsx';
//import { postData } from "./posts.js";

import api from './utils/Api.js';
import { Pagination, Button, Card } from 'antd';
import { PostsList } from './components/PostList/index.jsx';

import { KBreadcrumb } from './components/KBreadcrumb/index.jsx';

export const App = () => {
    //Пользователь
    const [currentUser, setCurrentUser] = useState({});
    //Список постов полученный от сервера
    const [postsData, setPostsData] = useState({})
    // Список постов
    const [posts, setPosts] = useState(postsData);

    //Первичная загрузка данных
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getPostList()])
            .then(([_userData, _postsData]) => {
                setCurrentUser(_userData)
                setPostsData(_postsData)
            })
    }, [])

    // Пагинация
    const countCardOnPage = 12
    const [pageNum, setPageNum] = useState(1);  
    useEffect(() => {
        if(pageNum !== '') {
            const startIndex = ( pageNum-1 ) * countCardOnPage
            const newPosts = postsData.length>0 ? postsData.slice(startIndex, startIndex+countCardOnPage) : postsData
            setPosts(newPosts)
        }
    }, [postsData, pageNum])
    
    // Обработчик нажатия кнопок пагинации
    const handleOnChangePagi = (inputValue) => {
        setPageNum(inputValue)
    }



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

    // обработчик кнопки лайк
    function handlePostLike({postId, likeList}) {
        api.changeLikeStatus(postId, likeList.includes(currentUser._id))
            .then((newPost) => {                
                const newPostsState = postsData.map(p => {
                    return p._id === newPost._id ? newPost : p
                })

                setPostsData(newPostsState)
            })
    }

    

    return (
        <>
            <Header arrBtn={headerBtn} user={currentUser}/>

            <Main>
                <Card className='mb-4'>
                    <KBreadcrumb arrBtn={breadcrumbBtn} className="mb-3"/>

                    <h1> Добро пожаловать на мою страничку</h1>

                    <div className='row_jc_between'>
                        Здесь вы можете реактивно развлекаться
                        <Button type="primary" onClick={handleClick}>Создать пост</Button>
                    </div>
                </Card>

                {/* Список постов */}
                <PostsList postsData={posts} className="mb-4" onPostLike={handlePostLike} currentUser={currentUser}/>

                {/* Пагинатор */}
                {
                    posts.length>0 &&
                    <>
                        <div className='row_jc_center'>
                            
                            <Pagination 
                                defaultCurrent={1} 
                                current={pageNum} 
                                onChange={handleOnChangePagi}
                                total={postsData.length} 
                                defaultPageSize={countCardOnPage}
                            />
                        </div> 
                        <div className='row_jc_center'>Всего {postsData.length}</div>
                    </>
                }
                     
            </Main>

            <Footer/>
        </>
    )
}