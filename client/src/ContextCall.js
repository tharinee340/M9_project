import React, {useState, createContext, useRef,useEffect} from 'react'
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContextCall = createContext();

const socket = io('http://localhost:8081')

const ContextCallProvider = ({children}) => {
  const [stream,setStream] = useState(null)
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');


  const myVideo = useRef({});
  const userVideo = useRef({}); 
  const connectionRef = useRef({});
  
  useEffect(() => {
    const getUserMedia = async () => {
      try{
        let streamm = await navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        setStream(streamm);
        myVideo.current.srcObject = streamm
        console.log(myVideo.current.srcObject)
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

    console.log('answer', stream )

    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream:stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from  });
    });

    peer.on('stream', (streamm) => {
      userVideo.current.srcObject = streamm;
    });

    console.log('call',call)

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (usersocket,id) => {
    console.log(connectionRef)

    console.log('call',stream)

    console.log('myVideo',myVideo)

    const peer = new Peer({ initiator: true, trickle: false, stream:stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: usersocket, signalData: data, from: me, name, id });
    });

    peer.on('stream', (streamm) => {
      userVideo.current.srcObject = streamm;
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


