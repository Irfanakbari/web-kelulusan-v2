import {Box, Text} from "@chakra-ui/react";

const FooterLulus = ()=>{
    return(
        <Box p={6}>
            <Text mb={4} color={'#999'} letterSpacing={'1px'} textAlign={'justify'} fontFamily={'Lato'} fontWeight={'300'} fontSize={'0.8rem'}>Status penerimaan Anda sebagai mahasiswa akan ditetapkan setelah PTN tujuan melakukan verifikasi data akademik (rapor dan/atau portofolio). Silakan Anda membaca peraturan tentang penerimaan mahasiswa baru di laman PTN tujuan.
            </Text>
            <Text color={'#999'} letterSpacing={'1px'} textAlign={'justify'} fontFamily={'Lato'} fontWeight={'300'} fontSize={'0.8rem'}>Khusus peserta KIP Kuliah, PTN tujuan juga dapat melakukan verifikasi data ekonomi dan/atau kunjungan ke tempat tinggal Anda sebelum menetapkan status penerimaan Anda.
            </Text>
        </Box>
    )
}

export default FooterLulus