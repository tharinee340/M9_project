import React , {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import {InputGroup,FormControl, Button } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearch } from '../actions';
import { useParams } from 'react-router';
import axios from 'axios';
import { SocketContextCall } from '../ContextCall';

const Container = styled.div`
    width: 78vw;
    height: 80px;
    background-color: #4C515C;
    display: flex;
    padding: 20px 30px 0 30px;
    /* justify-content: space-between; */
`
const Title = styled.h4`
    color: white;
    padding-top: 5px;
    padding-right: 30px;

`
const Right = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const Btn = styled.div`
    color: lightgray;
    transition: 0.5s;
    margin-left: 40px;
    cursor: pointer;
    :hover {
        color: white;
    }
`
const NavChat = () => {

    const { callUser, callAccepted, callEnded } = useContext(SocketContextCall);
    const {id} = useParams()    


    const dispatch = useDispatch()

    const [query, setQuery] = useState("")
    const [username, setUsername] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:8080/auth/users/get_user/${id}`).then((response)=>{
            setUsername(response.data[0].username)
        })
    },[id])

    const onSearch = () => {
        dispatch(setsearch(query))
    }

    return (
        <>
            <Container>
                <Title>{username}</Title>
                <Right>
                <InputGroup className="mb-3" style={{width: "20%"}}>
                    <FormControl
                        style={{height: 40}}
                        placeholder="Find Chat History"
                        id="search"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button style={{height: 40, backgroundColor: 'white', border: 'none', color: 'gray'}} onClick={onSearch}><SearchIcon/></Button>
                </InputGroup>
                
                <Link to="/call/1" onClick={ () => callUser(id)}><Btn><VideocamIcon style={{fontSize: 40}} /></Btn></Link>
                </Right>
            </Container>
        </>
    )
}

export default NavChat
