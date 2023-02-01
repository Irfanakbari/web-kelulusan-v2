import {
    Box, FormControl, FormLabel,
    Heading, Input, Select, useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {deleteCookie} from "cookies-next";
import Head from "next/head";
import axios from "axios";
import {ENV} from "@/utility/const";

const Students = ({data,setUsername,settings}) => {
    const [selected, setSelected] = useState()
    useToast();
    useEffect(()=>{
        setUsername(data.username)
        setSelected(settings)
    }, [setUsername, data.username, settings])

    const handleChange = (event) => {
        setSelected({ ...selected, [event.target.name]: event.target.value });
    };

    // const updateList = async () => {
    //     await axios.get(`/api/admin/users`, {
    //         withCredentials: true
    //     }).then(async res =>{
    //         const {data} = await res.data
    //         setFilteredData(data)
    //     })
    // }


    return(
        <>
            <Head>
                <title>Daftar User</title>
            </Head>

            <Box bg={'#614BFE'} pb={10} minH={'100vh'}>
                <Heading fontFamily={'Lato'} p={10} color={'white'}>Pengaturan Web</Heading>
                <Box bg={'white'} mx={10} p={10} borderRadius={6}>
                    <form>
                        <FormControl mb={8}>
                            <FormLabel>NPSN</FormLabel>
                            <Input onChange={handleChange} name={'name'} type={'text'} value={settings.npsn}/>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Nama Sekolah</FormLabel>
                            <Input onChange={handleChange} name={'email'} type={'text'} value={settings.nama_sekolah}/>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Judul Website</FormLabel>
                            <Input onChange={handleChange} name={'kelas'} type={'text'} value={settings.judul_web}/>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Text Tombol Login Siswa</FormLabel>
                            <Input onChange={handleChange} name={'jurusan'} type={'text'} value={settings.button_label}/>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Status Buka</FormLabel>
                            <Select name={'status'} value={settings.isOpen} onChange={handleChange} placeholder='Select option'>
                                <option value={0}>Tutup</option>
                                <option value={1}>Buka</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Kepsek</FormLabel>
                            <Input onChange={handleChange} name={'kabupaten'} type={'text'} value={settings.kepsek} />
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export async function getServerSideProps(context) {
    const { req,res } = context
    const { headers } = req
    // fetch data
    try {
        const users = await axios.get(`${ENV.base}/api/user`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });
        const datas = await axios.get(`${ENV.base}/api/admin/settings`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });
        const user = await users.data
        const {data} = await datas.data
        if (user.status === 401) {
            deleteCookie('token-key', { req, res });
            return {
                redirect: {
                    destination: '/admin/login',
                    permanent: false,
                },
            }
        }
        return {
            props: {
                data : user.data,
                settings : data[0]
            },
        }
    } catch(err) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        }
    }
}

export default Students