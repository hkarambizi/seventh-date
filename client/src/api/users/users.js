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

export const submitUser = (user) => {
    const {first, last, email, password, age, gender, city} = user;
   return axios({
      method: 'post',
      url: '/users',
      data: {
        firstName: first,
        lastName: last,
        email,
        age: Number(age),
        gender,
        city,
        password
      }
    }).then(response => {
        console.log("Created user: id " + response.data.user._id);
        return response.data.user;
    }).catch(err=> {
      // handle error
      console.log("something happened")
      throw new Error(err)

  })
}

export const updateUserAvatar = ({ user, fileUrl }) => {
  return axios({
    method: 'put',
    url: `/users/${user._id}`,
    data: {
      avatar: fileUrl
    }
  }).catch(err=> {
    // handle error
    console.log("something happened")
    throw new Error(err)
})
}
