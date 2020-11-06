const axios = require('axios').default;

export const getUser = (id) => {
    return axios.get('/users/' + id)
    .then((response)=> {
        console.log("fetching user: id " + id);
        return response.data;
    })
    .catch((err)=> {
        throw new Error('Problem fetching user');
    })
}
