import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";


const BodyLulus = ({data})=>{
    const [isLoading, setLoading] = useState(false)
   async function handlerSKL() {
        setLoading(true)
       try {
           const response = await axios.get('/api/student/skl',{
               withCredentials : true,
               responseType: 'blob',
           })
           const blob = new Blob([response.data], { type: 'vnd.openxmlformats-officedocument.wordprocessingml.document' });
           const url = window.URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.style.display = 'none';
           a.href = url;
           a.download = `skl-${data.nisn}.docx`
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
                    <Text color={'#88ccf0'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'0.9rem'}>Kelas / Jurusan</Text>
                    <Text color={'#fff'} fontFamily={'Lato'} fontWeight={'900'} mb={1} fontSize={'1.1rem'}>{data.kelas ?? '-'} / {data.jurusan ?? '-'}</Text>
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
                    <Text color={'#2d2d2d'} fontFamily={'Lato'} fontWeight={'700'} fontSize={'1.2rem'}>Silahkan Download SKL</Text>
                    <Text color={'#2d2d2d'} fontFamily={'Lato'} fontWeight={'300'} mb={2} fontSize={'0.9rem'}>SKL dapat di download pada link berikut atau datang ke sekolah:</Text>
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