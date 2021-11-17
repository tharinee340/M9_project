import React, { useContext, useEffect , useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { SocketContextCall } from '../ContextCall'
import { useHistory } from 'react-router'
import axios from 'axios'

const Container = styled.div`
    /* display: flex;
    justify-content: flex-end; */
    align-items: center;
    padding: 20px;
    position: absolute;
    right: 0;
    top: 0;
    
`
const NotiPop = styled.div`
    display: flex;
    width: 30;
    background-color: rgba(255,255,255,1);
    align-items: center;
    border-radius: 5px;
    padding: 10px 20px;
    
`
const Title = styled.h5``

const NotiCall = () => {
    const [stream, setStream] = useState(null);
    const { call, answerCall, callAccepted, myVideo, userVideo} = useContext(SocketContextCall)
    const history = useHistory();

        const handleAccept = () => {
            
            
            navigator.mediaDevices.getUserMedia({ video: true, audio: true})
            .then((currentStream) => {
                // console.log(currentStream)
                // setStream(currentStream);
                // console.log("Hii")

                // // myVideo.current.srcObject = currentStream;
                setStream(currentStream);
                // userVideo.current.srcObject = currentStream;
                // console.log(myVideo)
                answerCall(stream)

                


            })
            history.push(`/call/${call.userToCall}`)
            window.location.reload(true)
        }
        


    return (
        <>  
            { call.isReceivingCall && !callAccepted && (

                <Container>
                    <NotiPop>
                        <Title> {call.name} is calling...</Title>
                        
                        <Button variant="success" style={{marginLeft: 20}} onClick={handleAccept}>Accept</Button>
                        <Button variant="danger" style={{marginLeft: 20}}>Decline</Button>
                    </NotiPop>
                </Container>
            )}
            
        </>
    )
}

export default NotiCall
