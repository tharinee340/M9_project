import React, { useEffect , useState , useContext } from 'react'
import styled from 'styled-components'
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {SocketContext} from '../context/socket';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 3%;
    /* background-color: lightgrey; */
`
const Content = styled.div`
    width: 100%;
    height: 75vh;
    overflow: hidden;
    overflow-y: scroll;
    
`
const Text = styled.h5`
    color: white;
    margin-bottom: 30px;
`
const FriendContainer = styled.div`
    border-bottom: 1px solid #7A7A7F;
    padding: 20px 0;
    margin: 0 40px;
    display: flex;
    justify-content: space-between;
    
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
const Icon = styled.div`
    padding-top: 20px;
    color: lightgrey;
    cursor: pointer;
    &:hover {
        color: white;
    }
`
const Name = styled.h5`
    color: lightgrey;
    margin-top: 25px;
    margin-left: 20px;
`
const AllIcon = styled.div`
    display: flex;
`

const ShowFriend = () => {

    const socket = useContext(SocketContext);

    const [friends, setFriends] = useState([])
    
    const id = JSON.parse(localStorage.getItem('user'))

    const history = useHistory();
    
    useEffect(()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`,{
                headers: {
                    'Authorization':`Bearer ${id.token}`
                }
            })
            .then((response)=>{
                setFriends(response.data)
            })
        }
    },[])

    const onDelete = (idd) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/auth/friend/delete/${id.id}/${idd}`,{
                    headers: {
                        'Authorization':`Bearer ${id.token}`
                    }
                })
                .then((res)=>{
                    socket.emit('delete_friend')
                }).catch((err) => {
                    if(err) throw err
                })
        }
        })
        
    }

    const onChat = (id) => {
        history.push(`/chat/${id}`)
    }

    socket.on('accept_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`,{
                headers: {
                    'Authorization':`Bearer ${id.token}`
                }
            })
            .then((response)=>{
                setFriends(response.data)
            })
        }
    })

    socket.on('delete_friend',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`,{
                headers: {
                    'Authorization':`Bearer ${id.token}`
                }
            })
            .then((response)=>{
                setFriends(response.data)
            })
        }
    })

    return (
        <>
            <Container>
                
                <Text>All friends</Text>
                <Content>
                {friends.length>0 ? (
                    friends.map((friend)=>(
                        <FriendContainer>
                            <Friend>
                                <FriendImage src={`//localhost:8080/${friend.imageURL}`}/>
                                <Name>{friend.username}</Name>
                            </Friend>
                            <AllIcon>
                                <Icon><DeleteIcon style={{fontSize: 35, marginRight: 30 }} onClick={() => onDelete(friend.id)}/></Icon>
                                <Icon><ForumIcon style={{fontSize: 35, marginRight: 30}} onClick={() => onChat(friend.id)} /></Icon>
                                <Icon><VideocamIcon style={{fontSize: 40}}/></Icon>
                            </AllIcon>
                            
                        </FriendContainer>
                    ))
                ):(
                    <p>No Friends</p>
                )}      
                </Content>          

            </Container>
            
        </>
    )
}

export default ShowFriend
