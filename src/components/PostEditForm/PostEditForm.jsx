import React, {useState} from "react"
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import s from "./styles.module.css";
import { Modal } from "antd";

export function PostEditForm({isVisible, setVisible, onOk, onCancel}) {
    const {register, handleSubmit, formState: {errors} } = useForm();
    const [newPost, setNewPost] = useState({
        title: '',
        text: '',
        image: '',
        tags: ''
    })

    function onSubmit(data) {
        console.log(data);
    }

    function handleClick () {
        onOk(newPost)
    }

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
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder='url картинки поста' className="mb-2" type="text" value={newPost.image} onInput={handleOnChangeInput}
                        {...register('image')} 
                    />
                    <img src={newPost.image} className="mb-2" width="100%"/>

                    <Input placeholder='Название поста' className="mb-2" type="text" value={newPost.title} onInput={handleOnChangeInput}
                        {...register('title')} 
                    />

                    <TextArea placeholder='Основной текст поста' className="mb-2" type="text" value={newPost.text} onInput={handleOnChangeInput}
                        {...register('text')}  
                    />

                    <Input placeholder='введите тэги через запятую' className="mb-2" type="text" value={newPost.tags} onInput={handleOnChangeInput}
                        {...register('tags')}  
                    />
                </form>
        </Modal>

        
    )
}