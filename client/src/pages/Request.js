import React from 'react'
import Sidebar from '../components/Sidebar'
import NavRequest from '../components/NavRequest'
import RequestForm from '../components/RequestForm'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`

const Request = () => {
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
                    <NavRequest/>
                    <RequestForm/>
                </Content>
            </Container> 
        </>
    )
}

export default Request
