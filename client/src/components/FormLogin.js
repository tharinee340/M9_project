import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, InputGroup  } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    background-color: #2F343D;
    position: relative;
`
const TitleLink = styled.h4`
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    margin: 50px;
    font-weight: 400;

`
const Logo = styled.h1`
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin: 50px;
`

const FormContainer = styled.div`
    width: 28vw;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 50px;
`

const TitleInput = styled.p`
    margin-top: 30px;
    color: whitesmoke;
    font-size: 18px;
`
const BtnContainer = styled.div`
    margin-top: 40px;
`
const TextLink = styled.p`
    margin-top: 30px;
    text-align: center;
    color: whitesmoke;
`

const FormLogin = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false)
    
    const history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            history.push('/home')
        }
    
        setValidated(true);
      };

    const togglePassword = (event) => {
        setPasswordShow(!passwordShow);
    }
    return (
        <>
            
            <Container>
                <Link to="/register"><TitleLink>Signup <ArrowRightAltIcon sx={{fontSize: 30}}/></TitleLink></Link>
                <Logo>LOGO</Logo>
                <FormContainer>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Title>Sign In</Title>
                    <TitleInput>Username</TitleInput>
                    <Form.Control 
                        required
                        placeholder="Username" 
                        style={{height: 40}}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please input your username.
                    </Form.Control.Feedback>

                    <TitleInput>Password</TitleInput>

                    <InputGroup>
                        <Form.Control 
                            required
                            placeholder="Password"
                            type= { passwordShow ? "text" : "password" }
                            style={{height: 40}}
                        />
                        <Button onClick={togglePassword} style={{backgroundColor: "white", color: "gray", border: "none"}}>{ passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon/>}</Button>
                    </InputGroup>

                    <Form.Control.Feedback type="invalid">
                        Please input your password.
                    </Form.Control.Feedback>

                    <BtnContainer>
                        <Button type="submit" style={{width: "100%", height: 40, backgroundColor: "#6497B4", fontSize: 18}}>Sign In</Button>
                    </BtnContainer>
                    <Link to="/register"><TextLink>Don't have account ? </TextLink></Link>
                    </Form >
                </FormContainer>
            </Container>
        </>
    )
}

export default FormLogin
