import React, { useState } from "react";
import { createNewUser } from "../api/bankAPI";

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
                console.log("rrrrrr", response);
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
        <>
            {!creationConfirmed && (
                <>
                    {showForm ? (
                        <>
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
                        </>
                    ) : (
                        <button onClick={toggleCreate}>Create New user</button>
                    )}
                </>
            )}
        </>
    );
};

export default CreateNewUser;
