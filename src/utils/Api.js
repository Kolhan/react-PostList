
const onResponce = (res)=> {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = `Bearer ${token}`;
    }

    getPostList() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // getProductsList(){
    //     return fetch(`${this._baseUrl}/products`, {
    //         headers: {
    //             authorization: this._token,
    //         },
    //     }).then(onResponce)
    // }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    // searchProducts(searchQuery){
    //     return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
    //         headers: {
    //             authorization: this._token,
    //         },
    //     }).then(onResponce)
    // }

    // setUserInfo(userData){
    //     return fetch(`${this._baseUrl}/users/me`, {
    //         method: "PATCH",
    //         headers: {
    //             authorization: this._token,
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(userData)
            
    //     }).then(onResponce)
    // }

    changeLikeStatus(postId, isLike){
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }
    
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
}

const api = new Api(config);

export default api;