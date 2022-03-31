import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer/index.jsx';
import { Header } from './components/Header/index.jsx';

import { Main } from './components/Main/index.jsx';
//import { postData } from "./posts.js";

import api from './utils/Api.js';
import { PostListPage } from "./pages/PostListPage/PostListPage"
import { Route, Routes } from 'react-router-dom';
import { PostPage } from './pages/PostPage/PostPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx';
import { CurrentUserContext } from "./context/currentUserContext";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


export const App = () => {
    // Пользователь
    const [currentUser, setCurrentUser] = useState({});
    // Список постов полученный от сервера
    const [postsData, setPostsData] = useState({})
    // Состояние загрузки
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
 
    // конопки хедера
    const headerBtn = [
        // {title:'Главная'},
        {title:'GitHub', href:'https://github.com/Kolhan'},
    ]

    // кнопки хлебных крошек
    const breadcrumbBtn = [
        {title:'Главная'},
        {title:'Все посты', href:''},
    ]
    
    // Клик по кнопке создать пост
    const handleCreateNewPost = (e) => {
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
    const { confirm } = Modal;
    function handleDeletePost({postId}) {
        //showDeleteConfirm(postId)
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

    // форма подтверждения удаления
    function showDeleteConfirm(postId) {
        confirm({
          title: 'Действительно хочешь удалить пост?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Да',
          okType: 'danger',
          cancelText: 'Нет',
          onOk: () => handleDeletePost(postId),
          onCancel() {
            console.log('Cancel');
          },
        });
    }
    

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header arrBtn={headerBtn}/>

                <Main>
                    <Routes>
                        <Route path='/' element = {
                            <PostListPage 
                                isLoading={isLoading}
                                postsData={postsData}
                                handlePostLike={handlePostLike}
                                handleDeletePost={showDeleteConfirm} 
                                handleCreateNewPost={handleCreateNewPost} 
                                breadcrumbBtn={breadcrumbBtn}
                                setIsLoading={setIsLoading}
                            /> 
                        }/>
                        <Route path='/post/:postId' element = {
                            <PostPage/> 
                        }/>

                        <Route path='*' element = {
                            <NotFoundPage/> 
                        }/>
                    </Routes>
                                                
                </Main>

            <Footer/>
            </CurrentUserContext.Provider>
        </>
    )
}