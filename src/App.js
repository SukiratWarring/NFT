import './App.css';
import { React, useState } from 'react';
import { Alert, AlertIcon, AlertTitle, Text, Link, AlertDescription, Button, Heading, Container, Box, Flex, Center, Input } from '@chakra-ui/react'
import { useMoralis } from "react-moralis";
import {  useNavigate } from 'react-router';

function App() {
  const VARIANT_COLOR = 'teal'
  const Signup = () => {
    const { signup } = useMoralis()
    const [email, setemail] = useState()
    const [password, setPassword] = useState()

    return (
      <Box paddingBlock={"2.5"}  >
        <Box paddingBlock={"2"}><Input placeholder="Email" value={email} onChange={(e) => setemail(e.currentTarget.value)} paddingBlock={"2"} borderColor={'black'} />
        </Box><Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} borderColor={'black'} />
        <Center>
          <Box paddingBlock={"1"}>
        <Button onClick={() => signup(email, password, email)} colorScheme='teal' >Sign Up</Button>
        </Box>
        </Center>
      </Box>)
  }
  const Login_1 = () => {
    const { login } = useMoralis()
    const [email, setemail] = useState()
    const [password, setPassword] = useState()

    return (

      <Box>
        <Box paddingBlock={"2"}>
        <Input placeholder="Email" value={email} onChange={(e) => setemail(e.currentTarget.value)} borderColor={'black'} />
        </Box>
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} borderColor={'black'} />
        
        <Center>
          <Box paddingBlock={"2"}>
          <Button onClick={() => { login(email,password) }} colorScheme='teal'>Login</Button>
          </Box>        
        </Center>
      </Box>
    )

  }
  const { authenticate, isAuthenticated, isAuthenticating, logout, authError } = useMoralis();

  let navigate1 = useNavigate();

  if (isAuthenticated) {
    navigate1("/Mint")
  }
  return (

    <Flex minHeight='100vh' width='full' align='center' justifyContent='center' backgroundColor={"gray.300"}>
      <Container >
        <Center>
        <Heading textColor={'#4F4F51'} >Sign In to Your Account</Heading>
        </Center>
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
        
          <Container paddingBlock={"2"}>
          <Center>
          <Button isLoading={isAuthenticating} onClick={() => authenticate()} colorScheme='teal' padding={"2"} >Authenticate</Button>
          </Center>
          </Container>
        
      </Container>
    </Flex>

  )
}
export default App;