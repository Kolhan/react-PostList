import React, {useState, useRef, useContext, useEffect} from "react"
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { useForm } from "react-hook-form";
import s from "./styles.module.css";
import { Modal } from "antd";
import api from './../../utils/Api';
import { CurrentUserContext } from "../../context/currentUserContext";
import cn from "classnames";
import { PostListContext } from "../../context/postListContext";

export function UserEditForm({isVisible, onOk, onCancel}) {
    const {user, setUser} = useContext(CurrentUserContext)
    const {getPostList} = useContext(PostListContext)
    const [profile, setProfil] = useState({})
    
    useEffect(() => {
        setProfil(user)
    },[user])

    const {register, handleSubmit, reset, formState: {errors} } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
      });
  

    function onSubmit(data) {
        console.log(data);
    }

    //обработчик кнопки создать
    function handleClick () {
        //handleSubmit()

        //Изменяем name и about
        const body1JSON = {};
        body1JSON['name'] = profile.name;
        body1JSON['about'] = profile.about
        
        //Изменяем аватар    
        const body2JSON = {};
        body2JSON['avatar'] = profile.avatar;

        //Отправляем оба запроса
        Promise.all([api.setUserInfo(body1JSON), api.setUserAvatar(body2JSON)])
            .then(([_newElement1, _newElement2]) => {
                setUser(_newElement2)
                setProfil(user)
                getPostList()
                onOk()
            })
            .catch(errorData => {
                alert(errorData)
            })
    }

    function cancelChanges() {
        setProfil(user)
        onCancel()
    }

    //сохраняем данные в переменную
    function handleOnChangeInput (event) {
        setProfil({...profile, [event.target.name]:event.target.value})
    }

    return (
        <Modal
            title="Профиль"
            visible={isVisible}
            onOk={handleClick}
            onCancel={cancelChanges}
            okText="Создать"
            cancelText="Отмена"
        >                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input placeholder='url avatar-a' 
                                className="mb-1" 
                                type="text" 
                                name="avatar"
                                value={profile.avatar} 
                                onInput={handleOnChangeInput}
                            />
                        {profile?.avatar && <div className="row_jc_center"><img src={profile.avatar} className={cn("mb-2", s.avatar)}/></div>}
                    </div>

                    <label> 
                        ФИО
                        <Input placeholder='ФИО' 
                            className="mb-2" 
                            type="text" 
                            name="name"
                            value={profile.name} 
                            onInput={handleOnChangeInput}
                        />
                    </label>
                    <label> 
                        e-mail
                        <Input placeholder='Email' 
                            className="mb-2" 
                            type="text" 
                            name="email"
                            value={profile.email} 
                            onInput={handleOnChangeInput}
                            disabled
                        />
                    </label>
                    <label> 
                        about
                        <Input placeholder='about' 
                            className="mb-2" 
                            type="text" 
                            name="about"
                            value={profile.about} 
                            onInput={handleOnChangeInput}
                        />
                    </label>

                </form>
        </Modal>
    )
}