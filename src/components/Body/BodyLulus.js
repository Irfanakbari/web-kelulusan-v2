import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useState} from "react";


const BodyLulus = ({data,profile})=>{
    const [isLoading, setLoading] = useState(false)
   async function handlerSKL() {
        setLoading(true)
       try {
           const queryString = Object.entries(data)
               .map(([key, value]) => `${key}=${value}`)
               .join("&");
           const response = await fetch('/api/students/skl?key=' + queryString)
           const blob = await response.blob()
           const url = window.URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.style.display = 'none';
           a.href = url;
           a.download = 'sample.docx';
           document.body.appendChild(a);
           a.click();
           window.URL.revokeObjectURL(url);
       } catch (e) {

       } finally {
           setLoading(false)
       }
   }
    return (
        <Flex flexDirection={['column','column','row']} alignItems={'flex-start'} justifyContent={'space-between'} p={6}>
            <Box w={['100%','100%','25%']} pr={8}>
                <Box mb={8}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Tanggal Lahir</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>{data.tgl_lahir ?? '-'}</Text>
                </Box>
                <Box mb={8}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Asal Sekolah</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>{profile.nama_sekolah ?? '-'}</Text>
                </Box>
            </Box>
            <Box w={['100%','100%','25%']} pr={8}>
                <Box mb={8} flexShrink={0}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Kabupaten/Kota</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>{data.kabupaten ?? '-'}</Text>
                </Box>
                <Box mb={8} flexShrink={0}>
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Provinsi</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>{data.provinsi ?? '-'}</Text>
                </Box>
            </Box>
            <Box w={['100%','100%','50%']} bg={'white'} >
                <Box p={5}>
                    <Text color={'#2d2d2d'} fontFamily={'Lato'} fontWeight={'700'} fontSize={'1.2rem'}>Silahkan Lakukan Pendaftaran Ulang</Text>
                    <Text color={'#2d2d2d'} fontFamily={'Lato'} fontWeight={'300'} mb={2} fontSize={'0.9rem'}>Informasi pendaftaran ulang di PTN/Politeknik Negeri dapat dilihat pada link berikut:</Text>
                    <Button
                        onClick={handlerSKL} fontWeight={'900'} fontFamily={'Lato'} color={'#008acf'} fontSize={'1.2rem'}
                        isLoading={isLoading}
                        loadingText='Loading'
                        spinnerPlacement='start'
                        borderRadius={5}
                    >
                        Download SKL
                    </Button>
                </Box>
            </Box>
        </Flex>
    )
}

export default BodyLulus