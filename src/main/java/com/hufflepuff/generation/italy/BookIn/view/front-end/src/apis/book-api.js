import axios from 'axios';

const rootUrl = 'http://localhost:8080/api';

export const getAuthentication = async(email, password) => {
  const response = await axios.post(`${rootUrl}/v1/auth/authenticate`,
    {
      "email": `${email}`,
      "password": `${password}`
    },
  );
  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
}

export const registration = async(firstname, lastname, email, password) => {
  const response = await axios.post(`${rootUrl}/v1/auth/register`, {
    "firstname": `${firstname}`,
    "lastname": `${lastname}`,
    "email": `${email}`,
    "password": `${password}`,
  });
  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.access_token);
}

export const getBook = async(id) => {
    const response = await axios.get(`${rootUrl}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }

  export const getTags = async() => {
    const response = await axios.get(`${rootUrl}/books/all-tags`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
  export const getGenres = async() => {
    const response = await axios.get(`${rootUrl}/books/all-genres`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
  
  export const saveBook = async(bookWrapper) => {
    const response = await axios.post(`${rootUrl}/books/register-new-book`,
     bookWrapper,
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }