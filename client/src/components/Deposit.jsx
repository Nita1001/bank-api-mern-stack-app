import React, { useState } from "react";
import { depositCash } from "../api/bankAPI";

const Deposit = ({ users, selectedUser, setCurrentAction }) => {
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
            console.log(
                "11111111",
                selectedUser._id,
                selectedUser.accountId,
                event.target.value
            );
            // await depositCash(
            //     selectedUser.id,
            //     selectedUser.accountId,
            //     event.target.value
            // );
            // setCurrentAction("");
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
                    <h3>Confirm Deposit:</h3>
                    <p>
                        Deposit $ {depositAmount} to {selectedUser.firstName}
                    </p>
                    <button onClick={handleConfirmDeposit}>Confirm</button>
                    <button onClick={handleDepositCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>Enter amount to deposit:</h3>
                    <input
                        type="number"
                        min="0"
                        onChange={handleDepositAmount}
                    />
                    <button onClick={() => setShowConfirmation(true)}>
                        Deposit
                    </button>
                </div>
            )}
        </>
    );
};
export default Deposit;
