
const onResponce = (res)=> {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = `Bearer ${token}`;
    }

    // получение всех постов
    getPostList() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // получение информации о пользователе по токену в заголовках
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }


    // изменение name и about
    setUserInfo(bodyData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
            },
            body: JSON.stringify(bodyData)
        }).then(onResponce)
    }

    // изменение avatar 
    setUserAvatar(bodyData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
            },
            body: JSON.stringify(bodyData)
        }).then(onResponce)
    }

    // установка и снятие лайка по id
    changeLikeStatus(postId, isLike){
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // удаление поста по id
    deletePost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // получить информацию по посту
    getPost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "GET",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // создание поста
    createPost(bodyData) {
        return fetch(`${this._baseUrl}/posts`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then(onResponce)
    }  
    
    // изменение поста
    editPost(postId, bodyData) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then(onResponce)
    } 
    
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYWUiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.4aJAGCusHFZESpf-Skl4-xmDB9PkFCBjVvUCdsnY004'
}

const api = new Api(config);

export default api;