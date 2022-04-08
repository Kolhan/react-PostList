import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/Api';
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { PostAuthor } from '../../components/PostAuthor';
import { Button, Tag } from 'antd';
import s from "./styles.module.css";
import cn from 'classnames';
import { LikeButton } from '../../components/LikeButton';
import { CurrentUserContext } from './../../context/currentUserContext';
import { PostListContext } from './../../context/postListContext';
import { EditPostButton } from '../../components/EditPostButton';
import Input from 'antd/lib/input/Input';
import TextArea from 'antd/lib/input/TextArea';

export const PostPage = ({}) => {
    const params = useParams();
    const [post, setPost] = useState({}) 
    const navigate = useNavigate()
    const {user} = useContext(CurrentUserContext)
    const {replacePost} = useContext(PostListContext)
    const [isEditMode, setEditMode] = useState(false)
    const [postOriginal, setPostOriginal] = useState({})

    //Первичная загрузка данных
    useEffect(() => {
        api.getPost(params.postId)
            .then((_postData) => {
                _postData.created_at = dayjs(_postData.created_at).format('DD MMMM YYYY') // формат типа '12 марта 2022'
                setPost(_postData)
                // onsole.log(_postData);
            }).finally(() => {
            })
    }, [])

    function handleClickBack() {
        navigate(-1)
    }

    // обработчик кнопки лайк
    function handlePostLike({postId, likeList}) {
        api.changeLikeStatus(postId, likeList.includes(user._id))
            .then((newPost) => {
                replacePost({...newPost})                
                newPost.created_at = dayjs(newPost.created_at).format('DD MMMM YYYY') // формат типа '12 марта 2022'
                setPost(newPost)
            })
    }

    function handleChangeEditMode() {
        console.log('проверка PostOriginal', postOriginal.title);
        let mode = !isEditMode
        if (mode == true) {
            setPostOriginal({...post})
        }
        setEditMode(mode)
    } 

    function handleEditFormOk() {
        //отправляем изменения на сервер
        let bodyJSON = {}
        bodyJSON.image = post.image
        bodyJSON.tags = post.tags
        bodyJSON.title = post.title
        bodyJSON.text = post.text

        api.editPost(post._id, bodyJSON)            
            .then((newPost) => {
                replacePost({...newPost})                
                newPost.created_at = dayjs(newPost.created_at).format('DD MMMM YYYY') // формат типа '12 марта 2022'
                setPost(newPost)
            })
            .catch((err)=>{
                setPost({...postOriginal})
                alert(err)
            })
    }

    function handleEditFormCancel() {
        setPost({...postOriginal})
    }

    return (
        <>
            <Button className='mb-2' onClick={handleClickBack}>Назад</Button>

            <div className="card-white">
                <div className="card-content">
                    <div className={s.postPage__cardRow}>
                        <div>
                            {isEditMode && <Input value={post.image} onInput={(e)=>{setPost({...post, image:e.target.value})}}/> } 
                            <img width="100%" alt="example" src={post.image} />
                        </div>

                        <div className={cn(s.postPage__cardRow_body)}>
                            {post.author && <PostAuthor userName={post.author.name} subTitle={post.created_at} srcAvatar={post.author.avatar} className="mb-3"/>}

                            <div className='row mb-3'>
                                {user?._id == post?.author?._id && <EditPostButton isEditMode={isEditMode} onEditModeChange={handleChangeEditMode} onOk={handleEditFormOk} onCancel={handleEditFormCancel}/>}

                                {!isEditMode && 
                                    <>
                                        {post?.likes && <LikeButton likeList={post.likes} postId={post._id} onPostLike={handlePostLike}/>}
                                        {post?.tags && <div>
                                            {post?.tags?.length>0 && post?.tags?.map((tag, index) => 
                                                <Tag color="#87d068" key={index}>{tag}</Tag>
                                            )}
                                        </div>}
                                    </>
                                }
                            </div>

                            {/* Оригинальный текст карточки */}
                            {!isEditMode && 
                                <>
                                    <h3><b>{post.title}</b></h3>
                                    <p className="mb-5">{post.text}</p>

                                    <h3> Комментарии: </h3>
                                    {post && post.comments && post.comments.length>0 && post.comments.map((comment, index) => 
                                        <div key={index}>
                                            {comment}
                                        </div> 
                                    )}
                                </> 
                            }

                            {/* Форма редактирования */}
                            {isEditMode && 
                                <>
                                    <Input className="mb-1" value={post.title} onInput={(e)=>{setPost({...post, title:e.target.value})}}/>
                                    <TextArea className="mb-3" value={post.text} onInput={(e)=>{setPost({...post, text:e.target.value})}}/>
                                    <Input className="mb-5" value={post.tags} onInput={(e)=>{setPost({...post, tags:e.target.value.split(',')})}}/> 
                                </> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}