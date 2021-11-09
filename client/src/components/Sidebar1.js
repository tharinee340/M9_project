import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Link } from 'react-router-dom';

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

const Sidebar1 = () => {
    return (
        <>
            <Container>
                <SidebarList>
                    <Link to="/home"><List><HomeIcon style={{fontSize: 35}}/></List></Link>
                    <Link to="/addFriend"><List><PersonAddAlt1Icon style={{fontSize: 35}}/></List></Link>
                    <Link to="/setting"><List><SettingsIcon style={{fontSize: 35}}/></List></Link>
                </SidebarList>
            </Container>
            
        </>
    )
}

export default Sidebar1
