import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddFriend from "./pages/AddFriend";
import Request from "./pages/Request";
import Chat from "./pages/Chat";
import VideoCall from "./pages/VideoCall";
import './App.css'
 
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            
            <Route Route path="/chat/:id">
              <Chat/>
            </Route>
            <Route Route path="/call/:id">
              <VideoCall/>
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
            <Route path="/friendRequest">
              <Request/>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
        
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
