import React,{useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {SocketContext} from '../context/socket';
import { Button , Dropdown } from 'react-bootstrap'
import Badge from '@mui/material/Badge';
import Swal from 'sweetalert2'
import { SocketContextCall } from '../ContextCall'

const Container = styled.div`
    width: 22vw;
    background-color: #2F343D;
    height: 100vh;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 50px;

`
const Content = styled.div`
    height: 100%;
`
const Profile = styled.div`
    height: 90px;
    width: 90px;
    margin-bottom: 20px;
    display: flex;
    
`
const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    
    
`

const Request = styled.div``
const Title = styled.h4`
    color: lightgray;
    font-size: 20px;
    margin-bottom: 30px;
    transition: 0.5s;
    :hover {
        color: white;
    }

`
const Name = styled.h4`
    color: lightgray;
    font-size: 20px;
    transition: 0.5s;
    margin-top: 30px;

`
const Friend = styled.div`
    height: 60px;
    width: 60px;
    display: flex;
`

const FriendImage = styled.img`
    width: 45%;
    height: 62px;
    border-radius: 100%;
    object-fit: cover;
`
const NameFriend = styled.span`
    color: lightgray;
    font-size: 18px;
    margin-left: 18px;
    margin-top: 20px;
    width: 100px;
    
`

const FriendContainer = styled.div`
    border-bottom: 1px solid #3D4450;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

`
const ContaiAllFriend = styled.div`
    overflow: hidden;
    overflow-y: scroll;
    height: 60%;
`
const Sidebar2 = () => {
    
    const socket = useContext(SocketContext);

    const {setName} = useContext(SocketContextCall)

    const [friends, setFriends] = useState([])
    const [badgeRequest, setBadgeRequest] = useState('')
    const id = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(id!==null){
            setName(id.username)
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`).then((res) => {
                setFriends(res.data)
                axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                    setBadgeRequest(res.data.length) 
                })
            })
            
        }
    }, [])

    

    socket.on('new_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                setBadgeRequest(res.data.length)
            })
        }
    })

    socket.on('delete_friend',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`).then((res) => {
                setFriends(res.data)
            })
        }
    })

    
    
    socket.on('accept_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`).then((res) => {
                setFriends(res.data)
                axios.get(`http://localhost:8080/auth/friend/listrequest/${id.id}`).then((res) => {
                    setBadgeRequest(res.data.length)
                })
            })
        }
    })
    
    function deleteFriend(idd) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/auth/friend/delete/${id.id}/${idd}`).then((res) => {
                    socket.emit('delete_friend')
                    Swal.fire(
                        'Deleted!',
                        'Friend has been deleted.',
                        'success'
                    )
                })
            }
          })
    }

    const onClearChat = (idd) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/auth/chat/clearchat/${id.id}/${idd}`).then((res) => {
                    socket.emit('clear_chat')
                    Swal.fire(
                        'Deleted!',
                        'Chat has been cleared.',
                        'success'
                    )
                })
                socket.emit('clear_message')
            }
          })
    }

    return (
        <>
            <Container>
                <Content>
                <Profile>
                    {id !== null ? (
                    <ProfileImage src={`//localhost:8080/${id.image}`} ></ProfileImage>
                    ):
                    (
                        <ProfileImage src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg" ></ProfileImage>
                    )}     {id!==null ? (<Name>{id.username}</Name>):(<></>)}
                </Profile>
                
                <Request>
                    <Link to="/friendRequest" style={{textDecoration: "none"}}>
                    <Title>Friend Request
                        {badgeRequest === null || badgeRequest === undefined || badgeRequest === 0 ? (
                            <Badge badgeContent={0} showZero color="primary" style={{marginLeft: 20}}></Badge>
                        ):(
                            <Badge badgeContent={badgeRequest} showZero color="primary" style={{marginLeft: 20}}></Badge>
                        )}
                    </Title>
                    </Link>
                    {/* <Link to="/friendRequest" style={{textDecoration: "none"}}><Title>Friend Request<Badge badgeContent={requestNum} showZero color="primary" style={{marginLeft: 20}}></Badge></Title></Link> */}
                    
                </Request>
                    <Link to="/home" style={{textDecoration: "none"}}><Title>My Friends</Title></Link>
                <ContaiAllFriend>
                {friends.length>0 ? (
                    friends.map((user)=>(
                        <FriendContainer>
                            <Friend>
                                <Link to={`/chat/${user.id}`} style={{textDecoration:'none'}}>
                                <div style={{display:'flex'}}>
                                    <FriendImage src={`//localhost:8080/${user.imageURL}`} />
                                    <NameFriend>{user.username}</NameFriend>
                                    <Badge badgeContent={0} color="primary" style={{paddingLeft: 20, marginTop: 35}}></Badge>
                                </div>
                                </Link> </Friend>
                                <Dropdown className="d-inline" style={{ display: "flex" ,marginTop:'13px'}}>
                                    <Dropdown.Toggle id="dropdown-basic" variant="">
                                        <Button variant="secondary" style={{borderRadius:'100%',width:'30px',height:'30px'}} id="dropdown-autoclose-true">
                                            <svg style={{marginLeft:'-5px',margintTop:'0px'}} xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 30 30">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            </svg>
                                        </Button>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {onClearChat(user.id)}}>Clear Chat</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {deleteFriend(user.id)}}>Delete Friend</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            
                        </FriendContainer>
                    ))
                ):(
                    <p></p>
                )}               
                </ContaiAllFriend> 
                </Content>
            </Container>
            
        </>
    )
}

export default Sidebar2
