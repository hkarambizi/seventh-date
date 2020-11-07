const axios = require('axios').default;

// API - uploads to s3
  export const submitFile = (file) => {
      const formData = new FormData();
      formData.append('file', file[0]);
      return axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).catch((err) => {
      // handle error
      console.log(err)
    })
  };
