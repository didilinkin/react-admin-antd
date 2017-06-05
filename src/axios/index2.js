import axios from 'axios'

export const getget = (url, json) => axios.get(url, json).then(function (response) {
    return response.data
}).catch(function (error) {
    console.log(error)
    console.log('ww')
})
