import React, {useState, createContext, useRef,useEffect} from 'react'
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useHistory } from 'react-router';

const SocketContextCall = createContext();

const socket = io('http://localhost:8081')

const ContextCallProvider = ({children}) => {
  
  const history = useHistory();

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef({});
  const userVideo = useRef({}); 
  const connectionRef = useRef({});
  const [stream,setStream] = useState({})
  useEffect(() => {
    const getUserMedia = async () => {
      try{
        let streamm = await navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        setStream(streamm);
      }catch(err){
        throw err
      }
    }
    getUserMedia()

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ signal , from , name: callerName, userToCall }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal , userToCall});
    });
    
  }, []);

  const answerCall = () => {

    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream:stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from  });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;

    history.push(`/call/${call.userToCall}`)

  };

  const callUser = (usersocket,id) => {

    const peer = new Peer({ initiator: true, trickle: false, stream:stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: usersocket, signalData: data, from: me, name, id });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContextCall.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      name,
      callEnded,
      me,
      setMe,
      setName,
      callUser,
      leaveCall,
      answerCall,
      setCall,
      setStream,
      stream
    }}
    >
      {children}
    </SocketContextCall.Provider>
  );

}

export {ContextCallProvider, SocketContextCall}


