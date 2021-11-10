import React from 'react'
import Sidebar from '../components/Sidebar'
import NavRequest from '../components/NavRequest'
import RequestForm from '../components/RequestForm'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100%;
`
const Content = styled.div`
    
`

const Request = () => {
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
