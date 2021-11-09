import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
const InputForm = styled.input`
    border-radius: 5px;
    border: 1px solid lightgray;
    height: 50px;
    width: 100%;
    padding-left: 15px;
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(validated)
        if (form.checkValidity() === false || password !== confirmPass) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            history.push('/login')
        }
        //ต้องมาเพิ่มตัว validate 
        setValidated(true);
        
    };

    return (
        <>
            <Container>
                <Link to="/login"><TitleLink><KeyboardBackspaceIcon sx={{fontSize: 30}}/> SignIn </TitleLink></Link>
                <Logo>LOGO</Logo>
                <FormContainer>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Title>Sign Up</Title>
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
                    <Form.Control 
                        required placeholder="Password" 
                        style={{height: 50}}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please input your password.
                    </Form.Control.Feedback>

                    <TitleInput>Confirm Password</TitleInput>
                    <Form.Control 
                        required placeholder="Confirm Password" 
                        style={{height: 50}}
                        type="password"
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please confirm password.
                    </Form.Control.Feedback>

                    <BtnContainer>
                        <Button style={{width: "100%", height: 50, backgroundColor: "#6497B4", fontSize: 18}} type="submit">Sign Up</Button>
                    </BtnContainer>
                    <Link to="/login"><TextLink>Already have account ? </TextLink></Link>
                    </Form>

                </FormContainer>
            </Container>
        </>
    )
}

export default FormRegister
