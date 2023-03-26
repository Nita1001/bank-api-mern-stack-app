import axios from "axios";

export const getUsers = async () => {
    try {
        const response = await axios.get("/api/users");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createNewUser = async ({ firstName, lastName, email }) => {
    try {
        const response = await axios.post("/api/users", {
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            email: email.toString(),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log("error creating user api", error);
        throw error;
    }
};

export const updateUser = async (userId, firstName, lastName, email) => {
    try {
        const response = await axios.put(`/api/users/${userId}`, {
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            email: email.toString(),
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log("error creating user api", error);
        throw error;
    }
};

export const depositCash = async (userId, accountId, amount) => {
    console.log("depositCash function called");
    try {
        const response = await axios.post(`/api/transactions/deposit`, {
            userId: userId,
            accountId: accountId,
            amount: amount,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log("error depositCash to user api", error);
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
