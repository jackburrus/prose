import { Badge, Box, List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'
interface Props {
  title: string
  text: string[]
  date: string
  body: string[]
}

const WritingCard = (props: Props) => {
  const { title, text, date, body } = props
  return (
    <Box
      maxW={'xs'}
      borderWidth="1px"
      borderColor="black"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {/* {property.beds} beds &bull; {property.baths} baths */}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Text fontSize={'2xl'} color={'black'}>
            {title}
          </Text>
        </Box>
        <Box flexWrap={'wrap'} display={'flex'} height={200} width={400}>
          <List
            maxWidth={250}
            // border="1px solid green"
            display="flex"
            flexWrap="wrap"
          >
            {body.map((line, index) => {
              return (
                <ListItem flexWrap="wrap">
                  <Text color={'black'}>{line + '\n'}</Text>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Box>
          {/* {property.formattedPrice} */}
          <Box as="span" color="gray.600" fontSize="sm">
            <Text color={'black'}>{date}</Text>
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {/* {property.reviewCount} reviews */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WritingCard
