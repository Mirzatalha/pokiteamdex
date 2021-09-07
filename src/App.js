import React, { useState } from "react";
import axios from 'axios';
// 1. import `ChakraProvider` component
import {
  ChakraProvider,
  InputGroup,
  InputRightAddon,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Heading,
  Box,
  Tr,
  Th,
  Td,
  TableCaption,
  Button, Image,
  FormControl,
  Container,
} from "@chakra-ui/react"

export default function App() {
  const [value, setValue] = useState("");
  const [attributes, setattributes] = useState([]);
  const [myteamResult, setmyteamResult] = useState([]);
  const [myteamshow, setmyteamshow] = useState(false);
  const [searchResult, setsearchResult] = useState(false);



  const getDataOfPokemon = async () => {
    const tempArray = [];
    try {

      const url = 'https://pokeapi.co/api/v2/pokemon/' + value;
      const result = await axios.get(url);
      tempArray.push(result.data);
      // Setting power type to a separate variable
      setattributes(tempArray);
      setsearchResult(true);
      setmyteamshow(false);

    } catch (e) {
      console.log(e);
      if (e) {
        alert("Enter a valid Name!")
      }
    }
  }

  const addtemMember = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + value;
      const result = await axios.get(url);
      if (myteamResult.length < 6) {
        myteamResult.push(result.data);
      } else {
        alert("team is full!")
      }
    } catch (e) {
    }
  }

  const handleChange = (event) => setValue(event.target.value.toLowerCase())

  return (
    <ChakraProvider >
      <Container
        backgroundImage="url('https://wallpaperaccess.com/full/5689716.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        minHeight="100vh"
        maxW="70rem" padding={20}  >

        {/* My Team Detail */}
        <Button mb={10} onClick={() => setmyteamshow(!myteamshow)} >
          Show/Hide My Team!
        </Button>
        <Stack>
          <FormControl isRequired >
            <InputGroup>
              <Input
                value={value}
                // onTouchEndCapture
                size={"lg"}
                onChange={handleChange}

                placeholder={"Eg. Pikachu"} color={'white'} />
              <InputRightAddon
                p={0}
                children={<Button size={"lg"} mt={2} onClick={getDataOfPokemon} >Go!</Button>}
              />
            </InputGroup>
          </FormControl>

        </Stack>





        {/* Start Displaying Pokemon data */}
        {
          myteamshow === false ? <div>
            {searchResult === true ?

              <Box overflowX >
                <Table variant="striped" backgroundColor={"white"} mt={20}>
                  <TableCaption bg={"white"} >Details of the Pokemon</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Height</Th>
                      <Th>No of Battles</Th>
                      <Th>Attack</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  {attributes.map((data) => {
                    return (
                      <Tbody>
                        <Tr>
                          <Td width={250} >
                            <Image src={data.sprites['front_default']} />
                          </Td>
                          <Td>
                            {data.name}
                          </Td>
                          <Td>
                            {Math.round(data.height * 3.9)} Inches
                          </Td>
                          <Td>
                            {data.game_indices.length}
                          </Td>
                          <Td>
                            {data.types[0].type.name}
                          </Td>
                          <Td>
                            <Button
                              onClick={addtemMember}

                              bg={"green.700"} color={"white"} >Add to Team</Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    )
                  })}
                </Table>
              </Box>
              :
              <Heading color="black" textAlign="center" mt={20} bg="white" p={10} >
                Start Searching!!
              </Heading>
            }
          </div>
            :
            <div>
              {
                myteamResult.length === 0 ? <Heading color="black" textAlign="center" mt={20} bg="white" p={10} >
                  No member on the team
                </Heading> :
                <Box>
                  <Table variant="striped" backgroundColor={"white"} mt={20}>
                    <TableCaption bg={"white"} >My Team</TableCaption>
                    <Thead>
                      <Tr>

                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Height</Th>
                        <Th>No of Battles</Th>
                        <Th>Attack</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>

                    {myteamResult.map((data, index) => {
                      // alert(index);
                      return (
                        <Tbody>
                          <Tr>
                            <Td width={250} >
                              <Image src={data.sprites['front_default']} />
                            </Td>
                            <Td>
                              {data.name}
                            </Td>
                            <Td>
                              {Math.round(data.height * 3.9)} Inches
                            </Td>
                            <Td>
                              {data.game_indices.length}
                            </Td>
                            <Td>
                              {data.types[0].type.name}
                            </Td>
                            <Td>
                              <Button
                                onClick={() => {
                                  myteamResult.splice(index, 1);
                                  setmyteamshow(!myteamshow)
                                }}
                                bg={"red.600"} color={"white"} >Remove from team!</Button>
                            </Td>
                          </Tr>
                        </Tbody>
                      )
                    })}
                  </Table>
                  </Box>
              }

            </div>}
    </Container>

    </ChakraProvider >
  )
}