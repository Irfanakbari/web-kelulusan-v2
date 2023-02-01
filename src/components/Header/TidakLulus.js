import {Box, Flex, Heading, Image, Text} from "@chakra-ui/react";

const HeaderTidakLulus = ()=>{
    return (
        <Flex alignItems='center' justifyContent={'space-between'} p={6} bgGradient={'linear(to-r, #c83b26, #dc4e2e)'} w={'full'} h={'auto'} >
            <Box>
                <Heading color={'white'} fontWeight={'900'} fontFamily={'Lato'} letterSpacing={1} mb={1} fontSize={['1.1rem','1.3rem','1.7rem']}>MOHON MAAF, ANDA DINYATAKAN TIDAK LULUS</Heading>
                <Text color={'#999'} fontSize={['0.8rem','1rem','1.2rem']}>TETAP SEMANGAT DAN JANGAN MENYERAH</Text>
            </Box>
            <Image m={5} src={'/img/main-logo.png'} h={['40px','86px',null]} mr={5} alt={'Icon'} />
        </Flex>
    )
}
export default HeaderTidakLulus