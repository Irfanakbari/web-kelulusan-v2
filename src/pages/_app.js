import '@/styles/globals.css'
import "@fontsource/lato/900.css"; // Defaults to weight 400.
import "@fontsource/lato/300.css"
import "@fontsource/lato/400.css"
import "@fontsource/lato/700.css"
import "@fontsource/lato/"
import {ChakraProvider, Flex, useDisclosure} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import DrawerAdmin from "@/components/Drawer";
import {useState} from "react";

export default function App({ Component, pageProps,router }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement] = useState('left')
    const [username,setUsername] = useState('null')

    if (router.pathname.startsWith('/admin/') && !router.pathname.startsWith('/admin/login') ) {
        return (
            <ChakraProvider>
                <Navbar onClick={onOpen}/>
                <DrawerAdmin onClose={onClose} placement={placement} isOpen={isOpen} username={username}/>
                <Component setUsername={setUsername} {...pageProps}></Component>
            </ChakraProvider>
        )
    }
  return (
      <ChakraProvider>
          <Flex p={2} minH={'100vh'} alignItems='center' justifyContent={'center'} backgroundImage="url('/img/background.jpg')" bgRepeat={'no-repeat'} bgPosition="center" bgSize={'cover'}>
            <Component {...pageProps} />
          </Flex>
      </ChakraProvider>
  )
}
