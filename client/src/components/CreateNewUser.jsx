import React, { useState } from "react";
import { createNewUser } from "../api/bankAPI";

import "./styles/createNewUser.style.css";

const CreateNewUser = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [creationConfirmed, setCreationConfirmed] = useState(false);

    const toggleCreate = () => {
        setShowForm(!showForm);
        setCreationConfirmed(false);
    };

    const handleConfirmCreateNewUser = () => {
        createNewUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
        })
            .then((response) => {
                setFirstName("");
                setLastName("");
                setEmail("");
                setCreationConfirmed(true);
                console.log("confirm created user res:", response);
                setUsers([...users, response.data]);
            })
            .catch((error) => {
                console.log("error creating user", error);
            });
    };

    const handleCancelCreateNewUser = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setShowForm(false);
    };

    return (
        <div className="create-new-user-container">
            {!creationConfirmed && (
                <>
                    {showForm ? (
                        <div className="form-container">
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                            <button onClick={handleConfirmCreateNewUser}>
                                Create
                            </button>
                            <button onClick={handleCancelCreateNewUser}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button onClick={toggleCreate}>Create New user</button>
                    )}
                </>
            )}
        </div>
    );
};

export default CreateNewUser;
