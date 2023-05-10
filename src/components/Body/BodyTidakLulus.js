import {Box, Flex, Text} from "@chakra-ui/react";

const BodyTidakLulus = ()=> {
    return (
        <Flex flexDirection={['column','column','row']} alignItems={'flex-start'} justifyContent={'space-between'} p={6}>
            <Box w={['100%','100%','50%']} pr={8}>
                <Box mb={8}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Tanggal Lahir</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>18/10/2002</Text>
                </Box>
                <Box mb={8}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Sekolah</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>SMAN 1 PADANG TUALANG</Text>
                </Box>
            </Box>
            <Box w={['100%','100%','50%']} pr={8}>
                <Box mb={8} flexShrink={0}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Kabupaten/Kota</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>Kab.Langkat</Text>
                </Box>
                <Box mb={8} flexShrink={0}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Provinsi</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>Prov.Sumatera Utara</Text>
                </Box>
            </Box>
        </Flex>
    )
}

export default BodyTidakLulus