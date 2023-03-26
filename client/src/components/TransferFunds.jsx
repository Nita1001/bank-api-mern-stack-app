import React, { useState } from "react";

const TransferFunds = ({ selectedUser, users, handleTransferTarget }) => {
    const [transferAmount, setTransferAmount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleTransferAmount = (event) => {
        setTransferAmount(Number(event.target.value));
    };

    const handleConfirmTransfer = () => {
        const targetUser = users.find((user) => user._id !== selectedUser._id);
        console.log(
            `Transferred $${transferAmount} from ${selectedUser.firstName} ${selectedUser.lastName} to ${targetUser.firstName} ${targetUser.lastName}`
        );
        setShowConfirmation(false);
        handleTransferTarget(targetUser);
    };

    const handleTransferCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            {showConfirmation ? (
                <div>
                    <h3>Confirm Transfer:</h3>
                    <p>
                        Transfer $ {transferAmount} from{" "}
                        {selectedUser.firstName} {selectedUser.lastName} to{" "}
                        {
                            users.find((user) => user._id !== selectedUser._id)
                                .firstName
                        }{" "}
                        {
                            users.find((user) => user._id !== selectedUser._id)
                                .lastName
                        }
                    </p>
                    <button onClick={handleConfirmTransfer}>Confirm</button>
                    <button onClick={handleTransferCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>Enter transfer amount:</h3>
                    <input
                        type="number"
                        value={transferAmount}
                        onChange={handleTransferAmount}
                    />
                    <h3>Select target user to transfer funds to:</h3>
                    <ol className="listed">
                        {users
                            .filter((user) => user._id !== selectedUser._id)
                            .map((user) => (
                                <li
                                    key={user._id}
                                    onClick={() => setShowConfirmation(true)}
                                >
                                    <a href="#">{user.firstName}</a>
                                </li>
                            ))}
                    </ol>
                </div>
            )}
        </>
    );
};

export default TransferFunds;
