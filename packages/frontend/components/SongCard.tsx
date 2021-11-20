import { Badge, Box, List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'
import { MotionBox } from '../pages/Write'
import { useEthers } from '@usedapp/core'

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
  const { account } = useEthers()

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
      <Box p="6" height={400}>
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
          <Box>
            <Text fontSize={'12'} color={'grey'}>
              {date}
            </Text>
          </Box>
        </Box>
        <Box flexWrap={'wrap'} display={'flex'} height={200} width={400}>
          <List
            maxWidth={250}
            // border="1px solid green"
            // display="flex"
            flexWrap="wrap"
            overflow={'scroll'}
          >
            {body.map((line, index) => {
              return (
                <ListItem mt={5} flexWrap="wrap">
                  <Text color={'black'}>{line + '\n'}</Text>
                </ListItem>
              )
            })}
          </List>
        </Box>

        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'flex-end'}
          justifyContent={'space-between'}
        >
          <Image width={50} height={100} src={'/BottomLeft.png'} />
          <Box as="span" color="gray.600" fontSize="sm">
            <Text fontFamily={'Allura'} color={'black'}>
              {truncateHash(account)}
            </Text>
          </Box>
        </Box>
      </Box>
    </MotionBox>
  )
}

export function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

export default WritingCard
