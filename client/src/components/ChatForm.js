import React from 'react'
import styled from 'styled-components'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import SendIcon from '@mui/icons-material/Send';

const Container = styled.div`
    width: 90%;
    height: 91vh;
    padding: 3%;
    margin-left: 5%;

`
const InputContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
`
const ChatContainer = styled.div`
    margin: 0 10% 60px 10%;
    height: 70vh;
    overflow: hidden;
    overflow-y: scroll;

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

const ChatForm = () => {
    return (
        <>
            <Container>
                <ChatContainer>
                    
                    <ChatLeft><TextChatLeft>Hi</TextChatLeft></ChatLeft>
                    
                    <ChatRight><TextChatRight>Hello How are you</TextChatRight></ChatRight>
                    

                    <ChatLeft><TextChatLeft>I'm finddd, how are you</TextChatLeft></ChatLeft>

                    <ChatRight><TextChatRight>Not bad.</TextChatRight></ChatRight>
                
                </ChatContainer>
                <InputContainer>
                
                <InputGroup className="mb-3" style={{width: "80%"}}>
                    <FormControl
                    style={{height: 45}}
                    placeholder="Type your message here ..."
                    />
                    <Button style={{backgroundColor: "white", color: "gray",border:"none", height: 45}}><SendIcon/></Button>
                </InputGroup>
                </InputContainer>
                
            </Container>
            
        </>
    )
}

export default ChatForm
