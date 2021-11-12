import { Box, calc, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
import { motion } from 'framer-motion'
interface Props {}

const WritePage = (props: Props) => {
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)

  // useEffect(() => {
  //   console.log(activeLyrics)
  // }, [activeLyrics])

  return (
    <Layout>
      <Box h={'90vh'}>
        <Box
          mr={'100px'}
          ml={'100px'}
          maxWidth="container.xl"
          // border={'1px solid red'}
        >
          {activeLyrics.map((lyric, index) => (
            <Box border={'1px solid green'} h={100}>
              <Text color={'orange'}>{lyric}</Text>
            </Box>
          ))}
        </Box>
        <motion.div
          animate={{ y: activeLyrics.length * 1 }}
          // transition={{ delay: 1 }}
        >
          <Box maxWidth="container.xl" bg={'white'} border="1px solid orange">
            <LyricInput />
          </Box>
        </motion.div>
      </Box>
    </Layout>
  )
}
export default WritePage
