
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

    // установка и снятие лайка по id
    changeLikeStatus(postId, isLike){
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    //удаление поста по id
    deletePost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
            },
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