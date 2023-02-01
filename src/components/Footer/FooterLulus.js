import {Box, Text} from "@chakra-ui/react";

const FooterLulus = ()=>{
    return(
        <Box p={6}>
            <Text mb={4} color={'#999'} letterSpacing={'1px'} textAlign={'justify'} fontFamily={'Lato'} fontWeight={'300'} fontSize={'0.8rem'}>Status kelulusan Anda ditetapkan setelah Sekolah melakukan verifikasi data akademik (rapor dan/atau nilai ujian). Silakan Anda membaca peraturan tentang kelulusan siswa.
            </Text>
            {/*<Text color={'#999'} letterSpacing={'1px'} textAlign={'justify'} fontFamily={'Lato'} fontWeight={'300'} fontSize={'0.8rem'}>Khusus peserta KIP Kuliah, PTN tujuan juga dapat melakukan verifikasi data ekonomi dan/atau kunjungan ke tempat tinggal Anda sebelum menetapkan status penerimaan Anda.*/}
            {/*</Text>*/}
        </Box>
    )
}

export default FooterLulus