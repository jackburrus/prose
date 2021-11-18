import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import SongCard from '../components/SongCard'

interface Props {}

const MyWorkPage = (props: Props) => {
  const [allMintedNfts, setAllMintedNfts] = useState([])

  const fetchMintedNFTs = async () => {
    const data = await fetch(
      'https://api.nftport.xyz/v0/me/mints?chain=rinkeby&page_number=1',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NFTPort,
        },
      }
    ).then((res) => res.json())
    console.log(data)
    setAllMintedNfts(data.minted_nfts)
  }

  useEffect(() => {
    fetchMintedNFTs()
    // if (allMintedNfts.length > 0) {
    //   console.log(allMintedNfts)
    // }
  }, [])

  return (
    <Layout>
      <Box maxWidth="container.xl" h="100vh" bg={'white'}>
        {allMintedNfts.length > 0 &&
          allMintedNfts.map((nft, index) => {
            return (
              <Box key={index}>
                <Text color={'black'}>{nft.metadata_uri}</Text>
                <Text color={'black'}>{nft.mint_date}</Text>
              </Box>
            )
          })}
      </Box>
    </Layout>
  )
}
export default MyWorkPage
