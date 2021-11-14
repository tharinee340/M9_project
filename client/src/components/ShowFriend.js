import React, { useEffect , useState , useContext } from 'react'
import styled from 'styled-components'
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {SocketContext} from '../context/socket';
import Swal from 'sweetalert2'

const Container = styled.div`
    width: 90%;
    height: 91vh;
    padding: 3%;
    margin-left: 4%;
    /* background-color: lightgrey; */
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
    height: 70px;
    width: 70px;
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
`
const Name = styled.h5`
    color: lightgrey;
    margin-top: 25px;
    margin-left: 20px;
`

const ShowFriend = () => {

    const socket = useContext(SocketContext);

    const [friends, setFriends] = useState([])
    
    const id = JSON.parse(localStorage.getItem('user'))
    
    useEffect(()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`)
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
                axios.delete(`http://localhost:8080/auth/friend/delete/${id.id}/${idd}`)
                .then((res)=>{
                    socket.emit('delete_friend')
                }).catch((err) => {
                    if(err) throw err
                })
        }
        })
        
    }

    socket.on('accept_request',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`)
            .then((response)=>{
                setFriends(response.data)
            })
        }
    })

    socket.on('delete_friend',()=>{
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`)
            .then((response)=>{
                setFriends(response.data)
            })
        }
    })

    return (
        <>
            <Container>
                <Text>Online</Text>

                {friends.length>0 ? (
                    friends.map((friend)=>(
                        <FriendContainer>
                            <Friend>
                                <FriendImage src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg"/>
                                <Name>{friend.username}</Name>
                            </Friend>
                            <Icon>
                                <DeleteIcon style={{fontSize: 35, marginRight: 30}} onClick={() => onDelete(friend.id)}/>
                                <ForumIcon style={{fontSize: 35, marginRight: 30}}/>
                                <VideocamIcon style={{fontSize: 40}}/>
                            </Icon>
                            
                        </FriendContainer>
                    ))
                ):(
                    <p>No Friends</p>
                )}                

            </Container>
            
        </>
    )
}

export default ShowFriend
