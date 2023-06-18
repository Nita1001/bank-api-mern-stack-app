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

const renderActionComponent = (
    currentAction,
    users,
    selectedUser,
    setCurrentAction
) => {
    const ActionComponent = actionComponents[currentAction];
    if (ActionComponent) {
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

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentAction, setCurrentAction] = useState("");
    const [showUsersList, setShowUsersList] = useState(true);

    useEffect(() => {
        getUsers().then((data) =>
            setUsers(data).catch((error) => {
                console.error("Error fetching users", error);
            })
        );
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

    const handleToggleUsersList = () => {
        setShowUsersList(!showUsersList);
        handleUserSelection(selectedUser);
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
                    <button onClick={handleTransferFunds}>
                        Transfer Funds
                    </button>
                    <button onClick={handleDepositCash}>Deposit Cash</button>
                    <button onClick={handleWithdrawCash}>Withdraw Cash</button>
                </div>
            )}

            {/* Render appropriate action component */}
            {renderActionComponent(
                currentAction,
                users,
                selectedUser,
                setCurrentAction
            )}
        </div>
    );
};

export default UsersList;
