import { Route, Switch } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
 
function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
