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
    //Отфильтрованный список в том числе и постранично
    const [filtredPostList, setFiltredPostList] = useState()
    //let postData = {}

    //Первичная загрузка данных
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getPostList()])
            .then(([_userData, _postsData]) => {
                setCurrentUser(_userData)
                setPostsData(_postsData)
                //setPosts(handlePagination(pageNum))
            })
    }, [])


    // Пагинация
    const countCardOnPage = 12
    const [pageNum, setPageNum] = useState(1);  
    
    // возвращает фильтрованный список по номеру страницы
    const handlePagination = (pageNum) => {
        if(pageNum !== '') {
            const startIndex = ( pageNum-1 ) * countCardOnPage
            return postsData.length>0 ? postsData.slice(startIndex, startIndex+countCardOnPage) : postsData
        } else return postsData
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

    // обработчик кнопки лайк
    function handlePostLike({postId, likeList}) {
        api.changeLikeStatus(postId, likeList.includes(currentUser._id))
            .then((newPost) => {
                
                const newPostsState = postsData.map(p => {
                    if ( p._id === newPost._id) {
                        console.log('применён кастыль - оставляем старое поле author -> newPost.author = p.author');
                        newPost.author = p.author
                        return newPost 
                    } else { return p}
                    // return p._id === newPost._id ? newPost : p
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
                <PostsList postsData={postsData} className="mb-4" onPostLike={handlePostLike} currentUser={currentUser}/>

                {/* Пагинатор */}
                {
                    posts.length>0 &&
                    <div className='row_jc_center'>
                        <div>Всего {postsData.length}</div>
                        <Pagination 
                            defaultCurrent={1} 
                            current={pageNum} 
                            onChange={handleOnChangePagi}
                            total={postsData.length} 
                            defaultPageSize={countCardOnPage}
                        />
                    </div> 
                }
                     
            </Main>

            <Footer/>
        </>
    )
}