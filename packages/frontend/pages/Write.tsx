import { Box, Text } from '@chakra-ui/react'
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
      <Box maxWidth="container.xl" bg={'white'}>
        <LyricInput />
      </Box>
      <Box border={'1px solid red'} h={'500px'} w={'500px'}>
        {activeLyrics.map((lyric, index) => (
          <Text color={'black'} key={index}>
            {lyric}
          </Text>
        ))}
      </Box>
    </Layout>
  )
}
export default WritePage
