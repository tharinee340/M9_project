import React , {useContext, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import NavHome from '../components/NavHome'
import styled from 'styled-components'
import ShowFriend from '../components/ShowFriend'
import { useHistory } from 'react-router'
import { SocketContextCall } from '../ContextCall'
import { SocketContext } from '../context/socket'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    height: 90vh;
    width: 72vw;
`
const Content = styled.div`
   
`

const Home = () => {
    const socket = useContext(SocketContext)
    const {setMe,me,setCall} = useContext(SocketContextCall);
    const history = useHistory()
    socket.on('me', (id) => {
        setMe(id)
        socket.emit('new_socket')
    });
    socket.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
        history.push('/login')
    }

    axios.post('http://localhost:8080/auth/users/new_socket',{
        id:user.id,
        socket:me
    }).then((response)=>{
        console.log(response)
        window.location.reload(true)
    }).catch((err)=>{
        throw err
    })

    return (
        <>
            <Container>
                <Sidebar/>
                <Content>
                    <NavHome/>
                    <ShowFriend/>
                </Content>
            </Container>
        </>
    )
}

export default Home
