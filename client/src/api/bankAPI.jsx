import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNewUser = async () => {
    try {
      const response = await axios.post('/api/users', {
        "firstName": '999',
        "lastName": "999",
        "email": "999@mail.com"
      });
      console.log(response);

    } catch (error) {
        console.log('error creating user api', error)
      throw error;
    }
  };
  
  export const updateUser = async (userId, firstName, lastName, email) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, {
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
        "email": `${email}`
      });
      console.log(response);
    } catch (error) {
        console.log('error creating user api', error)
      throw error;
    }
  };

// export const getAccounts = async () => {
//   try {
//     const response = await axios.get('/api/accounts');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getTransactions = async () => {
//   try {
//     const response = await axios.get('/api/transactions');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };