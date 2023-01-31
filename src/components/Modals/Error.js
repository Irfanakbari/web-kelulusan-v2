import {Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure} from "@chakra-ui/react";

const ModalErrorAPI = ()=>{
    const {onClose } = useDisclosure()

    return (
        <Modal isCentered isOpen={true} onClose={onClose}>
            <ModalOverlay
                bg='blackAlpha.100'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalBody bg={'gray.800'} p={8} textAlign={'center'}>
                    <Text color={'white'} fontFamily={'Lato'} fontSize={'xl'}>API Error, Please Contact Your Administrator</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalErrorAPI