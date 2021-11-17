import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddFriend from "./pages/AddFriend";
import Request from "./pages/Request";
import Chat from "./pages/Chat";
import VideoCall from "./pages/VideoCall";
import './App.css'
import {SocketContext, socket} from './context/socket'
import NotiCall from "./components/NotiCall";
import ChatHistory from "./pages/ChatHistory";
 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <>
    <SocketContext.Provider value={socket}>
      <div className="App">
        <NotiCall/>
        <Router>
          <Switch>
          
            <Route Route path="/chat/:id">
              <Chat/>
            </Route>
            <Route Route path="/chathistory/:id/:query">
              <ChatHistory/>
            </Route>
            <Route Route exact path="/call/:id">
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
            <Route path="/testNoti">
              <NotiCall/>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
        
          </Switch>
        </Router>
      </div>
      </SocketContext.Provider>
    </>
  );
}

export default App;
