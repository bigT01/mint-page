import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import roboPunksNFT from './RoboPunksNFT.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = "0x7e0b1aFD20F96bA4FB3876BC93Ed2F59fc53854d";

const MainMint = ({accounts, setAccounts}) => {
    const [minAmount, setMinAmount] = useState(1);
    const isConnected = Boolean(accounts[0])

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(minAmount), {
                    value: ethers.utils.parseEther((0.02 * minAmount).toString())
                });
                console.log('response',response)
            } catch(err){
                console.log(err)
            }
        }
    }

    const handleDecrement = () => {
        if(minAmount <= 1) return;
        setMinAmount(minAmount - 1)
    }

    const handleIncrement = () => {
        if(minAmount >= 3) return;
        setMinAmount(minAmount + 1)
    }

    return(
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width="520px">
                <div>
                <Text fontSize="48px" textShadow="0 5px #000000">Simple Mint</Text>
                <Text fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily='inherit'
                                padding='15px'
                                marginTop='10px'
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input readOnly fontFamily={'inherit'} width="100px" height="40px" textAlign={'center'} marginTop="10px" type={'number'} value={minAmount}/>
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily='inherit'
                                padding='15px'
                                marginTop='10px'
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily='inherit'
                                padding='15px'
                                marginTop='10px'
                                onClick={handleMint}
                            >
                                Mint Now
                            </Button>
                    </div>
                ): (
                    <p>you should be connected</p>
                )}
            </Box>
        </Flex>
    )
}

export default MainMint