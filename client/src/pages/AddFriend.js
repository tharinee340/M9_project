import React from 'react'
import Sidebar from '../components/Sidebar'
import NavAdd from '../components/NavAdd'
import AddFriendForm from '../components/AddFriendForm'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`
const AddFriend = () => {
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
