import React, {useState, useRef} from "react"
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import s from "./styles.module.css";
import { Modal } from "antd";
import api from './../../utils/Api';

export function PostEditForm({isVisible, onOk, onCancel, newPost, setNewPost, resetForm}) {
    const {register, handleSubmit, formState: {errors} } = useForm();
    const formNewPost = useRef()

    function onSubmit(data) {
        console.log(data);
    }

    //обработчик кнопки создать
    function handleClick () {
        
        //хочу вызвать submit формы но пока не знаю как.  чтобы сработали валидаторы
        // console.log(formNewPost);
        // formNewPost.dispatchEvent(
        //     new Event("submit", { bubbles: true, cancelable: true })
        // )

        const bodyJSON = {};
        bodyJSON['title'] = newPost.title;
        bodyJSON['text'] = newPost.text;
        bodyJSON['image'] = newPost.image
        bodyJSON['tags'] = newPost.tags.split(',')

        api.createPost(bodyJSON)
            .then(newElement =>{
                resetForm()
                onOk(newElement)
            })
            .catch(errorData => {
                alert(errorData)
            })
    }

    //сохраняем данные в переменную
    function handleOnChangeInput (event) {
        setNewPost({...newPost, [event.target.name]:event.target.value})
    }

    return (
        <Modal
            title="Создать пост"
            visible={isVisible}
            onOk={handleClick}
            onCancel={onCancel}
            okText="Создать"
            cancelText="Отмена"
        >
                
                <form ref={formNewPost} onSubmit={handleSubmit(onSubmit)}>

                    {errors?.image && <div>{errors.image.message}</div>}
                    <Input placeholder='url картинки поста' className="mb-2" type="text" value={newPost.image} onInput={handleOnChangeInput}
                        {...register('image', {
                            required: "'url картинки' обязательное поле и не может быть пустым"
                          })
                        } 
                    />
                    <img src={newPost.image} className="mb-2" width="100%"/>

                    {errors?.title && <div>{errors.title.message}</div>}
                    <Input placeholder='Заголовок поста' className="mb-2" type="text" value={newPost.title} onInput={handleOnChangeInput}
                        {...register('title', {
                            required: "'заголовок поста' обязательное поле и не может быть пустым",
                            minLength: 2
                          })
                        } 
                    />
                    
                    {errors?.text && <div>{errors.text.message}</div>}
                    <TextArea placeholder='Текст поста' className="mb-2" type="text" value={newPost.text} onInput={handleOnChangeInput}
                        {...register('text', {
                            required: "'текст поста' обязательное поле и не может быть пустым"
                          })
                        }  
                    />

                    <Input placeholder='введите тэги через запятую' className="mb-2" type="text" value={newPost.tags} onInput={handleOnChangeInput}
                        {...register('tags')}  
                    />
                    <button type="submit">создать</button>
                </form>
        </Modal>

        
    )
}