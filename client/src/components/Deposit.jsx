import React, { useState } from "react";

const Deposit = ({ users, selectedUser }) => {
    const [depositAmount, setDepositAmount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDepositAmount = (event) => {
        setDepositAmount(Number(event.target.value));
    };

    const handleConfirmDeposit = () => {
        const targetUser = users.find((user) => user._id === selectedUser._id);
        if (targetUser) {
            console.log(
                `Deposited $${depositAmount} to ${targetUser.firstName} ${targetUser.lastName}`
            );
        } else {
            console.log("something went wrong");
        }
        setShowConfirmation(false);
    };

    const handleDepositCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            {showConfirmation ? (
                <div>
                    <h3>Confirm Transfer:</h3>
                    <p>
                        Deposit $ {depositAmount} to {selectedUser.firstName}
                    </p>
                    <button onClick={handleConfirmDeposit}>Confirm</button>
                    <button onClick={handleDepositCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>Enter amount to deposit:</h3>
                    <input type="number" onChange={handleDepositAmount} />
                    <button onClick={() => setShowConfirmation(true)}>
                        Deposit
                    </button>
                </div>
            )}
        </>
    );
};
export default Deposit;
