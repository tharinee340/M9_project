import React from 'react'
import styled from 'styled-components'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

const Container = styled.div`
    width: 90%;
    height: 91vh;
    padding: 3%;
    margin-left: 4%;
    
`
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 60px;
`

const FriendContainer = styled.div`
    border-bottom: 1px solid #7A7A7F;
    padding: 20px 0;
    margin-left: 190px;
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    width: 70%;


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
const Name = styled.h5`
    color: lightgrey;
    margin-top: 25px;
    margin-left: 20px;
`

const AddFriendForm = () => {

    //ตั้งให้ถ้า useState (ตัวที่เก็บชื่อ) == 0 แสดง not found

    return (
        <>
            <Container>
                <InputContainer>
                    <InputGroup className="mb-3" style={{width: "70%"}}>
                        <FormControl 
                            style={{height: 45}}
                            placeholder="Enter Username"
                        />
                        <Button variant="primary" style={{width: 100, height: 45}}>Search</Button>
                    </InputGroup>
                </InputContainer>
                
                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png"/>
                        <Name>Cartoon</Name>
                    </Friend>
                    <Button variant="primary" style={{width: 100, height: 40, marginTop: 30, height:45}}>Add</Button>
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png"/>
                        <Name>Cartoon</Name>
                    </Friend>
                    <Button variant="primary" style={{width: 100, height: 40, marginTop: 30, height:45}}>Add</Button>
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png"/>
                        <Name>Cartoon</Name>
                    </Friend>
                    <Button variant="primary" style={{width: 100, height: 40, marginTop: 30, height:45}}>Add</Button>
                </FriendContainer>
               
            </Container>
            
        </>
    )
}

export default AddFriendForm
