import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

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

const RequestForm = () => {
    return (
        <>
            <Container>
                <Title>You have 3 Requests</Title>
                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
                        <TextContainer>
                            <List>
                                <Name>Cartoon</Name>
                                <Date>10.11.23<Time>11.00</Time></Date>
                            </List>
                        </TextContainer>
                    </Friend>
                    <BtnContainer>
                        <Button variant="primary" style={{width: 100,  marginTop: 30, height:45, marginRight: 20}}>Accept</Button>
                        <Button variant="danger" style={{width: 100,  marginTop: 30, height:45}}>Delete</Button>
                    </BtnContainer>
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
                        <TextContainer>
                            <List>
                                <Name>Cartoon</Name>
                                <Date>10.11.23<Time>11.00</Time></Date>
                            </List>
                        </TextContainer>
                    </Friend>
                    <BtnContainer>
                        <Button variant="primary" style={{width: 100, marginTop: 30, height:45, marginRight: 20}}>Accept</Button>
                        <Button variant="danger" style={{width: 100, marginTop: 30, height:45}}>Delete</Button>
                    </BtnContainer>
                </FriendContainer>

                <FriendContainer>
                    <Friend>
                        <FriendImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
                        <TextContainer>
                            <List>
                                <Name>Cartoon</Name>
                                <Date>10.11.23<Time>11.00</Time></Date>
                            </List>
                        </TextContainer>
                    </Friend>
                    <BtnContainer>
                        <Button variant="primary" style={{width: 100, marginTop: 30, height:45, marginRight: 20}}>Accept</Button>
                        <Button variant="danger" style={{width: 100,  marginTop: 30, height:45}}>Delete</Button>
                    </BtnContainer>
                </FriendContainer>

                
            </Container>
            
        </>
    )
}

export default RequestForm
