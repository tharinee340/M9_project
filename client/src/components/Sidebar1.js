import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2'


const Container = styled.div`
    height: 100%;
    width: 95px;
    background-color: #1F2329;
    padding: 0 8px;

`
const SidebarList = styled.ul`
    justify-content: center;
    list-style: none;
    width: 100%;
    padding: 0;

`
const List = styled.li`
    margin-top: 40px;
    padding: 5px 22px;
    color: lightgray;
    transition: 0.5s;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    
    :hover {
        color: white;
        background-color: #6497B4;
    }
`

function onClick(event){
    event.preventDefault()
    Swal.fire({
        title: 'Are you sure to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout now!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Logout!',
            'Your account has been logout.',
            'success',
            localStorage.clear(),
            window.location.reload(true)
          )
        }
      })
}


const Sidebar1 = () => {
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user'))
    if(user == null){
        history.push('/')  
    }

    return (
        <>
            <Container>
                <SidebarList>
                    <Link to="/home"><List><HomeIcon style={{fontSize: 35}}/></List></Link>
                    <Link to="/addFriend"><List><PersonAddAlt1Icon style={{fontSize: 35}}/></List></Link>
                    <List style={{marginBottom: 50}}><LogoutIcon onClick={onClick} style={{fontSize: 35}}/></List>
                </SidebarList>
            </Container>
            
        </>
    )
}

export default Sidebar1
