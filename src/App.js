import './App.css';
import { React, useState } from 'react';
import { Alert, AlertIcon, AlertTitle, Text, Link, AlertDescription, Button, Heading, Container, Box, Flex, Center } from '@chakra-ui/react'
import { useMoralis } from "react-moralis";
import { useHref, useNavigate } from 'react-router';
import { ThemeProvider } from '@emotion/react';

function App() {
  const VARIANT_COLOR = 'teal'
  const Signup = () => {
    const { signup } = useMoralis()
    const [email, setemail] = useState()
    const [password, setPassword] = useState()

    return (
      <Box paddingBlock={"2.5"}  >
        <input placeholder="Email" value={email}  onChange={(e) => setemail(e.currentTarget.value)} paddingBlock={"2"}/>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button onClick={() => signup(email, password, email)} colorScheme='teal'>Sign Up</Button>
      </Box>)
  }
  const Login_1 = () => {
    const { login } = useMoralis()
    const [email, setemail] = useState()
    const [password, setPassword] = useState()

    function forLogin() {
      login(email, password)
    }
    let navigate = useNavigate();

    function forLink() {
      navigate("/Mint")
    }

    return (

      <Box>
        <input placeholder="Email" value={email} onChange={(e) => setemail(e.currentTarget.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button onClick={() => { forLogin(); forLink() }} colorScheme='teal'>Login</Button>
      </Box>
    )

  }
  const { authenticate, isAuthenticated, isAuthenticating, logout, authError } = useMoralis();

  let navigate1 = useNavigate();

  if (isAuthenticated) {
    navigate1("/Mint")
  }
  return (

    <Flex minHeight='100vh' width='full' align='center' justifyContent='center' backgroundColor={"gray.200"}>
      <Container >
        <Heading textColor={'#4F4F51'} >Sign In to Your Account</Heading>
        <Center>
          <Text>
            Or <Link color={`${VARIANT_COLOR}.500`} href="https://metamask.io/" isExternal >make an account on metamask</Link>
          </Text>
        </Center>
        {authError && (<Alert status='error'>
          <AlertIcon />
          <AlertTitle>Authentication has failed</AlertTitle>
          <AlertDescription>{authError.message}</AlertDescription>
        </Alert>
        )}
        <Signup />
        <Login_1 />
        <Center>
          <Button isLoading={isAuthenticating} onClick={() => authenticate()} colorScheme='teal'>Authenticate</Button>
        </Center>
      </Container>
    </Flex>

  )
}
export default App;