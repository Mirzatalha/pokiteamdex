import React, { useState } from "react";
import axios from 'axios';
// 1. import `ChakraProvider` component
import {
  ChakraProvider,
  InputGroup,
  InputRightAddon,
  Input,
  Stack,
  SimpleGrid,
  Center,
  Heading,
  Box,
  Flex,


  Text,
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
        setsearchResult(false)
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
        backgroundPosition="center"
        minHeight="100vh"
        maxW="70rem" padding={15}  >

        {/* My Team Detail */}
        <Button mb={10} d={'flex'} onClick={() => setmyteamshow(!myteamshow)} >
          Show/Hide My Team!
        </Button>
        <Stack>
          <FormControl isRequired >
            <InputGroup>
              <Input
                value={value}
                size={"lg"}
                onChange={handleChange}

                placeholder={"Type any Pokemon Name. Eg. Pikachu"} color={'white'} />
              <InputRightAddon
                p={0}
                children={<Button size={"lg"} mt={2} onClick={getDataOfPokemon} >Go!</Button>}
              />
            </InputGroup>
          </FormControl>

        </Stack>

        {
          myteamshow === false ? <div>
            {searchResult === true ?
              <>
                {attributes.map((data) => {
                  return (
                    <Center>
                      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" p={2} mt={10} >
                        <Flex direction={'row'} >
                          <Center>
                            <Image src={data.sprites['front_default']} alignSelf='center' />
                          </Center>

                          <Box p="6">
                            <Box
                              mt="1"
                              as="h4"
                              lineHeight="tight">
                              <Text fontWeight="extrabold" >
                                Name is  {data.name}
                              </Text>
                            </Box>

                            <Box mt="3">
                              {Math.round(data.height * 3.9)} Inches Height
                            </Box>

                            <Box d="flex" mt="3" alignItems="center">
                              Fought {data.game_indices.length} Battles
                            </Box>
                            <Box mt="3">
                              Power Type is {data.types[0].type.name}.
                            </Box>
                            <Button
                              mt="3"
                              onClick={addtemMember}
                              bg={"green.700"} color={"white"} >Add to Team
                            </Button>
                          </Box>
                        </Flex>
                      </Box>

                    </Center>
                  )
                })}
              </>

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
                  <>
                    <SimpleGrid columns={[1, 2, 3]} spacing="40px">
                      {myteamResult.map((data, index) => {
                        return (

                          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" p={2} mt={10} >
                            <Flex direction={'row'} >
                              <Center>
                                <Image src={data.sprites['front_default']} alignSelf='center' />
                              </Center>
                              <Box p="6">

                                <Box
                                  mt="1"
                                  as="h4"
                                  lineHeight="tight"
                                >
                                  <Text fontWeight="extrabold" >
                                    Name is  {data.name}
                                  </Text>
                                </Box>
                                <Box mt="3">
                                  {Math.round(data.height * 3.9)} Inches Height
                                </Box>
                                <Box d="flex" mt="3" alignItems="center">
                                  Fought {data.game_indices.length} Battles
                                </Box>
                                <Box mt="3">
                                  Power Type is {data.types[0].type.name}.
                                </Box>
                                <Button
                                  mt={2}
                                  onClick={() => {
                                    myteamResult.splice(index, 1);
                                    setmyteamshow(!myteamshow)
                                  }}
                                  bg={"red.600"} color={"white"} >Remove</Button>
                              </Box>
                            </Flex>
                          </Box>
                        )
                      })}
                    </SimpleGrid>
                  </>
              }
            </div>
        }
      </Container>

    </ChakraProvider >
  )
}