import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100vw;
    height: 80px;
    background-color: #4C515C;
`
const Title = styled.h4`
    color: white;
    padding-top: 25px;
    margin-left: 50px;

`
const NavVideo = () => {
    return (
        <>
            <Container>
                <Title>Video Call</Title>
            </Container>
            
        </>
    )
}

export default NavVideo
