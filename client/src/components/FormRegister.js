import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import Swal from 'sweetalert2'

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
    left: 0;
    margin: 50px;
    font-weight: 400;

`
const Logo = styled.h1`
    color: white;
    position: absolute;
    top: 0;
    right: 0;
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


const FormRegister = () => {
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    const [email,setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passwordShow, setPasswordShow] = useState(false)
    const [passwordShowCon, setPasswordShowCon] = useState(false)

    
    function onClick(event){
        event.preventDefault()
        if(password===confirmPass){
                axios.post('http://localhost:5000/auth/users/reg',{
                    username:username,
                    password:password,
                    email:email
                }).then((response)=>{
                    if(response.status===200){
                        history.push('/login')
                        Swal.fire({
                            icon: 'success',
                            title: 'Register Success!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'username In Use!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }                
                })
                //ต้องมาเพิ่มตัว validate 
                setValidated(true);
        };
    }
    
   

    const togglePassword = (event) => {
        setPasswordShow(!passwordShow);
        
    }
    const togglePasswordCon = (event) => {
        setPasswordShowCon(!passwordShowCon);
    }

    return (
        <>
            <Container>
                <Link to="/login"><TitleLink><KeyboardBackspaceIcon sx={{fontSize: 30}}/> SignIn </TitleLink></Link>
                <Logo>LOGO</Logo>
                <FormContainer>
                    <Form noValidate validated={validated}>
                    <Title>Sign Up</Title>
                    <TitleInput>Email</TitleInput>
                    <Form.Control 
                        required placeholder="Email"
                        style={{height: 50}}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please input your username.
                    </Form.Control.Feedback>

                    <TitleInput>Username</TitleInput>
                    <Form.Control 
                        required placeholder="Username"
                        style={{height: 50}}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please input your username.
                    </Form.Control.Feedback>

                    <TitleInput>Password</TitleInput>
                    <InputGroup>
                        <Form.Control 
                            required placeholder="Password" 
                            style={{height: 50}}
                            type= { passwordShow ? "text" : "password" }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={togglePassword} style={{backgroundColor: "white", color: "gray", border: "none"}}>{ passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon/>}</Button>
                    </InputGroup>

                    <Form.Control.Feedback type="invalid">
                        Please input your password.
                    </Form.Control.Feedback>

                    <TitleInput>Confirm Password</TitleInput>
                    <InputGroup>
                        <Form.Control 
                            required placeholder="Confirm Password" 
                            style={{height: 50}}
                            type= { passwordShowCon ? "text" : "password" }
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <Button onClick={togglePasswordCon} style={{backgroundColor: "white", color: "gray", border: "none"}}>{ passwordShowCon ? <VisibilityIcon /> : <VisibilityOffIcon/>}</Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                        Please confirm password.
                    </Form.Control.Feedback>

                    <BtnContainer>
                        <Button style={{width: "100%", height: 50, backgroundColor: "#6497B4", fontSize: 18}} type="submit" onClick={onClick}>Sign Up</Button>
                    </BtnContainer>
                    <Link to="/login"><TextLink>Already have account ? </TextLink></Link>
                    </Form>

                </FormContainer>
            </Container>
        </>
    )
}

export default FormRegister
