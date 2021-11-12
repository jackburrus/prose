import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/layout/Layout'

interface Props {}

const Leaderboard = (props: Props) => {
  return (
    <Layout>
      <Box maxWidth="container.xl" h="100vh" bg={'white'}>
        <Text color="black">Leaderboard</Text>
      </Box>
    </Layout>
  )
}
export default Leaderboard
