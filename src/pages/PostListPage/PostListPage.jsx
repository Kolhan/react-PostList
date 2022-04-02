import React, { useState, useEffect } from 'react';

import { Pagination, Button, Card, Spin, Modal, Alert } from 'antd';
import { PostsList } from '../../components/PostList/index.jsx';

import { KBreadcrumb } from '../../components/KBreadcrumb/index.jsx';
import { PostEditForm } from '../../components/PostEditForm/PostEditForm.jsx';

export const PostListPage = ({isLoading, postsData, handlePostLike, handleDeletePost, handleCreateNewPost, breadcrumbBtn, setIsLoading}) => {
    // Список постов
    const [posts, setPosts] = useState(postsData);
    const [editPostFormVisible, setEditPostFormVisible] = useState(false)
    const [newPost, setNewPost] = useState({
        title: '',
        text: '',
        image: '',
        tags: ''
    })

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

    // Показать модальное окно
    const showModal = () => {
        resetForm()
        setEditPostFormVisible(true)
    };
    
    // Закрыть модальное окно
    const hideModal = () => {
        setEditPostFormVisible(false)
    };

    // Обработчик кнопки создать пост
    function onOk(newPost) {
        hideModal();
        handleCreateNewPost(newPost)
    }

    return (
        <>
                <Card className='mb-4'>
                    <KBreadcrumb arrBtn={breadcrumbBtn} className="mb-3"/>

                    <h1> Добро пожаловать на мою страничку</h1>

                    <Alert message="Не знаю почему, перестало открываться на githubPages: https://kolhan.github.io/react-PostList/dist/ помогите разобраться" type="error" className='mb-3'/>

                    <div className='row_jc_between'>
                        Здесь вы можете реактивно развлекаться
                        <Button type="primary" onClick={showModal}>Создать пост</Button>
                    </div>
                </Card>

                {/* Модальное окно создания поста */}
                <PostEditForm isVisible={editPostFormVisible} onOk={onOk} onCancel={hideModal} newPost={newPost} setNewPost={setNewPost}/>

                { /* Прелоадер */ }
                {
                    isLoading == true && <>
                        
                        <div className='row_jc_center'><Spin size="large" /></div>
                    </>
                }

                { /* Список постов */ }
                {
                    isLoading == false && <>                        
                        <PostsList postsData={posts} className="mb-4" onPostLike={handlePostLike} onDeletePost={handleDeletePost} resetForm={resetForm}/>
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
        </>
    )
}