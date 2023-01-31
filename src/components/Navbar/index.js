import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Box,
    Button,
    Flex,
    IconButton,
    Text, useDisclosure
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {useRef} from "react";
import {useRouter} from "next/router";

function Navbar({onClick}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/auth/logout')
        await router.push('/admin/login')
    }

    return (
        <Flex px={5} py={2} bg="white" align="center" justify="space-between">
            <IconButton
                aria-label="Open Drawer"
                size="md"
                onClick={onClick}
                variant="ghost"
                colorScheme='gray'
                icon={<HamburgerIcon color="gray.500" />}
            />
            <Box>
                <Text fontFamily={'Lato'} fontWeight={'500'} color={'gray.500'}>Dashboard Admin</Text>
            </Box>
            <Button variant="solid" colorScheme={'blue'} onClick={onOpen}>Logout</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Peringatan</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Apakah Kamu Yakin Ingin Logout dari Sistem?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Tidak
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={handleLogout}>
                            Ya
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Flex>
    );
}
export default Navbar