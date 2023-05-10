import {
    Box,
    Flex,
    ScaleFade,
} from "@chakra-ui/react";

const MainBox = ({children})=>{
    return (
        <Flex p={2} minH={'100vh'} alignItems='center' justifyContent={'center'} backgroundImage="/img/background.jpg" bgRepeat={'no-repeat'} bgPosition="center" bgSize={'cover'}>
            <ScaleFade initialScale={0.5} in={true}>
                <Box p={6} bgColor='rgba(0,0,0,0.3)' w={'full'} maxW={['full',700,700]} backdropBlur={"md"}>
                    {
                        children
                    }
                </Box>
            </ScaleFade>
        </Flex>
    )
}

export default MainBox