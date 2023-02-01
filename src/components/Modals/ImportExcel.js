import {
    Button,
    FormControl,
    FormLabel,
    Input, Link, Modal,
    ModalBody,
    ModalCloseButton, ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay, useDisclosure, useToast
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {DownloadIcon} from "@chakra-ui/icons";
import axios from "axios";

const ImportExcelModal = ({onUpdate}) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const initialRef = useRef(null)
    const toast = useToast()

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/admin/students/excel', formData,{
                withCredentials:true,
            })
            if (!res.status === 200) {
                throw new Error('Failed to upload file');
            }
            await onUpdate()
            toast({
                title: "Import Sukses",
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
        }

    };

    return (
        <>
            <Button leftIcon={<DownloadIcon />} onClick={onOpen} colorScheme='purple' variant='solid'>
                Import Excel
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
                        <ModalHeader>Import Data</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>File Excel</FormLabel>
                                <Input onChange={handleFileChange} name={'excel'} type={'file'} ref={initialRef} placeholder='First name' />
                            </FormControl>
                            <Link mt={5} target={'_blank'} href={'/Format.xlsx'}>Download Template</Link>
                        </ModalBody>
                        <ModalFooter>
                            <Button type={'submit'} colorScheme='blue' mr={3}>
                                Import
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ImportExcelModal