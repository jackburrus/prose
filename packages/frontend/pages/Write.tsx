import { Box, calc, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
interface Props {}

const WritePage = (props: Props) => {
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)

  return (
    <Layout>
      <Box border={'1px solid red'} h={'90vh'}>
        <Box
          mr={'100px'}
          ml={'100px'}
          maxWidth="container.xl"
          border={'1px solid red'}
        >
          {activeLyrics.map((lyric, index) => (
            <Text color={'black'} key={index}>
              {lyric}
            </Text>
          ))}
        </Box>
        <Box border={'1px solid green'} maxWidth="container.xl" bg={'white'}>
          <LyricInput />
        </Box>
      </Box>
    </Layout>
  )
}
export default WritePage
