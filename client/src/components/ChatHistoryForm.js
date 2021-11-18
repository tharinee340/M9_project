import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import {SocketContext} from '../context/socket';
import { useHistory, useParams } from 'react-router';
import axios from 'axios'

const Container = styled.div`
    width: 90%;
    height: 91vh;
    padding: 3%;
    margin-left: 5%;

`
const ChatContainer = styled.div`
    margin: 0 10% 60px 10%;
    height: 70vh;
    overflow: hidden;
    overflow-y: scroll;

`
const ChatRight = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end; 
`
const TextChatRecieve = styled.p`
    padding: 10px 20px;
    background-color: whitesmoke;
    border-radius: 5px; 
    margin-right: 15px;
`
const TextChatSent = styled.p`
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

const ChatLeft = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    
`

const ChatHistoryForm = () => {

    const socket = useContext(SocketContext);

    const {id} = useParams()

    const {query} = useParams()

    const history = useHistory()

    let user = JSON.parse(localStorage.getItem('user'))

    const [messages,setMessages] = useState([])

    useEffect(()=>{
        if(user!==null){
            axios.post('http://localhost:8080/auth/chat/searchmessages',{
            id:user.id,
            id2:id,
            query:query
            },{headers:{'Authorization':`Bearer ${user.token}`}
            }).then((response)=>{
                setMessages(response.data.data)
            })
        }else{
            history.push('/login')
        }
    },[query])

    socket.on('sent_message',()=>{
        axios.post('http://localhost:8080/auth/chat/searchmessages',{
            id:user.id,
            id2:id,
            query:query
        },{headers:{'Authorization':`Bearer ${user.token}`}
        }).then((response)=>{
            setMessages(response.data.data)
        })
    })

    return (
        <>
            <Container>
                <ChatContainer>
                    {messages.length>1 ? (
                        messages.map((message)=>{
                            console.log(message)
                            let dat = message.sendtime.split(' ')
                            let dat2 = dat[1].split(':')
                            let time = dat2[0] + ':' + dat2[1]
                            if(message.user_id1===user.id){
                                return <ChatRight><Timestamp>{dat[0]} / {time}</Timestamp><TextChatSent>{message.message}</TextChatSent></ChatRight>
                            }else{
                                return <ChatLeft><TextChatRecieve>{message.message}</TextChatRecieve><Timestamp>{dat[0]} / {time} </Timestamp></ChatLeft>
                            }
                        })
                    ):(<>Not Found</>)}
                </ChatContainer>
                
            </Container>
            
        </>
    )
}

export default ChatHistoryForm
