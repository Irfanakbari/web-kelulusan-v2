import Head from 'next/head'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Image,
    Input, ScaleFade,
    Text, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import ModalErrorAPI from "@/components/Modals/Error";
import {useRouter} from "next/router";
import axios from 'axios'
import {ENV} from "@/utility/const";


export default function Home({data,isClosed}) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const formData = new FormData(event.target);

        const nisn = formData.get("nisn");
        const date = formData.get("date");
        const month = formData.get("month");
        const year = formData.get("year");

        const birth = `${year}-${month}-${date}`

        // Perform submit logic, such as sending data to a server
       try{
           const response = await axios.post('/api/student/login',{
               nisn: nisn,
               date: birth
           }, {
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   nisn: nisn,
                   date: birth
               })
           })
           const data = await response.data
           if (data.status !== 200) throw new Error('Siswa Tidak Ditemukan')
           await router.push('/result')
       } catch (e){
           toast({
               title: e.message,
               status:'error',
               position: 'top-right',
               isClosable: true,
           })
       } finally {
           setIsLoading(false)
       }
    };
    return (
    <>
      <Head>
        <title>{data.nama_sekolah}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        {
            !data || isClosed &&
            <ModalErrorAPI />
        }
          <ScaleFade initialScale={0.5} in={true}>
          <Box p={6} bgColor='rgba(0,0,0,0.3)' w={'full'} maxW={['full',700,700]} backdropBlur={"md"}>
              <Flex flexDirection={'row'} justifyContent={'center'} alignItems={'center'} mb={5}>
                  <Image src={'/img/main-logo.png'} h={['80px','90px',null]} mr={5} alt={'Icon'} />
              </Flex>
              <Heading color={'white'} fontWeight={'900'} fontFamily={'Lato'} letterSpacing={1} mt={0} mb={1} fontSize={['1rem','1.8rem','2.2rem']}>{data.judul_web ?? 'Error'}</Heading>
              <Text color={'#999'} fontFamily={'Lato'} mb={'30px'}>Masukkan NISN dan Tanggal Lahir.</Text>
              <form onSubmit={handleSubmit}>
                  <FormControl>
                      <FormLabel fontFamily={'Lato'} fontWeight={'900'} mb={2} fontSize={'0.9rem'} color={'#88ccf0'}>NISN</FormLabel>
                      <Input name={'nisn'} color={'white'} focusBorderColor={'#999'} size='lg' border={'none'} borderRadius={'5px'} bg={'rgba(250,250,250,0.2)'} fontSize={['0.8rem','1rem','1.2rem']} fontWeight={'700'} type='number' py={'18px'} px={'18px'} placeholder={'Nomor Induk Siswa Nasional'} />
                      <FormHelperText mb={8}>We will never share your NISN.</FormHelperText>
                      <FormLabel fontFamily={'Lato'} fontWeight={'900'} mb={2} fontSize={'0.9rem'} color={'#88ccf0'}>Tanggal Lahir</FormLabel>
                      <Flex flexDirection={'row'} alignItems={'center'} mb={5}>
                          <Input name={'date'} textAlign={'center'} maxW={'110px'} color={'white'} focusBorderColor={'#999'} size='lg' border={'none'} borderRadius={'5px'} bg={'rgba(250,250,250,0.2)'} fontSize={['0.8rem','1rem','1.2rem']} fontWeight={'700'} type='number' py={'18px'} px={'18px'} placeholder={'Tanggal'} />
                          <Text fontSize={'1.5rem'} m={5} fontWeight={'700'} color={'#999'}>/</Text>
                          <Input name={'month'} textAlign={'center'} maxW={'110px'} color={'white'} focusBorderColor={'#999'} size='lg' border={'none'} borderRadius={'5px'} bg={'rgba(250,250,250,0.2)'} fontSize={['0.8rem','1rem','1.2rem']} fontWeight={'700'} type='number' py={'18px'} px={'18px'} placeholder={'Bulan'} />
                          <Text fontSize={'1.5rem'} m={5} fontWeight={'700'} color={'#999'}>/</Text>
                          <Input name={'year'} textAlign={'center'} maxW={'110px'} color={'white'} focusBorderColor={'#999'} size='lg' border={'none'} borderRadius={'5px'} bg={'rgba(250,250,250,0.2)'} fontSize={['0.8rem','1rem','1.2rem']} fontWeight={'700'} type='number' py={'18px'} px={'18px'} placeholder={'Tahun'} />
                      </Flex>
                      <Button
                          mt={6}
                          isLoading={isLoading}
                          loadingText='Loading'
                          colorScheme='blue'
                          type="submit"
                          variant='solid'
                          spinnerPlacement='start'
                          borderRadius={5}
                      >
                          {data.button_label ?? 'Submit'}
                      </Button>
                  </FormControl>
              </form>
          </Box>
          </ScaleFade>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {

    let data;
    // Fetch data from external API
    const res = await axios.get(`${ENV.base}/api/info`)

    if (res.status === 200) {
        data = res.data;
    } else {
        data = null
    }

    // Pass data to the page via props
    return { props: { data: data?.data, isClosed : data?.data.isOpen === 0 } }
}
