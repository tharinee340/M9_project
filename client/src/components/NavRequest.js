import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 78vw;
    height: 80px;
    background-color: #4C515C;
    display: flex;
    padding: 20px 30px 0 30px;
`
const Title = styled.h4`
    color: white;
    padding-top: 5px;
    padding-right: 30px;

`
const NavRequest = () => {
    return (
        <>
            <Container>
                <Title>Friend Request</Title>
            </Container>
        </>
    )
}

export default NavRequest
