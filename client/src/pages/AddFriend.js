import React from 'react'
import Sidebar from '../components/Sidebar'
import NavAdd from '../components/NavAdd'
import AddFriendForm from '../components/AddFriendForm'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const AddFriend = () => {
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
                    <NavAdd/>
                    <AddFriendForm/>
                </Content>
            </Container>    
        </>
    )
}

export default AddFriend
