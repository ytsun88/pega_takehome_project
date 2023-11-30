import AddUser from "./components/AddUser";
import { userContextProvider } from "./contexts/userContext";

function App() {
  return (
    <div className="App">
      <userContextProvider>
        <AddUser />
      </userContextProvider>
    </div>
  );
}

export default App;
