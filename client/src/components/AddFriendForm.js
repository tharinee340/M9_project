import React, {useState,useContext} from 'react'
import styled from 'styled-components'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import {SocketContext} from '../context/socket';

const Container = styled.div`
    width: 90%;
    height: 90vh;
    padding: 3%;
    margin-left: 4%;
    
`

const Content = styled.div`
    height: 60vh;
    overflow: hidden;
    overflow-y: scroll;
`
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 60px;
`

const FriendContainer = styled.div`
    border-bottom: 1px solid #7A7A7F;
    padding: 20px 0;
    margin-left: 135px;
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    width: 70%;


`
const Friend = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    

`
const FriendImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`
const Name = styled.h5`
    color: lightgrey;
    margin-top: 25px;
    margin-left: 20px;
`

const AddFriendForm = () => {
    const socket = useContext(SocketContext)
    //ตั้งให้ถ้า useState (ตัวที่เก็บชื่อ) == 0 แสดง not found
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const history = useHistory()
    const username = JSON.parse(localStorage.getItem('user'))
    if(!username){
        history.push('/')
    }

    const onSearch = () => {
        
        axios.post('http://localhost:8080/auth/friend/search',{
            query:query,
            username: username.username
        }).then((response)=>{
            setResults(response.data.data)
            history.push('/addFriend')
        })
    }

    const id = JSON.parse(localStorage.getItem('user'))

    function sendAdd(id2) {
        axios.post('http://localhost:8080/auth/friend/add',{
            id: id.id,
            id2: id2
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            socket.emit('new_request')
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    socket.on('accept_request',()=>{
        if(id!==null){
            axios.post('http://localhost:8080/auth/friend/search',{
                query:query
            }).then((response)=>{
                setResults(response.data.data)
            })
        }
    })

    return (
        <>
            <Container>
                <InputContainer>
                    <InputGroup className="mb-3" style={{width: "70%"}}>
                        <FormControl 
                            style={{height: 45}}
                            placeholder="Enter Username"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button variant="primary" style={{width: 100, height: 45}} onClick={onSearch}>Search</Button>
                    </InputGroup>
                </InputContainer>
                
                <Content>
                {results.length>0 ? (
                    results.map((result)=>(
                        <FriendContainer>
                            <Friend>
                                <FriendImage src={`//localhost:8080/${result.imageURL}`} />
                                <Name>{result.username}</Name>
                            </Friend>
                            <Button variant="primary" 
                                style={{width: 100,  marginTop: 30, height:45}}
                                onClick={()=> sendAdd(result.id)}
                            >Add</Button>
                        </FriendContainer>
                    ))
                ):(
                    <p>No Results</p>
                )
                }
                </Content>
               
            </Container>
            
        </>
    )
}

export default AddFriendForm
