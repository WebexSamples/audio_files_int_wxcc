import React from 'react'
import { Box, Button, Text, VStack } from "@chakra-ui/react"
import { SiWebex } from "react-icons/si";

const oauthApi = 'OAUTH AUTHORIZE URL';
function redirectOauth () {
  location.href = oauthApi;
}

const Home = () => {
  return (
    <Box>
      <VStack justifyContent={"center"}>
        <Button color={"blueviolet"} variant="outline" onClick={redirectOauth}>
          Login <SiWebex />
        </Button>
        <Text textStyle={"md"}>Login with Webex to access audio files for Webex Contact Center</Text>
      </VStack>
    </Box>
  );
}

export default Home