import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import {Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import SendIcon from '@mui/icons-material/Send';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { SocketContextCall } from '../ContextCall';
import { useParams } from 'react-router';
import { useHistory } from 'react-router'

const Container = styled.div`
    height: 90vh;
    width: 100vw;
`
const Left = styled.div`
    background-color: white;
    margin: 60px 8%;
    height: 76vh;
    border-radius: 5px;
`
const Right = styled.div`
    margin: 40px 8% 30px 0;
    padding-top: 30px;
    padding-right: 0;
    overflow: hidden;
    overflow-y: scroll;
    height: 68%;
`
const ChatContainer = styled.div`
    
    height: 68vh;
`
const ChatLeft = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    
    
`
const TextChatLeft = styled.p`
    padding: 10px 20px;
    background-color: whitesmoke;
    border-radius: 5px;
    
`
const ChatRight = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    
   
`
const TextChatRight = styled.p`
    color: white;
    padding: 10px 20px;
    background-color: whitesmoke;
    border-radius: 5px; 
    background-color: blue;
    margin-right: 15px;
`
const Title = styled.h5`
    color: white;
    margin-top: 50px;
`
const VideoContainer = styled.div`
    height: 85%;
    padding: 30px;
    width: 100%;
    /* background-color: red; */
    display: flex;
    
`
const Video = styled.div`
    width: 50%;
    background-color: blue;
    margin: 30px;
    border-radius: 5px;
`
const BtnContainer = styled.div`
    display: flex;
    justify-content: center;

`
const EndCall = styled.div`
    cursor: pointer;
    background-color: #DC4242;
    border-radius: 50%;
    color: white;
    :hover {
        background-color: red;
    }
    

`


const VideoForm = () => {

    let user = JSON.parse(localStorage.getItem('user'))

    const id = useParams()

    const history = useHistory()

    const { name, callAccepted, myVideo , userVideo , callEnded , call, leaveCall , stream } = useContext(SocketContextCall);

    useEffect(() => {
        if(user!==null) {
            
        } else {
            history.push('/login')
        }
        
    },[])

    const handleEndCall = () => {
        leaveCall(id.id)
        history.push(`/chat/${id.id}`)
        window.location.reload()
        
    }

    return (
        <>
        

            <Container>
                <Row style={{height: "90vh", width: "100vw"}}>
                    <Col md={9} style={{height: "90vh"}}>
                        <Left>
                            <VideoContainer>
                                
                                
                                { stream && <Video>{name || 'My Name'}<video style={{width: "100%"}} playsInline muted ref={myVideo} autoPlay/></Video> }
                                
                                
                                { callAccepted &&  !callEnded && <Video>{call.name || 'Friend Name'}<video style={{width: "100%"}} playsInline muted ref={userVideo} autoPlay/></Video> }

                            </VideoContainer>
                            <BtnContainer>
                                <EndCall><CallEndIcon style={{fontSize: 60, padding: 10}} onClick={handleEndCall}/></EndCall>
                            </BtnContainer>
                            
                        </Left>
                    </Col>
                    <Col md={3} style={{height: "90vh"}}>
                        
                        <Title>Messages</Title>
                        <Right>
                        <ChatContainer>
                                    
                            <ChatLeft><TextChatLeft>Hi</TextChatLeft></ChatLeft>
                            
                            <ChatRight><TextChatRight>Hello How are you</TextChatRight></ChatRight>
                            

                            <ChatLeft><TextChatLeft>I'm finddd, how are you</TextChatLeft></ChatLeft>

                            <ChatRight><TextChatRight>Not bad.</TextChatRight></ChatRight>
                            <ChatLeft><TextChatLeft>Hi</TextChatLeft></ChatLeft>
                            
                            <ChatRight><TextChatRight>Hello How are you</TextChatRight></ChatRight>
                            

                            <ChatLeft><TextChatLeft>I'm finddd, how are you</TextChatLeft></ChatLeft>

                            <ChatRight><TextChatRight>Not bad.</TextChatRight></ChatRight>
                            <ChatLeft><TextChatLeft>Hi</TextChatLeft></ChatLeft>
                            
                            <ChatRight><TextChatRight>Hello How are you</TextChatRight></ChatRight>
                            

                            <ChatLeft><TextChatLeft>I'm finddd, how are you</TextChatLeft></ChatLeft>

                            <ChatRight><TextChatRight>Not bad.</TextChatRight></ChatRight>
                        
                        </ChatContainer>
                </Right>

                <InputGroup style={{width: "92%", marginBottom:0, backgroundColor: "red"}}>
                    <FormControl
                    style={{height: 45}}
                    placeholder="Type your message here ..."
                    />
                    <Button 
                        style={{backgroundColor: "white", color: "gray",border:"none", height: 45}}
                    >
                        <SendIcon/></Button>
                </InputGroup>
                
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default VideoForm
