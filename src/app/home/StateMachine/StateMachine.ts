import { assign } from 'xstate'

const quizStates = {
    id: 'quiz',
    initial: 'Loading',
    context: {
        categories: [],
        quizzes: [],
        users: []
    },
    states: {
        Loading: {
            invoke: {
                id: 'getCategories',
                src: 'getCategories',
                onDone: {
                    target: 'RenderUI',
                },
                onError: {
                    target: 'loadingError'
                }
            }
        },
        loadingError: {},
        RenderUI: {}
    }
}

const fetchApi = (url, options) => {
    const user = JSON.parse(localStorage.currentUser)
    let token = ''
    if (user) {
        token = user.jwt
    }
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        ...options,
    })
}

const baseUrl = 'https://quiz-strapi.herokuapp.com'
const services = {
    getCategories: (ctx, event) => {
        const url = `${baseUrl}/categories`
        return new Promise((resolve, reject) => {
            fetchApi(url, {})
                .then(res => res.json())
                .then(data => {
                    ctx.categories = data
                    resolve(data)
                })
                .catch(err => reject(err))
        })
    }
}
export { quizStates, services }
