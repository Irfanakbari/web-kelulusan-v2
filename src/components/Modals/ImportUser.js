import {
    Button,
    FormControl,
    FormLabel,
    Input, Modal,
    ModalBody,
    ModalCloseButton, ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay, useDisclosure, useToast
} from "@chakra-ui/react";
import {useRef} from "react";
import {DownloadIcon} from "@chakra-ui/icons";
import axios from "axios";

const ImportUserModal = ({onUpdate}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const initialRef = useRef(null)
    const toast = useToast()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username : event.target.username.value,
            name : event.target.name.value,
            password : event.target.password.value
        }
        try {
            await axios.post(`/api/admin/users`, data,{
               withCredentials : true,
            })
            toast({
                title: "Sukses",
                status:'success',
                position: 'top-right',
                isClosable: true,
            })

        } catch (error) {
            toast({
                title: error.message,
                status:'error',
                position: 'top-right',
                isClosable: true,
            })
        } finally {
            onClose()
            onUpdate()
        }

    };

    return (
        <>
            <Button mb={5} leftIcon={<DownloadIcon />} onClick={onOpen} colorScheme='purple' variant='solid'>
                Tambah user
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                isCentered
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                        <ModalHeader>Input User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input name={'username'} type={'text'} ref={initialRef} placeholder='Username' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nama</FormLabel>
                                <Input name={'name'} type={'text'} ref={initialRef} placeholder='Nama' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input name={'password'} type={'password'} ref={initialRef} placeholder='Password' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type={'submit'} colorScheme='blue' mr={3}>
                                Simpan
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ImportUserModal