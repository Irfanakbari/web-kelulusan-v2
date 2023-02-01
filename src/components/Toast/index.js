const ToastService = (type,message,toast) => {
    return toast({
        title: message,
        status:type,
        position: 'top-right',
        isClosable: true,
    })
}

export default ToastService