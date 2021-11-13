import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { SocketContextCall } from '../ContextCall'

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

    const { call, answerCall, callAccepted } = useContext(SocketContextCall)
    return (
        <>  
            { call.isReceivingCall && !callAccepted && (

                <Container>
                    <NotiPop>
                        <Title> {call.name} is calling...</Title>
                        
                        <Button variant="success" style={{marginLeft: 20}} onClick={answerCall}>Accept</Button>
                        <Button variant="danger" style={{marginLeft: 20}}>Decline</Button>
                    </NotiPop>
                </Container>
            )}
            
        </>
    )
}

export default NotiCall
