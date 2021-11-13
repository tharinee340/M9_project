import React from 'react'

import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import ChatHistoryForm from '../components/ChatHistoryForm'
import NavChat from '../components/NavChat'
import { useHistory } from 'react-router'
import { ContextCallProvider } from '../ContextCall'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const ChatHistory = () => {
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
                    <ChatHistoryForm/>
                </Content>
            </Container>
        </ContextCallProvider>    
        </>
    )
}

export default ChatHistory
