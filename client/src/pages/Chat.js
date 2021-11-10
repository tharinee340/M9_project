import React from 'react'
import NavChat from '../components/NavChat'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import ChatForm from '../components/ChatForm'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const Chat = () => {
    return (
        <>
            <Container>
                <Sidebar/>
                <Content>
                    <NavChat/>
                    <ChatForm/>
                </Content>
            </Container>
            
        </>
    )
}

export default Chat
