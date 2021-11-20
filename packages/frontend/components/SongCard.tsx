import { Badge, Box, List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'
import { MotionBox } from '../pages/Write'
interface Props {
  title: string
  text: string[]
  date: string
  body: string[]
  etherscan: string
}

const hoverAnimation = {
  onHover: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}

const WritingCard = (props: Props) => {
  const { title, text, date, body, etherscan } = props

  return (
    <MotionBox
      variants={hoverAnimation}
      whileHover="onHover"
      as={'a'}
      href={'https://rinkeby.etherscan.io/tx/' + etherscan}
      target={'_blank'}
      style={{
        cursor: 'pointer',
      }}
      boxShadow={
        'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;'
      }
      maxW={'xs'}
      overflow="hidden"
      height={400}
      borderRadius={'3xl'}
    >
      <Box p="6" height={400} border={'1px solid blue'}>
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
        <Box border={'1px solid orange'}>
          <Box as="span" color="gray.600" fontSize="sm">
            <Text color={'black'}>{date}</Text>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  )
}

export default WritingCard
