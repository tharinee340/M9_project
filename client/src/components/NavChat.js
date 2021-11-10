import React from 'react'
import styled from 'styled-components'
import {InputGroup,FormControl, Button } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';

const Container = styled.div`
    width: 78vw;
    height: 80px;
    background-color: #4C515C;
    display: flex;
    padding: 20px 30px 0 30px;
    justify-content: space-between;
`
const Title = styled.h4`
    color: white;
    padding-top: 5px;
    padding-right: 30px;

`
const NavChat = () => {
    return (
        <>
            <Container>
                <Title>Cartoon</Title>
                <InputGroup className="mb-3" style={{width: "20%"}}>
                    <FormControl
                        style={{height: 40}}
                        placeholder="Find Chat History"
                    />
                    <Button style={{height: 40, backgroundColor: 'white', border: 'none', color: 'gray'}}><SearchIcon/></Button>
                </InputGroup>
            </Container>
        </>
    )
}

export default NavChat
