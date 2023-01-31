import {Box} from "@chakra-ui/react";
import QRCode from "react-qr-code";

const QRLulus = ()=>{
    return (
        <Box>
            <Box w={'120px'} bg={'white'} p={2} alt={'QR Code'} mb={{sm:'10px'}}>
                <QRCode
                    size={256}
                    style={{ height: "auto", width: "100%" }}
                    value={"https://pengumuman-snmptn.ltmpt.ac.id/255b44-p37xdt82y-877887920021018.json"}
                    viewBox={`0 0 256 256`}
                />
            </Box>
        </Box>
    )
}
export default QRLulus