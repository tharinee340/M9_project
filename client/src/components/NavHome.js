import React from 'react'
import styled from 'styled-components'
import { Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Container = styled.div`
    width: 72vw;
    height: 10vh;
    background-color: #4C515C;
    display: flex;
    padding: 20px 30px 0 30px;
`
const Title = styled.h4`
    color: white;
    padding-top: 5px;
    padding-right: 30px;

`
const Text = styled.h5`
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 25px;
    padding-right: 50px;
    color: lightgrey;
    :hover {
        color: white
    }
`
const Text2 = styled.h5`
    position: absolute;
    right: 0;
    top: 0;
    padding-top: 25px;
    margin-right: 200px;
    color: lightgrey;
    :hover {
        color: white
    }
`
const NavHome = () => {
    return (
        <>
        <Container>
            <Title>My Friends</Title>
            <Link to="/addFriend"><Button style={{height: 40}}>Add Friend</Button></Link>
            {/* <Text>All Friends</Text>
            <Text2>Online</Text2> */}

        </Container>
            
        </>
    )
}

export default NavHome
