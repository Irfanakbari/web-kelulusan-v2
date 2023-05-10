import {
    Box, Button, Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    ScaleFade,
    Text, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Head from "next/head";

const LoginAdmin = ()=> {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const toast = useToast()


    const handleLogin = async (e)=> {
        e.preventDefault()
        setIsLoading(true)
       try {
           const res = await axios.post('/api/auth/login',{
               username : e.target.username.value,
               password : e.target.password.value
           },{
               headers: {
                   'Content-Type': 'application/json'
               }
           })
           const data = await res.data
           if(data.status === 200) {
               await router.push('/admin/dashboard')
           } else {
               throw new Error('Login Gagal')
           }
       } catch(err) {
           toast({
               title: err.message,
               status:'error',
               position: 'top-right',
               isClosable: true,
           })
       } finally {
           setIsLoading(false)
       }
    }
    return (
        <>
            <Head>
                <title>Login Admin</title>
            </Head>
            <ScaleFade initialScale={0.5} in={true}>
                <Box p={6} bgColor='rgba(0,0,0,0.3)' w={'full'} maxW={['full',700,700]} backdropBlur={"md"}>
                    <Center>
                        <Heading color={'white'} fontWeight={'900'} fontFamily={'Lato'} letterSpacing={1} mt={0} mb={8} fontSize={['1rem','1.8rem','2.2rem']}>Login Admin</Heading>
                    </Center>
                    <Text color={'#999'} fontFamily={'Lato'} mb={'30px'}>Masukkan Username dan Password.</Text>
                    <form onSubmit={handleLogin}>
                        <FormControl as='auth' isRequired={true}>
                            <FormLabel fontFamily={'Lato'} fontWeight={'900'} mb={2} fontSize={'0.9rem'} color={'#88ccf0'}>Username</FormLabel>
                            <Input name={'username'} color={'white'} focusBorderColor={'#999'} size='lg' border={'none'} borderRadius={'5px'} bg={'rgba(250,250,250,0.2)'} fontSize={['0.8rem','1rem','1.2rem']} fontWeight={'700'} type='text' py={'18px'} px={'18px'} placeholder={'Username'} />
                            <FormLabel fontFamily={'Lato'} fontWeight={'900'} mb={2} mt={5} fontSize={'0.9rem'} color={'#88ccf0'}>Password</FormLabel>
                            <Input id={'pass'} name={'password'} color={'white'} focusBorderColor={'#999'} size='lg' border={'none'} borderRadius={'5px'} bg={'rgba(250,250,250,0.2)'} fontSize={['0.8rem','1rem','1.2rem']} fontWeight={'700'} type='password' py={'18px'} px={'18px'} placeholder={'Password'} />
                            <Center>
                                <Button
                                    mt={8}
                                    px={10}
                                    isLoading={isLoading}
                                    loadingText='Loading'
                                    colorScheme='green'
                                    type="submit"
                                    variant='solid'
                                    spinnerPlacement='start'
                                    borderRadius={5}
                                >
                                    Login
                                </Button>
                            </Center>
                        </FormControl>
                    </form>
                </Box>
            </ScaleFade>
        </>
    )
}
export default LoginAdmin