import React, { useEffect , useState , useContext } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import {SocketContext} from '../context/socket';

const Container = styled.div`
    width: 100%;
    height: 90vh;
    padding: 3%;
`
const Title = styled.h5`
    color: white;
    margin-bottom: 30px;
`

const Content = styled.div`
    height: 75vh;
    overflow: hidden;
    overflow-y: scroll;
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

const RequestForm = () => {

    const socket = useContext(SocketContext);

    const [requests, setRequests] = useState([])
    const id = JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        if(id !== null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`,{
                headers:{
                    'Authorization':`Bearer ${id.token}`
                }
            }).then((res) => {
                setRequests(res.data)
            })
        }
    },[])

    const onAccept = (idd) => {
        axios.post('http://localhost:8080/auth/friend/confirm',{
            id:id.id,
            id2:idd
        },{headers:{'Authorization':`Bearer ${id.token}`}
        }).then((response)=>{
            socket.emit('accept_request')
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
        axios.delete(`http://localhost:8080/auth/friend/delete/${id.id}/${idd}`,{
            headers: {
                'Authorization':`Bearer ${id.token}`
            }
        }).then((response)=>{
            socket.emit('delete_event')
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
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`,{
                headers: {
                    'Authorization':`Bearer ${id.token}`
                }
            }).then((res) => {
                setRequests(res.data)
            })
        }
    })

    socket.on('accept_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`,{
                headers: {
                    'Authorization':`Bearer ${id.token}`
                }
            }).then((res) => {
                setRequests(res.data)
            })
        }
    })

    socket.on('new_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`,{
                headers: {
                    'Authorization':`Bearer ${id.token}`
                }
            }).then((res) => {
                setRequests(res.data)
            })
        }
    })

    return (
        <>
            <Container>
                <Title>You have {requests.length} Requests</Title>
            <Content>
                {requests.length>0 ? (
                    requests.map((user)=>(
                        <FriendContainer>
                            <Friend>
                                <FriendImage src={`//localhost:8080/${user.imageURL}`} />
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
                </Content>
            </Container>
            
        </>
    )
}

export default RequestForm
