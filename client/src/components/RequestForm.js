import React, { useEffect , useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'
import ForumIcon from '@mui/icons-material/Forum';

const Container = styled.div`
    width: 90%;
    height: 91vh;
    padding: 3%;
    margin-left: 4%;
`
const Title = styled.h5`
    color: white;
    margin-bottom: 30px;
`
const FriendContainer = styled.div`
    border-bottom: 1px solid #7A7A7F;
    padding: 20px 0;
    margin-left: 60px;
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    width: 90%;
    


`
const Friend = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    

`
const FriendImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`
const TextContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
`
const List = styled.ul`
    list-style: none;
`
const Name = styled.li`
    color: lightgrey;
    font-weight: 500;
    font-size: 20px;
    margin-top: 10px;

`
const Date = styled.li`
    color: lightgrey;
    margin-top: 10px;
    font-size: 14px;

`
const Time = styled.span`
    color: lightgrey;
    margin-left: 15px;
    font-size: 14px;
  
`
const BtnContainer = styled.div``

const socket = io("http://localhost:8081")

const RequestForm = () => {
    const [requests, setRequests] = useState([])
    const id = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(id !== null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                setRequests(res.data)
            })
        }
    },[])

    const onAccept = (idd) => {
        axios.post('http://localhost:8080/auth/friend/confirm',{
            id:id.id,
            id2:idd
        }).then((response)=>{
            socket.emit('accept_request')
            window.location.reload(true)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    const onDelete = (idd) => {
        axios.delete(`http://localhost:8080/auth/friend/delete/${id.id}/${idd}`).then((response)=>{
            socket.emit('delete_event')
            window.location.reload(true)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    socket.on('delete_event',()=>{
        axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                setRequests(res.data)
            })
    })

    socket.on('accept_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                setRequests(res.data)
            })
        }
    })

    socket.on('new_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                setRequests(res.data)
            })
        }
    })

    return (
        <>
            <Container>
                <Title>You have {requests.length} Requests</Title>

                {requests.length>0 ? (
                    requests.map((user)=>(
                        <FriendContainer>
                            <Friend>
                                <FriendImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
                                <TextContainer>
                                    <List>
                                        <Name>{user.username}</Name>
                                        {/* <Date>10.11.23<Time>11.00</Time></Date> */}
                                    </List>
                                </TextContainer>
                            </Friend>
                            <BtnContainer>
                                <Button variant="primary" style={{width: 100,  marginTop: 30, height:45, marginRight: 20}} onClick={()=>{onAccept(user.id)}}>Accept</Button>
                                <Button variant="danger" style={{width: 100,  marginTop: 30, height:45}} onClick={()=>{onDelete(user.id)}}>Delete</Button>
                            </BtnContainer>
                        </FriendContainer>
                    ))
                ):(
                    <p>No friend request</p>
                )}                
                
            </Container>
            
        </>
    )
}

export default RequestForm
