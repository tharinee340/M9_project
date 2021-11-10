import { Route, Switch } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddFriend from "./pages/AddFriend";
import './App.css'
 
function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/addFriend">
            <AddFriend/>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
