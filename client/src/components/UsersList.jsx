import { useState, useEffect } from "react";
import { getUsers, createNewUser, updateUser } from "../api/bankAPI";

import "./styles/UsersList.style.css";
import "./styles/createNewUser.style.css";

import TransferFunds from "./TransferFunds";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

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
    const [showActionComponent, setShowActionComponent] = useState(false);

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error("Error fetching users", error);
            });
    }, []);

    const handleAction = (action) => {
        if (currentAction === action) {
            setCurrentAction("");
            setShowActionComponent(false);
        } else {
            setCurrentAction(action);
            setShowActionComponent(true);
        }
    };

    const handleToggleUsersList = () => {
        setShowUsersList(!showUsersList);
        setSelectedUser(null);
        setShowActionComponent(false);
        setCurrentAction("");
    };

    const handleUserSelection = (user) => {
        setSelectedUser((prevSelectedUser) => {
            // Toggle user selection
            if (prevSelectedUser && prevSelectedUser._id === user._id) {
                return null; // Deselect
            } else {
                return user; // Select
            }
        });
        setShowActionComponent(false);
        setCurrentAction("");
    };

    const renderActionComponent = () => {
        const ActionComponent = actionComponents[currentAction];
        if (ActionComponent && showActionComponent) {
            return (
                <ActionComponent
                    users={users}
                    selectedUser={selectedUser}
                    setCurrentAction={setCurrentAction}
                />
            );
        }
        return null;
    };

    return (
        <div className="">
            {/* Toggle users list */}
            <button onClick={handleToggleUsersList}>
                {showUsersList ? "Hide Users List" : "Show Users List"}
            </button>

            {/* Conditionally render users list */}
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

            {/* Render appropriate action component */}
            {renderActionComponent()}
        </div>
    );
};

export default UsersList;
