import { calc, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
import { motion } from 'framer-motion'
interface Props {}
import { Box, BoxProps } from '@chakra-ui/layout'

export const MotionBox = motion<BoxProps>(Box)

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
            <Box
              key="index"
              alignItems="center"
              flexDirection="row"
              display="flex"
              h={100}
              // border="1px solid green"
            >
              <Text
                fontFamily="Raleway, sans-serif"
                fontWeight="500"
                fontSize="4xl"
                color={'#66656D'}
              >
                {lyric}
              </Text>
            </Box>
          ))}
        </Box>

        <MotionBox
          animate={{ y: activeLyrics.length * 1 }}
          maxWidth="container.xl"
          bg={'white'}
          // border="1px solid orange"
        >
          <LyricInput />
        </MotionBox>
      </Box>
    </Layout>
  )
}
export default WritePage
