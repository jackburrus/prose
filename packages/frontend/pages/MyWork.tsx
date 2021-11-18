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

    data.minted_nfts.map(async (nftData) => {
      const urlToFetch = nftData.metadata_uri.replace(
        'ipfs://',
        'https://ipfs.io/ipfs/'
      )
      const data = await fetch(urlToFetch).then((res) => res.json())
      const text = await fetch(data.image).then((res) => res.text())
      setAllMintedNfts((prevState) => [
        ...prevState,
        { ...nftData, Text: text },
      ])
    })

    // setAllMintedNfts(data.minted_nfts)
  }

  useEffect(() => {
    fetchMintedNFTs()
    // if (allMintedNfts.length > 0) {
    //   console.log(allMintedNfts)
    // }
  }, [])

  useEffect(() => {
    console.log(allMintedNfts)
  }, [allMintedNfts])

  return (
    <Layout>
      <Box maxWidth="container.xl" h="100vh" bg={'white'}>
        {allMintedNfts.map((nft, index) => {
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
