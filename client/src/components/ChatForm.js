import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client'
import { useParams } from 'react-router';
import axios from 'axios'
import { useSelector } from 'react-redux'

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

    const {id} = useParams()

    const search = useSelector(state=>state.search)

    const socket = io("http://localhost:8081")

    let user = JSON.parse(localStorage.getItem('user'))
    let id1 = user.id

    const [messages,setMessages] = useState([])

    useEffect(()=>{
        if(id1!==null){
            if(search!==null){
                axios.post('http://localhost:8080/auth/chat/searchmessages',{
                id:id1,
                id2:id,
                query:search
                }).then((response)=>{
                    setMessages(response.data.data)
                })
            }else{
                axios.post('http://localhost:8080/auth/chat/getmessages',{
                id:id1,
                id2:id
                }).then((response)=>{
                    setMessages(response.data.data)
                })
            }
        }
    },[search])

    const sendMessage = () => {
        let message = document.getElementById('message').value
        document.getElementById('message').value = ''
        socket.emit('new_message',id1,id,message)
        axios.post('http://localhost:8080/auth/chat/getmessages',{
            id:id1,
            id2:id
        }).then((response)=>{
            setMessages(response.data.data)
        })
    }

    return (
        <>
            <Container>
                <ChatContainer>
                    {messages.map((message)=>{
                        if(message.user_id1===id1){
                            return <ChatRight><TextChatRight>{message.message}</TextChatRight></ChatRight>
                        }else{
                            return <ChatLeft><TextChatLeft>{message.message}</TextChatLeft></ChatLeft>
                        }
                    })}
                </ChatContainer>
                <InputContainer>
                
                <InputGroup className="mb-3" style={{width: "80%"}}>
                    <FormControl
                    id='message'
                    style={{height: 45}}
                    placeholder="Type your message here ..."
                    />
                    <Button style={{backgroundColor: "white", color: "gray",border:"none", height: 45}} onClick={sendMessage}><SendIcon/></Button>
                </InputGroup>
                </InputContainer>
                
            </Container>
            
        </>
    )
}

export default ChatForm
