import React from 'react'
import Sidebar from '../components/Sidebar'
import NavHome from '../components/NavHome'
import styled from 'styled-components'
import ShowFriend from '../components/ShowFriend'
import { useHistory } from 'react-router'
 
const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const Home = () => {
    const history = useHistory()

    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        history.push('/login')
    }
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
