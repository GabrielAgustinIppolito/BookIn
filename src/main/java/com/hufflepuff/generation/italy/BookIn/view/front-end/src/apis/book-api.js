import axios from 'axios';

const rootUrl = 'http://localhost:8080/api';

export const getAuthentication = async(email, password) => {
  const response = await axios.post(`${rootUrl}/auth/authenticate`,
    {
      "email": `${email}`,
      "password": `${password}`
    },
  );
  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
}

export const registration = async(firstname, lastname, email, password, city) => {
  const response = await axios.post(`${rootUrl}/auth/register`, {
    "firstname": `${firstname}`,
    "lastname": `${lastname}`,
    "email": `${email}`,
    "password": `${password}`,
    "city_id": `${city}`
  });
  localStorage.setItem("token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.access_token);
}

export const getUser = async() => {
  const response = await axios.get(`${rootUrl}/books/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  
  return response.data;
}

export const getBookOwner = async(id) => {
  const response = await axios.get(`${rootUrl}/books/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return response.data;
}

export const getUserBooks = async() => {
  const response = await axios.get(`${rootUrl}/books/user/books`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return response.data;
}
export const getOwnerBooks = async(ownerId) => {
  const response = await axios.get(`${rootUrl}/books/user/books/${ownerId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return response.data;
}

export const getBook = async(id) => {
    const response = await axios.get(`${rootUrl}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
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

export const getCities = async() => {
  const response = await axios.get(`${rootUrl}/public/all-cities`);
  return response.data;
}

export const getUserCityPosix = async() => {
  const response = await axios.get(`${rootUrl}/books/user/city`,{
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
  console.log(response.data);
  return response.data;
}

export const getBooksByGenre = async(genreId) => {
  try {
    const response = await axios.get(`${rootUrl}/books/search-genre/${genreId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }});
      return response.data;
  } catch (error) {
    return error.response.status;
  }
}

export const getBooksByTag = async(tagId) => {
  try {
    const response = await axios.get(`${rootUrl}/books/search-genre/${tagId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }});
      return response.data;
  } catch (error) {
    return error.response.status;
  }
}

