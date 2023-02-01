import {
    Avatar,
    Button, Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex, List, ListIcon, ListItem, Spacer,
    Text,
    WrapItem
} from "@chakra-ui/react";
import {MdOutlineDashboard,MdOutlinePeople,MdOutlinePerson,MdOutlineSettingsInputComposite} from "react-icons/md";
import {useRouter} from "next/router";
import Link from "next/link";

const DrawerAdmin = ({onClose,placement,isOpen,username})=>{
    const router = useRouter();
    const path = router.pathname;
    const items = [
        {
            type: "link",
            label: "Dashboard",
            icon: MdOutlineDashboard,
            path: '/admin/dashboard'
        },
        {
            type: "link",
            label: "Siswa",
            icon: MdOutlinePeople,
            path: '/admin/students'
        },
        {
            type: "link",
            label: "Users",
            icon: MdOutlinePerson,
            path: '/admin/users'
        },
        {
            type: "link",
            label: "Pengaturan",
            icon: MdOutlineSettingsInputComposite,
            path: '/admin/settings'
        }
    ]
    return (
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg={'gray.800'} color={'white'}>
                <DrawerHeader borderBottomWidth='1px'>
                    <Flex flexDirection={'row'} alignItems={'center'}>
                        <WrapItem mr={5}>
                            <Avatar name={username} />
                        </WrapItem>
                        <Text>Hi, {username.toString().toUpperCase() ?? 'Null'}</Text>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    <Flex flexDirection={'column'} h={'full'} p={5}>
                        <List spacing={3}>
                            {
                                items.map((item,index)=>(
                                    <ListItem color={(item.path === path) ? 'gray.600':'white'} key={index} _hover={{ textDecoration: "none" ,color:"gray.600"}} my={5} mb={8}>
                                        <Link href={item.path} scroll={false}>
                                            <Flex flexDirection={'row'} alignItems={'center'}>
                                                <ListIcon as={item.icon} fontSize={22} m={0} boxSize={30}/>
                                                <Text fontFamily={'Lato'} fontWeight={'500'} fontSize={'xl'} ml={8}>{item.label}</Text>
                                            </Flex>
                                        </Link>
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Spacer />
                        <Button variant="solid" colorScheme={'red'}>Logout</Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerAdmin