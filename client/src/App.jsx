import { useState } from "react";
import UsersList from "./components/UsersList";
import CreateNewUser from "./components/CreateNewUser";

import "./App.css";

function App() {
    return (
        <div className="App">
            <div className="bank">
                <UsersList />
                <CreateNewUser />
            </div>
        </div>
    );
}

export default App;
