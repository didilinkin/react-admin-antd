import axios from 'axios'

export const getPros = (url, json) => axios.post(url, json).then(function (response) {
    return response.data
}).catch(function (error) {
    console.log(error)
})
