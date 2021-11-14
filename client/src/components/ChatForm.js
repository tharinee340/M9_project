import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import SendIcon from '@mui/icons-material/Send';
import {SocketContext} from '../context/socket';
import { useHistory, useParams } from 'react-router';
import axios from 'axios'

const Container = styled.div`
    width: 90%;
    height: 90vh;
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

const Timestamp = styled.p`
    color:white;
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 9px;
`

const ChatForm = () => {

    const socket = useContext(SocketContext);

    const {id} = useParams()

    const history = useHistory()

    let user = JSON.parse(localStorage.getItem('user'))

    const [messages,setMessages] = useState([])

    const [text,setText] = useState("")

    useEffect(()=>{
        
        if(user!==null){
            axios.post('http://localhost:8080/auth/chat/getmessages',{
            id:user.id,
            id2:id
            }).then((response)=>{
                setMessages(response.data.data)
            })
        }else{
            history.push('/login')
        }
    },[id])

    const sendMessage = () => {
        socket.emit('new_message',user.id,id,text)
    }

    socket.on('sent_message',()=>{
        axios.post('http://localhost:8080/auth/chat/getmessages',{
            id:user.id,
            id2:id
        }).then((response)=>{
            setMessages(response.data.data)
        })
    })

    socket.on('clear_message',()=>{
        axios.post('http://localhost:8080/auth/chat/getmessages',{
            id:user.id,
            id2:id
        }).then((response)=>{
            setMessages(response.data.data)
        })
    })

    //image avatar
    //<img style={{borderRadius:"30px",marginTop:'-8px',marginRight:'15px',objectFit:'cover'}} width="60px" height="60px" src="https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg"/>

    return (
        <>
            <Container>
                <ChatContainer>
                    {messages.map((message)=>{
                        let dat = message.sendtime.split(' ')
                        let dat2 = dat[1].split(':')
                        let time = dat2[0] + ':' + dat2[1]
                        if(message.user_id1===user.id){
                            return <ChatRight><Timestamp>{time}</Timestamp><TextChatRight>{message.message}</TextChatRight></ChatRight>
                        }else{
                            return <ChatLeft><TextChatLeft>{message.message}</TextChatLeft><Timestamp>{time}</Timestamp></ChatLeft>
                        }
                    })}
                </ChatContainer>
                <InputContainer>
                
                <InputGroup className="mb-3" style={{width: "80%"}}>
                    <FormControl
                    id='message'
                    style={{height: 45}}
                    placeholder="Type your message here ..."
                    onChange={(e)=>{setText(e.target.value)}}
                    />
                    <Button style={{backgroundColor: "white", color: "gray",border:"none", height: 45}} onClick={sendMessage}><SendIcon/></Button>
                </InputGroup>
                </InputContainer>
                
            </Container>
            
        </>
    )
}

export default ChatForm
