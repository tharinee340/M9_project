import React from 'react'
import styled from 'styled-components'
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';

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
    return (
        <>
            <Container>
                <Text>Online</Text>
                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg"/>
                        <Name>Toon</Name>
                    </Friend>
                    <Icon>
                        <ForumIcon style={{fontSize: 35, marginRight: 30}}/>
                        <VideocamIcon style={{fontSize: 40}}/>
                    </Icon>
                    
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg"/>
                        <Name>Toon</Name>
                    </Friend>
                    <Icon>
                        <ForumIcon style={{fontSize: 35, marginRight: 30}}/>
                        <VideocamIcon style={{fontSize: 40}}/>
                    </Icon>
                    
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg"/>
                        <Name>Toon</Name>
                    </Friend>
                    <Icon>
                        <ForumIcon style={{fontSize: 35, marginRight: 30}}/>
                        <VideocamIcon style={{fontSize: 40}}/>
                    </Icon>
                    
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://img.freepik.com/free-photo/playful-hot-african-american-with-afro-hairstyle-pulling-hands-towards-make-selfie-winking-joyfully-smiling-broadly-making-new-profile-pic-social-network_176420-23120.jpg?size=626&ext=jpg"/>
                        <Name>Toon</Name>
                    </Friend>
                    <Icon>
                        <ForumIcon style={{fontSize: 35, marginRight: 30}}/>
                        <VideocamIcon style={{fontSize: 40}}/>
                    </Icon>
                    
                </FriendContainer>

                
                

            </Container>
            
        </>
    )
}

export default ShowFriend
