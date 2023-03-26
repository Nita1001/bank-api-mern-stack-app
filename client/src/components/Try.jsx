import { useState, useEffect } from 'react';
import { getUsers, createNewUser, updateUser } from '../api/bankAPI';

import './styles/Try.style.css'

const Try = () => {
  const [users, setUsers] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
    // getAccounts().then(data => setAccounts(data));
    // getTransactions().then(data => setTransactions(data));
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.firstName}</li>
        ))}
      </ul>
      <button onClick={()=>{
        // createNewUser();
        updateUser('641f80cdea8030f42e304b0d', 'Nita', 'Nice', 'nita@mail.com');
      }}>Try creating user</button>


      {/* <h1>Accounts</h1> */}
      {/* <ul>
        {accounts.map(account => (
          <li key={account._id}>{account.name}</li>
        ))}
      </ul> */}
      {/* <h1>Transactions</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>{transaction.amount}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Try;