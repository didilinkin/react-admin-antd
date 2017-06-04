import axios from 'axios'

export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: 'trending',
    period: 'day',
    lang: 'javascript',
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data
}).catch(function (error) {
    console.log(error)
})
