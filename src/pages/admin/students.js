import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {deleteCookie} from "cookies-next";
import Head from "next/head";
import ImportExcelModal from "@/components/Modals/ImportExcel";
import axios from "axios";
import {ENV} from "@/utility/const";
import ToastService from "@/components/Toast";

const Students = ({data,setUsername,students, pagination}) => {
    const [filteredData, setFilteredData] = useState(students)
    const [value, setValue] = useState(1)
    const [selectedRow, setSelectedRow] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [keyword, setKeyword] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selected, setSelected] = useState()
    const cancelAlertRef = useRef()
    const toast = useToast()


    useEffect(()=>{
        setUsername(data.username)
        setValue(pagination.current)
    }, [setUsername, data.username, pagination])

    const deleteHandler = (nisn)=>{
        setSelected(nisn)
        onOpen()
    }

    const handleEdit = (row) => {
        setSelectedRow(row);
        setIsEditOpen(true);
    };

    const handleChange = (event) => {
        setSelectedRow({ ...selectedRow, [event.target.name]: event.target.value });
    };

    const handleSubmitEdit= async (e) => {
        e.preventDefault()
        await axios.post(`/api/admin/students/${selectedRow.nisn}`, selectedRow,{
            withCredentials:true
        }).then(async () => {
            await updateList()
            ToastService('success',"Siswa Berhasil Diedit",toast)
            setIsEditOpen(false)
        }).catch()
    }

    const searchData = async () => {
        if (keyword === '') {
            setFilteredData(students)
            return
        }
        await axios.get(`/api/admin/students/${keyword}`, {
            withCredentials:true
        }).then(async response => {
            const result = await response.data
            setFilteredData(result.data)
        })
    }
    const updateList = async () => {
        await axios.get(`/api/admin/students`, {
            withCredentials:true
        }).then(async res =>{
            const {data} = await res.data
            setFilteredData(data)
        })
    }

    const deleteNisn = async () => {
        try {
            await axios.delete(`/api/admin/students/${selected}`, {
                withCredentials:true
            }).then(async response => {
                if (response.status === 200) {
                        await updateList()
                        ToastService('success',"Siswa Berhasil Dihapus",toast)
                }
            })
        } catch (e) {
            ToastService('error',e.message,toast)
        } finally {
            onClose()
        }
    }

    const paginate = async (pag) => {
        try {
            const students = await axios.get(`/api/admin/students?page=${pag}`, {
                credentials: 'same-origin',
            });
            const {data} = await students.data
            setFilteredData(data)
            if (pag <= pagination.max){
                setValue(pag)
            }
        } catch (e){
            ToastService('error',e.message,toast)
        }
    }

    return(
        <>
            <Head>
                <title>Daftar Siswa</title>
            </Head>
                <Box bg={'#614BFE'} pb={10}>
                    <Heading fontFamily={'Lato'} p={10} color={'white'}>Students</Heading>
                    <Box bg={'white'} mx={10} p={10} borderRadius={6}>
                        <Flex flexDirection={'row'} justifyContent={'space-between'}>
                            <Stack direction={'column'} spacing={1} mb={5}>
                                <Text color={'gray.500'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'2xl'} mb={8}>Data Siswa</Text>
                                <ImportExcelModal onUpdate={updateList} />
                            </Stack>
                            <Stack>
                                <Input placeholder='Search' onChange={(event) => setKeyword(event.target.value)} w={'auto'}/>
                                <Button onClick={searchData} >Cari</Button>
                            </Stack>
                        </Flex>
                        <TableContainer>
                            <Table variant='simple' colorScheme='teal'>
                                <Thead>
                                    <Tr>
                                        <Th>NISN</Th>
                                        <Th>Nama</Th>
                                        <Th>Kelas</Th>
                                        <Th>Jurusan</Th>
                                        <Th>Status</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        filteredData.map((item,index)=>(
                                                <Tr key={index}>
                                                    <Td>{item.nisn}</Td>                                               <Td>{item.name}</Td>
                                                    <Td>{item.kelas}</Td>
                                                    <Td>{item.jurusan}</Td>
                                                    <Td>{item.status === 1 ? 'Lulus' : 'Tidak Lulus'}</Td>
                                                    <Td>
                                                        <Stack direction={'row'} spacing={5} justifyContent={'center'}>
                                                            <IconButton
                                                                variant='solid'
                                                                colorScheme='red'
                                                                onClick={()=>deleteHandler(item.nisn)}
                                                                aria-label='Delete Siswa'
                                                                icon={<DeleteIcon />}
                                                            />
                                                            <IconButton
                                                                variant='solid'
                                                                colorScheme='blue'
                                                                onClick={()=>handleEdit(item)}
                                                                aria-label='Delete Siswa'
                                                                icon={<EditIcon />}
                                                            />
                                                        </Stack>
                                                    </Td>
                                                </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Modal
                            isOpen={isEditOpen}
                            isCentered
                            onClose={()=>setIsEditOpen(false)}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <form onSubmit={handleSubmitEdit}>
                                    <ModalHeader>Edit</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>NISN</FormLabel>
                                            <Input name={'nisn'} type={'text'} value={selectedRow.nisn} placeholder='Username' isDisabled={true} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Nama</FormLabel>
                                            <Input onChange={handleChange} name={'name'} type={'text'} value={selectedRow.name}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Input onChange={handleChange} name={'email'} type={'text'} value={selectedRow.email}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Kelas</FormLabel>
                                            <Input onChange={handleChange} name={'kelas'} type={'text'} value={selectedRow.kelas}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Jurusan</FormLabel>
                                            <Input onChange={handleChange} name={'jurusan'} type={'text'} value={selectedRow.jurusan}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Status</FormLabel>
                                            <Select name={'status'} value={selectedRow.status} onChange={handleChange} placeholder='Select option'>
                                                <option value={0}>Tidak Lulus</option>
                                                <option value={1}>Lulus</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Kabupaten</FormLabel>
                                            <Input onChange={handleChange} name={'kabupaten'} type={'text'} value={selectedRow.kabupaten} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Provinsi</FormLabel>
                                            <Input onChange={handleChange} name={'provinsi'} type={'text'} value={selectedRow.provinsi} />
                                        </FormControl>
                                        <FormControl>
                                            <Input hidden={true} isDisabled={true} onChange={handleChange} name={'tgl_lahir'} type={'text'} value={selectedRow.tgl_lahir} />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button type={'submit'} colorScheme='blue' mr={3}>
                                            Simpan
                                        </Button>
                                        <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </Modal>
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelAlertRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered
                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent>
                                <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody>
                                    Apakah kamu yakin ingin menghapus data?
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelAlertRef} onClick={onClose}>
                                        Tidak
                                    </Button>
                                    <Button colorScheme='red' ml={3} onClick={deleteNisn}>
                                        Ya
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Box mt={5}>
                            <Button onClick={
                                ()=> paginate(value-1)
                            }>-</Button>
                            <Box as='span' w='200px' mx='24px'>
                                {value}
                            </Box>
                            <Button disabled={(value+1) === parseInt(pagination.max)} onClick={
                                ()=>paginate(value+1)
                            }>+</Button>
                        </Box>
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
        const students = await axios.get(`${ENV.base}/api/admin/students`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });
        const user = await users.data
        const {data, pagination} = await students.data
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
                students : data,
                pagination: pagination
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