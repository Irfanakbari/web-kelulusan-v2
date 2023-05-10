import {
    Box, Button, FormControl, FormLabel,
    Heading, Input, Select, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {deleteCookie} from "cookies-next";
import Head from "next/head";
import axios from "axios";
import {ENV} from "@/utility/const";
import ToastService from "@/components/Toast";

const Students = ({data,setUsername,settings}) => {
    const [selected, setSelected] = useState(settings)
    const [logo, setLogo] = useState(null);
    const [skl, setSkl] = useState(null);
    const toast = useToast()

    useEffect(()=>{
        setUsername(data.username)
        // setSelected(settings)
    }, [setUsername, data.username])

    const handleChange = (event) => {
        setSelected({ ...selected, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('/api/admin/settings', selected, {
            withCredentials: true
        }).then(() =>{
            ToastService('success',"Update Berhasil",toast)
        }).catch(e =>{
            ToastService('error',e.message,toast)
        })
    }

    const handleUploadChange= (event) => {
        setLogo(event.target.files[0])
    }
    const handleUploadChange2= (event) => {
        setSkl(event.target.files[1])
    }
    const handleUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('skl', skl);
        axios.post('/api/admin/settings/upload', formData, {
            withCredentials: true,
            headers:{
                'content-type': 'multipart/form-data'
            }
        }).then(r =>{
            ToastService('success',"Update Berhasil",toast)
        })
    }

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
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired={true} mb={8}>
                            <FormLabel>NPSN</FormLabel>
                            <Input onChange={handleChange} name={'npsn'} type={'text'} value={selected.npsn}/>
                        </FormControl>
                        <FormControl isRequired={true} mb={8}>
                            <FormLabel>Nama Sekolah</FormLabel>
                            <Input onChange={handleChange} name={'nama_sekolah'} type={'text'} value={selected.nama_sekolah}/>
                        </FormControl>
                        <FormControl isRequired={true} mb={8}>
                            <FormLabel>Judul Website</FormLabel>
                            <Input onChange={handleChange} name={'judul_web'} type={'text'} value={selected.judul_web}/>
                        </FormControl>
                        <FormControl isRequired={true} mb={8}>
                            <FormLabel>Text Tombol Login Siswa</FormLabel>
                            <Input onChange={handleChange} name={'button_label'} type={'text'} value={selected.button_label}/>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Status Buka</FormLabel>
                            <Select name={'isOpen'} value={selected.isOpen} onChange={handleChange} placeholder='Select option'>
                                <option value={0}>Tutup</option>
                                <option value={1}>Buka</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired={true} mb={8}>
                            <FormLabel>Kepsek</FormLabel>
                            <Input onChange={handleChange} name={'kepsek'} type={'text'} value={selected.kepsek} />
                        </FormControl>
                        <Button type={'submit'} mb={8} px={10} colorScheme={'green'}>Simpan</Button>
                    </form>
                    <form onSubmit={handleUpload} encType={'multipart/form-data'}>
                        <FormControl mb={8}>
                            <FormLabel>Logo</FormLabel>
                            <Input onChange={handleUploadChange} name={'logo'} type={'file'} />
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel>Template SKL</FormLabel>
                            <Input onChange={handleUploadChange2} name={'skl'} type={'file'} />
                        </FormControl>
                        <Button px={10} colorScheme={'blue'} type={'submit'}>Upload</Button>
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