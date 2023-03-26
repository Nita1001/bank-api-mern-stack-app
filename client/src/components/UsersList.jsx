import { useState, useEffect } from "react";
import { getUsers, createNewUser, updateUser } from "../api/bankAPI";

import "./styles/UsersList.style.css";
import TransferFunds from "./TransferFunds";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentAction, setCurrentAction] = useState("");

    useEffect(() => {
        getUsers().then((data) => setUsers(data));
    }, []);

    const handleTransferFunds = () => {
        setCurrentAction("transfer");
    };

    const handleDepositCash = () => {
        setCurrentAction("deposit");
    };

    const handleWithdrawCash = () => {
        setCurrentAction("withdraw");
    };

    return (
        <div className="App">
            <h1>Users</h1>

            <ol className="listed">
                {users.map((user) => (
                    <li key={user._id} onClick={() => setSelectedUser(user)}>
                        <a href="#">{user.firstName}</a>
                    </li>
                ))}
            </ol>

            {selectedUser && (
                <div>
                    <h2>
                        {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                    <p>Email: {selectedUser.email}</p>
                    <button onClick={handleTransferFunds}>
                        Transfer Funds
                    </button>
                    <button onClick={handleDepositCash}>Deposit Cash</button>
                    <button onClick={handleWithdrawCash}>Withdraw Cash</button>
                </div>
            )}

            {currentAction === "transfer" && (
                <TransferFunds
                    users={users}
                    selectedUser={selectedUser}
                    setCurrentAction={setCurrentAction}
                />
            )}

            {currentAction === "deposit" && (
                <Deposit
                    users={users}
                    selectedUser={selectedUser}
                    setCurrentAction={setCurrentAction}
                />
            )}

            {currentAction === "withdraw" && (
                <Withdraw
                    users={users}
                    selectedUser={selectedUser}
                    setCurrentAction={setCurrentAction}
                />
            )}
        </div>
    );
};

export default UsersList;
