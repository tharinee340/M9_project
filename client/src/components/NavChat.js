import React , {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import {InputGroup,FormControl, Button } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Link } from 'react-router-dom'
import { setsearch } from '../actions';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { SocketContextCall } from '../ContextCall';
import Swal from 'sweetalert2';
import { SocketContext } from '../context/socket';

const Container = styled.div`
    width: 72vw;
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
    const socket = useContext(SocketContext)

    const { callUser, callAccepted, callEnded } = useContext(SocketContextCall);

    const {id} = useParams()   
    
    const history = useHistory()

    const [query, setQuery] = useState("")
    const [username, setUsername] = useState('')
    const [usersocket,setUserSocket] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:8080/auth/users/get_user/${id}`).then((response)=>{
            setUsername(response.data[0].username)
            setUserSocket(response.data[0].current_socket)
           
        })
    },[id])

    const onSearch = () => {
        if(query===''){
            Swal.fire({
                title:'No Input',
                icon:'error',
                showCloseButton: true
            })
        }else{
            history.push(`/chathistory/${id}/${query}`)
        }
        
    }

    socket.on('new_socket',()=>{
        axios.get(`http://localhost:8080/auth/users/get_user/${id}`).then((response)=>{
            setUsername(response.data[0].username)
            setUserSocket(response.data[0].current_socket)
           
        })
    })

    const onClick = () => {
        if(usersocket!==null&&usersocket!==undefined&&usersocket!==''){
            history.push(`/call/${id}`)
        }else{
            Swal.fire({
                title:'User Not Online.',
                showCloseButton: true
            })

        }  
        callUser(usersocket)
    }

    return (
        <>
            <Container>
                <Title>{username}</Title>
                <Right>
                <InputGroup className="mb-3" style={{width: "25%"}}>
                    <FormControl
                        style={{height: 40}}
                        placeholder="Find Chat History"
                        id="search"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button style={{height: 40, backgroundColor: 'white', border: 'none', color: 'gray'}} onClick={onSearch}><SearchIcon/></Button>
                </InputGroup>
                
                <Btn onClick={ () => onClick()}><VideocamIcon style={{fontSize: 40}} /></Btn>
                </Right>
            </Container>
        </>
    )
}

export default NavChat
