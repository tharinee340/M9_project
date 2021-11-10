import React from 'react'
import Sidebar from '../components/Sidebar'
import NavHome from '../components/NavHome'
import styled from 'styled-components'
import ShowFriend from '../components/ShowFriend'
import { io } from 'socket.io-client'
 
const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const Home = () => {

    const socket = io("http://localhost:5001")

    

    socket.emit('load-requests','hi')

    return (
        <>
            <Container>
                <Sidebar/>
                <Content>
                    <NavHome/>
                    <ShowFriend/>
                </Content>
                
                
            </Container>
            
            
        </>
    )
}

export default Home
