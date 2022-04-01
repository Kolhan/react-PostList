import React, {useState} from "react"
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import s from "./styles.module.css";
import { Modal } from "antd";

export function PostEditForm({isVisible, setVisible, onOk, onCancel}) {
    const {register, handleSubmit, formState: {errors} } = useForm();
    const [newPost, setNewPost] = useState({title: 'Форма создания поста ещё не доделана'})

    function onSubmit(data) {
        console.log(data);
    }

    function handleClick () {
        onOk(newPost)
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
                    <Input placeholder='Название поста' className="mb-2" type="text" value={newPost.title} onInput={(value) => setNewPost(value)}
                        {...register('title')} 
                    />

                    <TextArea placeholder='Основной текст поста' className="mb-2" type="text" value={newPost.text} onInput={(value) => setNewPost(value)}
                        {...register('text')}  
                    />

                    <Input placeholder='url картинки поста' className="mb-2" type="text" 
                        {...register('image')} 
                    />

                    <Input placeholder='тэги' className="mb-2" type="text" 
                        {...register('tags')}  
                    />
                </form>
        </Modal>

        
    )
}