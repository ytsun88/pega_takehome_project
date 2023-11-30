import UserList from "./components/UserList";
import { UserContextProvider } from "./contexts/userContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <UserList />
      </UserContextProvider>
    </div>
  );
}

export default App;
