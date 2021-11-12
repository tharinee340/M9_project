import React from 'react'

import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import ChatForm from '../components/ChatForm'
import NavChat from '../components/NavChat'
import { useHistory } from 'react-router'
import { ContextCallProvider } from '../ContextCall'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const Chat = () => {
    const history = useHistory()

    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        history.push('/login')
    }
    return (
        <>
        <ContextCallProvider>
            <Container>
                <Sidebar/>
                <Content>
                    <NavChat/>
                    <ChatForm/>
                </Content>
            </Container>
        </ContextCallProvider>    
        </>
    )
}

export default Chat
