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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

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

    const toggleForm = () => {
        setShowForm(!showForm);
    };
    const handleConfirmCreateNewUser = () => {
        createNewUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
        }).then((response) => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setCurrentAction("");
            console.log("rrrrrr", response);
            // setUsers([...users, response.data]);
        });
    };

    const handleCancelCreateNewUser = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setCurrentAction("");
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

            {currentAction === "create" && (
                <div>
                    <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <button onClick={handleConfirmCreateNewUser}>Create</button>
                    <button onClick={handleCancelCreateNewUser}>Cancel</button>
                </div>
            )}

            <button onClick={() => setCurrentAction("create")}>
                Create New user
            </button>
        </div>
    );
};

export default UsersList;
