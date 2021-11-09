import React from 'react'
import styled from 'styled-components'
import Sidebar1 from './Sidebar1';
import Sidebar2 from './Sidebar2';

const Container = styled.div`
    height: 100%;
    display: flex;
`
const Sidebar = () => {
    return (
        <>
            <Container>
                <Sidebar1/>
                <Sidebar2/>
            </Container>    
        </>
    )
}

export default Sidebar
