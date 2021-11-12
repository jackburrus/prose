import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'

interface Props {}

const WritePage = (props: Props) => {
  return (
    <Layout>
      <Box maxWidth="container.xl" h="100vh" bg={'white'}>
        <LyricInput />
      </Box>
    </Layout>
  )
}
export default WritePage
