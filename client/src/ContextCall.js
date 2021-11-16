import React, {useState, createContext, useRef} from 'react'
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContextCall = createContext();

const socket = io('http://localhost:8081')

const ContextCallProvider = ({children}) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef(null)
  const userVideo = useRef();
  const connectionRef = useRef();

  const answerCall = (stream) => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id,stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
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
      setCall
    }}
    >
      {children}
    </SocketContextCall.Provider>
  );

}

export {ContextCallProvider, SocketContextCall}


