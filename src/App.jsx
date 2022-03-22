import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer/index.jsx';
import { Header } from './components/Header/index.jsx';

import { Main } from './components/Main/index.jsx';
//import { postData } from "./posts.js";

import api from './utils/Api.js';
import { Pagination, Button, Card, Spin } from 'antd';
import { PostsList } from './components/PostList/index.jsx';

import { KBreadcrumb } from './components/KBreadcrumb/index.jsx';

export const App = () => {
    //Пользователь
    const [currentUser, setCurrentUser] = useState({});
    //Список постов полученный от сервера
    const [postsData, setPostsData] = useState({})
    // Список постов
    const [posts, setPosts] = useState(postsData);
    // Список постов
    const [isLoading, setIsLoading] = useState(false);

    //Первичная загрузка данных
    useEffect(() => {
        setIsLoading(true)
        Promise.all([api.getUserInfo(), api.getPostList()])
            .then(([_userData, _postsData]) => {
                setCurrentUser(_userData)
                setPostsData(_postsData)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [])

    // Пагинация
    const countCardOnPage = 12
    const [pageNum, setPageNum] = useState(1);  
    useEffect(() => {
        setIsLoading(true)
        if(pageNum !== '') {            
            const startIndex = ( pageNum-1 ) * countCardOnPage

            if (postsData.length>0) {
                // сортируем -> сначала новые
                const sortedList = postsData.slice().sort((a, b) => (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0))
                // делим для погинации
                const newPosts = sortedList.length>0 ? sortedList.slice(startIndex, startIndex+countCardOnPage) : sortedList
                setPosts(newPosts)
            }
        }
        setIsLoading(false)

    }, [postsData, pageNum])
    
    // Обработчик нажатия кнопок пагинации
    const handleOnChangePagi = (inputValue) => {
        setPageNum(inputValue)
        window.scrollTo(0, 0);
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

        const bodyJSON = {};
        bodyJSON['title'] = 'Это шапка';
        bodyJSON['text'] = 'Здесь будет текст';
        bodyJSON['image'] = "http://dummyimage.com/400x200.png/5fa2dd/ffffff"
        
        api.createPost(bodyJSON).then(newElement =>{
            setPostsData(oldArray => [...postsData, newElement])            
        })
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

    // обработчик кнопки удалить пост
    function handleDeletePost({postId}) {
        let isDelete = confirm("Действительно хочешь удалить пост?");

        if (isDelete) {
            api.deletePost(postId)
            .then((deletedPost) => {                 
                let oldPostList = postsData.slice()               
                oldPostList.forEach(function(item, index, array) {
                    // если нашли удаляем
                    if (item._id === deletedPost._id) {
                        oldPostList.splice(index,1)
                        return
                    }
                });

                setPostsData(oldPostList)
            })
            .catch((e) => {
                if  (e.includes('403') ) alert('Нельзя удалять чужую запись');
            })
        }
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

                {
                    isLoading == true ? 
                    <>
                        { /* Прелоадер */ }
                        <div className='row_jc_center'><Spin size="large" /></div>
                    </> : <>
                        { /* Список постов */ }
                        <PostsList postsData={posts} className="mb-4" onPostLike={handlePostLike} currentUser={currentUser} onDeletePost={handleDeletePost}/>
                    </>
                }
                
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