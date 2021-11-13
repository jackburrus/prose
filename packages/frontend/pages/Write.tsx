import { calc, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
import { motion, useAnimation } from 'framer-motion'
interface Props {}
import { Box, BoxProps } from '@chakra-ui/layout'

export const MotionBox = motion<BoxProps>(Box)

const WritePage = (props: Props) => {
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)
  const [submitting, isSubmitting] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (submitting) {
      controls.start('slide')
    }
    if (!submitting) {
      controls.start('noSlide')
    }
  }, [controls, submitting, activeLyrics])

  const inputVariants = {
    noSlide: { y: 0 },
    slide: { y: 50 },
  }

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
            <MotionBox
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, y: 50 }}
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
            </MotionBox>
          ))}
        </Box>

        <MotionBox
          // initial={{ x: 0 }}
          animate={controls}
          variants={inputVariants}
          maxWidth="container.xl"
          bg={'white'}
          // border="1px solid orange"
        >
          <LyricInput isSubmitting={isSubmitting} />
        </MotionBox>
        {/* <motion.div animate={{ y: 400 }}>
          <LyricInput />
        </motion.div> */}
      </Box>
    </Layout>
  )
}
export default WritePage
