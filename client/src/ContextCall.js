import React, {useState, useEffect, createContext, useRef} from 'react'
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useHistory } from 'react-router'

const SocketContextCall = createContext();

const socket = io('http://localhost:8081')

const ContextCallProvider = ({children}) => {
    // const [stream, setStream] = useState(null);
    const [me, setMe] = useState('')
    const [call, setCall] = useState('')
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')


    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const history = useHistory()

    useEffect(() => {

         socket.on('me', (id) => setMe(id));
         socket.on('callUser', ({ from, name: callerName, signal}) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
         })

    }, []);


    const answerCall = (stream) => {
        setCallAccepted(true)
        
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from})
        })

        peer.on('stream' ,(currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        //มาจาก calluser inline 117
        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id, stream) => {

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name})
        })

        peer.on('stream' ,(currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal)
        })

        connectionRef.current = peer;
    }

    const leaveCall = (id) => {

        setCallEnded(true);
        // connectionRef.current.destroy();

        window.location.reload()
        // history.push(`/chat/:${id}`)
        // history.push('/home')

        //อาจใช้ useHistory มาช่วยให้เปลี่ยนไปอีกหน้่แล้วค่อย reload window

    }

    return (
        <SocketContextCall.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}
        >
        { children }
        </SocketContextCall.Provider>
    )

}

export {ContextCallProvider, SocketContextCall}


