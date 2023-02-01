import {
    AlertDialog,
    AlertDialogBody, AlertDialogCloseButton, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Box, Button,
    Heading, IconButton, Table,
    TableContainer, Tbody, Td,
    Th,
    Thead,
    Tr, useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {DeleteIcon} from "@chakra-ui/icons";
import {deleteCookie} from "cookies-next";
import Head from "next/head";
import ImportUserModal from "@/components/Modals/ImportUser";
import axios from "axios";
import {ENV} from "@/utility/const";

const Students = ({data,setUsername,users}) => {
    const [filteredData, setFilteredData] = useState(users)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selected, setSelected] = useState()
    const cancelAlertRef = useRef()
    const toast = useToast()

    useEffect(()=>{
        setUsername(data.username)
    })

    const deleteHandler = (nisn)=>{
        setSelected(nisn)
        onOpen()
    }

    const updateList = async () => {
        await axios.get(`/api/admin/users`, {
            withCredentials: true
        }).then(async res =>{
            const {data} = await res.data
            setFilteredData(data)
        })
    }

    const deleteNisn = async () => {
        try {
            await axios.delete(`/api/admin/users/${selected}`, {
                withCredentials: true
            }).then(async response => {
                if (response.status === 200) {
                    await updateList()
                    toast({
                        title: "Data Berhasil Dihapus",
                        status:'success',
                        position: 'top-right',
                        isClosable: true,
                    })
                }
            })
        } catch (e) {
            toast({
                title: e.message,
                status:'error',
                position: 'top-right',
                isClosable: true,
            })
        } finally {
            onClose()
        }
    }

    return(
        <>
            <Head>
                <title>Daftar User</title>
            </Head>

            <Box bg={'#614BFE'} pb={10} minH={'100vh'}>
                <Heading fontFamily={'Lato'} p={10} color={'white'}>Users Admin</Heading>
                <Box bg={'white'} mx={10} p={10} borderRadius={6}>
                    <ImportUserModal onUpdate={updateList}/>
                    <TableContainer>
                        <Table variant='simple' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Username</Th>
                                    <Th>Nama</Th>
                                    <Th>Created At</Th>
                                    <Th>Role</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    filteredData.map((item,index)=>(
                                        <Tr key={index}>
                                            <Td>{item.username}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.createdAt}</Td>
                                            <Td>{item.role}</Td>
                                            <Td>
                                                {
                                                    item.role !== 'super' &&
                                                        <IconButton
                                                            variant='solid'
                                                            colorScheme='red'
                                                            onClick={()=>deleteHandler(item.username)}
                                                            aria-label='Delete Siswa'
                                                            icon={<DeleteIcon />}
                                                        />
                                                }
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
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
        const datas = await axios.get(`${ENV.base}/api/admin/users`, {
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
                users : data
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