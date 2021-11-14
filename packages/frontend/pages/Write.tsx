import { calc, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
import { motion, useAnimation } from 'framer-motion'
interface Props {}
import { Box, BoxProps } from '@chakra-ui/layout'
import SongTitleInput from '../components/SongTitle'

export const MotionBox = motion<BoxProps>(Box)

const WritePage = (props: Props) => {
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)
  const [title, setTitle] = useState('')
  const [submitting, isSubmitting] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (submitting) {
      console.log('submitting')
      controls.start('slide')
      // isSubmitting(false)
    }
    if (submitting == false) {
      controls.start('noSlide')
    }
    setTimeout(() => {
      isSubmitting(false)
    }, 200)
  }, [controls, submitting])

  const inputVariants = {
    slide: { y: 50 },
    noSlide: { y: 20 },
  }

  return (
    <Layout>
      <Flex
        direction={'column'}
        mb={'50'}
        // border={'1px solid orange'}
      >
        <Box
          mr={'100px'}
          ml={'100px'}
          maxWidth="container.xl"
          // border={'1px solid red'}
          display={'flex'}
          justifyContent="center"
        >
          <SongTitleInput />
        </Box>
        <Box
          mr={'100px'}
          ml={'100px'}
          maxWidth="container.xl"
          // border={'1px solid red'}
        >
          {activeLyrics.map((lyric, index) => (
            <MotionBox
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
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

        {/* <MotionBox
          // initial={{ x: 0 }}
          animate={submitting ? 'slide' : 'noSlide'}
          // variants={inputVariants}
          maxWidth="container.xl"
          bg={'white'}
          // border="1px solid orange"
        >
          <LyricInput isSubmitting={isSubmitting} />
        </MotionBox> */}
        <motion.div
          variants={inputVariants}
          animate={submitting ? 'slide' : 'noSlide'}
        >
          <LyricInput isSubmitting={isSubmitting} />
        </motion.div>
      </Flex>
    </Layout>
  )
}
export default WritePage
