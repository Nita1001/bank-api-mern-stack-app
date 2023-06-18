# Bank API

This is a bank API that allows a bank manager to manage users of the bank by performing various actions such as adding users, depositing cash, updating credit, withdrawing money, transferring money, and fetching user details.

## Technologies Used

- MongoDB Atlas
- Express.js
- React
- node.js
- Postman

## Features

- Add users to the bank with ID, cash (default 0), and credit (default 0).
- Deposit cash to a user by the user's ID and amount of cash.
- Update a user's credit (only positive numbers).
- Withdraw money from the user (can withdraw money until the cash and credit run out).
- Transfer money from one user to another with credit (can transfer money until the cash and credit run out).
- Fetch all details of a particular user.
- Fetch all details of all the users.
- Filter users by the amount of cash they have.

## Setup and Installation

1. Clone this repository to your local machine
2. Navigate to the `client` directory and run `npm install` to install the necessary dependencies for the React client
3. Navigate to the `server` directory and run `npm install` to install the necessary dependencies for the Node.js server
4. In the `server` directory, create a `.env` file with the following environment variables:

- MONGO_URI= [insert your MongoDB URI here]

## Usage

1. Start the server by running `npm start`.
2. Open Postman and test the endpoints by sending requests to the server.

3. Open the React app by navigating to the client directory and running `npm start`.
4. Use the front-end site to manage the users of the bank.

## Use Cases

1. Cannot add duplicate users.
2. When fetching users, make sure they exist.
3. Error messages will be sent to the client if any other use cases are not satisfied.

## Filtering

- Users can be filtered by the amount of cash they have.
- Additional filters can be added as needed.

## Conclusion

This project is a bank API that provides a simple way for a bank manager to manage users of the bank. It uses MongoDB Atlas for the database, Express.js for the backend, React for the frontend, and Postman for testing. The project includes several features and filters, and error messages are sent to the client when use cases are not satisfied.

## Accessing the Application
The bank API is hosted on Cyclic and can be accessed by navigating to the following URL: [neat-bank](https://neat-bank.cyclic.app/)

## Contributing

Contributions are welcomed If you find any bugs or have suggestions for improving, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
