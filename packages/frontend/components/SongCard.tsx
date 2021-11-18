import { Badge, Box, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'
interface Props {
  title: string
  text: string[]
  date: number
}

const WritingCard = (props: Props) => {
  const { title, text, date } = props
  return (
    <Box
      maxW={'xs'}
      borderWidth="1px"
      borderColor="black"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box position="relative" display={'flex'} height={200} width={400}>
        {/* <Image layout="fill" src={property.imageUrl} alt={property.imageAlt} /> */}
      </Box>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
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
          <Text color={'black'}>{title}</Text>
        </Box>

        <Box>
          {/* {property.formattedPrice} */}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
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
