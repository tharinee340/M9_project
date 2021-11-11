import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'

const Container = styled.div`
    width: 320px;
    background-color: #2F343D;
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 50px;

`
const Profile = styled.div`
    height: 90px;
    width: 90px;
    margin-bottom: 50px;
    
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
const Friend = styled.div`
    height: 60px;
    width: 60px;
    display: flex;

`
const FriendImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    
    
`
const NameFriend = styled.span`
    color: lightgray;
    font-size: 18px;
    margin-left: 30px;
    margin-top: 20px;
`
const FriendContainer = styled.div`
    border-bottom: 1px solid #3D4450;
    padding: 20px 0;
`


const Sidebar2 = () => {

    const [friends, setFriends] = useState([])
    const id = JSON.parse(localStorage.getItem('user'))
    
    useEffect(() => {
        if(id!==null){
            axios.get(`http://localhost:8080/auth/friend/list/${id.id}`).then((res) => {
                setFriends(res.data)
            })
        }
    }, [])

    return (
        <>
            <Container>
                <Profile>
                    <ProfileImage src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg"></ProfileImage>
                </Profile>
                {<Title>{id.username}</Title>}
                <Request>
                    <Link to="/friendRequest" style={{textDecoration: "none"}}><Title>Friend Request</Title></Link>
                </Request>
                    <Link to="/home" style={{textDecoration: "none"}}><Title>My Friends</Title></Link>

                {friends.length>0 ? (
                    friends.map((user)=>(
                        <FriendContainer>
                            <Link to={`/chat/${user.id}`}><Friend>
                            <FriendImage src="https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg"/>
                            <NameFriend>{user.username}</NameFriend></Friend>  
                            </Link> 
                        </FriendContainer>
                    ))
                ):(
                    <p></p>
                )}                
            </Container>
            
        </>
    )
}

export default Sidebar2
