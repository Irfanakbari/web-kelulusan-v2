import {
    AlertDialog,
    AlertDialogBody, AlertDialogCloseButton, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Box, Button,
    Flex,
    Heading, IconButton, Input,
    Stack,
    Table,
    TableContainer, Tbody, Td,
    Text,
    Th,
    Thead,
    Tr, useControllableState, useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {deleteCookie, getCookies} from "cookies-next";
import Head from "next/head";
import ImportExcelModal from "@/components/Modals/ImportExcel";

const Students = ({data,setUsername,students}) => {
    const [filteredData, setFilteredData] = useState(students)
    const [value, setValue] = useControllableState({ defaultValue: 1 })
    const [keyword, setKeyword] = useState()
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

    const searchData = async () => {
        if (keyword === '') {
            setFilteredData(students)
            return
        }
        await fetch(`/api/admin/students/${keyword}`, {
            credentials: 'same-origin',
            headers: {
                cookie: getCookies()
            }
        }).then(async response => {
            const result = await response.json()
            setFilteredData(result.data)
        })
    }
    const updateList = async () => {
        await fetch(`/api/admin/students`, {
            credentials: 'same-origin',
            headers: {
                cookie: getCookies()
            }
        }).then(async res =>{
            const {data} = await res.json()
            setFilteredData(data)
        })
    }

    const deleteNisn = async () => {
        try {
            await fetch(`/api/admin/students/${selected}`, {
                method: 'DELETE',
                headers: {
                    cookie: getCookies()
                }
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
                            <Button onClick={() => setValue(value - 1)}>-</Button>
                            <Box as='span' w='200px' mx='24px'>
                                {value}
                            </Box>
                            <Button onClick={() => setValue(value + 1)}>+</Button>
                        </Box>
                    </Box>
                </Box>
        </>
    )
}

export async function getServerSideProps(context) {
    const base = process.env.BASE_URL
    const { req,res } = context
    const { headers } = req
    // fetch data
    try {
        const users = await fetch(`${base}/api/user`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });
        const students = await fetch(`${base}/api/admin/students`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });
        const user = await users.json()
        const {data} = await students.json()
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
                students : data
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