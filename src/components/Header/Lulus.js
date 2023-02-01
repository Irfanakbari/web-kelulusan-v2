import {Flex, Heading, Image} from "@chakra-ui/react";

const HeaderLulus = ()=>{
    return (
        <Flex alignItems='center' justifyContent={'space-between'} p={6} bgGradient={'linear(to-r, #083661, #006CBF)'} w={'full'} h={'auto'} >
            <Heading color={'white'} fontWeight={'900'} fontFamily={'Lato'} letterSpacing={1} fontSize={['1.1rem','1.3rem','1.7rem']}>SELAMAT! ANDA DINYATAKAN LULUS!</Heading>
            <Image src={'/img/main-logo.png'} h={['40px','86px',null]} mr={5} alt={'Icon'} />
        </Flex>
    )
}
export default HeaderLulus