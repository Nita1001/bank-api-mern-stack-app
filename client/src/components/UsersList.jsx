import { useState, useEffect } from "react";
import { getUsers, createNewUser, updateUser } from "../api/bankAPI";

import "./styles/UsersList.style.css";
import TransferFunds from "./TransferFunds";

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

    const handleTransferTarget = (targetUser) => {
        console.log(
            `Transferred funds from ${selectedUser.firstName} ${selectedUser.lastName} to ${targetUser.firstName} ${targetUser.lastName}`
        );
        setCurrentAction("");
    };

    const handleDepositAmount = (event) => {
        console.log(
            `Deposited ${event.target.value} to ${selectedUser.firstName} ${selectedUser.lastName}`
        );
    };

    const handleWithdrawAmount = (event) => {
        console.log(
            `Withdrew ${event.target.value} from ${selectedUser.firstName} ${selectedUser.lastName}`
        );
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
                    handleTransferTarget={handleTransferTarget}
                    setCurrentAction={setCurrentAction}
                />
            )}

            {currentAction === "deposit" && (
                <div>
                    <h3>Enter amount to deposit:</h3>
                    <input type="number" onChange={handleDepositAmount} />
                </div>
            )}

            {currentAction === "withdraw" && (
                <div>
                    <h3>Enter amount to withdraw:</h3>
                    <input type="number" onChange={handleWithdrawAmount} />
                </div>
            )}
        </div>
    );
};

export default UsersList;
