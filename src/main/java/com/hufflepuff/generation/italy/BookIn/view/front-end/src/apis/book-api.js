import axios from 'axios';

const rootUrl = 'http://localhost:8080/api';

export const getAuthentication = async(email, password) => {
  const response = await axios.post(`${rootUrl}/v1/auth/authenticate`,
    {
      "email": `${email}`,
      "password": `${password}`
    },
    // {
    //   headers : {"Access-Control-Allow-Origin": "*"},
    // }
  );
  localStorage.setItem("token", response.data.access_token);
}

export const registration = async(firstname, lastname, email, password) => {
  const response = await axios.post(`${rootUrl}/v1/auth/register`, {
    "firstname": `${firstname}`,
    "lastname": `${lastname}`,
    "email": `${email}`,
    "password": `${password}`,
  });
  localStorage.setItem("token", response.data.access_token);
}

export const getBook = async(id) => {
    const response = await axios.get(`${rootUrl}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    return response.data.results;
  }

