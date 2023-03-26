import { useState } from "react";
import UsersList from "./components/UsersList";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <h1>Hey :)</h1>
            <UsersList />
        </div>
    );
}

export default App;
