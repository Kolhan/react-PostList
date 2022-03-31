import React, { useState, useEffect } from 'react';

import { Pagination, Button, Card, Spin } from 'antd';
import { PostsList } from '../../components/PostList/index.jsx';

import { KBreadcrumb } from '../../components/KBreadcrumb/index.jsx';

export const PostListPage = ({isLoading, postsData, handlePostLike, handleDeletePost, handleCreateNewPost, breadcrumbBtn, setIsLoading}) => {
    // Список постов
    const [posts, setPosts] = useState(postsData);

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

    return (
        <>
                <Card className='mb-4'>
                    <KBreadcrumb arrBtn={breadcrumbBtn} className="mb-3"/>

                    <h1> Добро пожаловать на мою страничку</h1>

                    <div className='row_jc_between'>
                        Здесь вы можете реактивно развлекаться
                        <Button type="primary" onClick={handleCreateNewPost}>Создать пост</Button>
                    </div>
                </Card>


                { /* Прелоадер */ }
                {
                    isLoading == true && <>
                        
                        <div className='row_jc_center'><Spin size="large" /></div>
                    </>
                }

                { /* Список постов */ }
                {
                    isLoading == false && <>
                        
                        <PostsList postsData={posts} className="mb-4" onPostLike={handlePostLike} onDeletePost={handleDeletePost}/>
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