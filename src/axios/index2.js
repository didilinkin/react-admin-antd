import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const postpost = (url, json) => {
    return new Promise(function (resolve, reject) {
        axios.post(url, json).
            then(response => {
                let resulData = response.data
                resolve(resulData)
            }).
            catch(error => {
                reject(error)
            })
    })
}

export const asyncGet = async (url, json) => {
    try {
        let result = await postpost(url, json)
        debugger
        return result
    } catch (err) {
        console.log(err)
    }
}
