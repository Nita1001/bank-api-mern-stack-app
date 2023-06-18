import { useState, useEffect } from "react";
import { getUsers } from "../api/bankAPI";

import TransferFunds from "./TransferFunds";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

import "./styles/UsersList.style.css";
import "./styles/createNewUser.style.css";

const actionComponents = {
    transfer: TransferFunds,
    deposit: Deposit,
    withdraw: Withdraw,
};

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentAction, setCurrentAction] = useState("");
    const [showUsersList, setShowUsersList] = useState(true);

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error("Error fetching users", error);
            });
    }, []);

    const handleToggleUsersList = () => {
        setShowUsersList((prevShowUsersList) => !prevShowUsersList);
        setSelectedUser(null);
        setCurrentAction("");
    };

    const handleUserSelection = (user) => {
        setSelectedUser((prevSelectedUser) => {
            return prevSelectedUser && prevSelectedUser._id === user._id
                ? null
                : user;
        });
        setCurrentAction("");
    };

    const handleAction = (action) => {
        setCurrentAction((prevCurrentAction) =>
            prevCurrentAction === action ? "" : action
        );
    };

    const renderActionComponent = () => {
        const ActionComponent = actionComponents[currentAction];
        return ActionComponent && selectedUser ? (
            <ActionComponent
                users={users}
                selectedUser={selectedUser}
                setCurrentAction={setCurrentAction}
            />
        ) : null;
    };

    return (
        <div className="">
            <button onClick={handleToggleUsersList}>
                {showUsersList ? "Hide Users List" : "Show Users List"}
            </button>

            {showUsersList && (
                <ol className="listed">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            onClick={() => handleUserSelection(user)}
                            className={
                                selectedUser && selectedUser._id === user._id
                                    ? "selected"
                                    : ""
                            }
                        >
                            <a href="#">{user.firstName}</a>
                        </li>
                    ))}
                </ol>
            )}

            {selectedUser && (
                <div className="users-data">
                    <h2>
                        {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                    <p>Email: {selectedUser.email}</p>
                    <button onClick={() => handleAction("transfer")}>
                        {currentAction === "transfer"
                            ? "Hide Transfer"
                            : "Transfer Funds"}
                    </button>
                    <button onClick={() => handleAction("deposit")}>
                        {currentAction === "deposit"
                            ? "Hide Deposit"
                            : "Deposit Cash"}
                    </button>
                    <button onClick={() => handleAction("withdraw")}>
                        {currentAction === "withdraw"
                            ? "Hide Withdraw"
                            : "Withdraw Cash"}
                    </button>
                </div>
            )}

            {renderActionComponent()}
        </div>
    );
};

export default UsersList;
