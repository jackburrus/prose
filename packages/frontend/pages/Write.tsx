import { Button, calc, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout/Layout'
import LyricInput from '../components/LyricInput'
import { useRecoilState } from 'recoil'
import { Lyrics } from '../recoil/atoms/lyrics'
import { motion, useAnimation } from 'framer-motion'
interface Props {}
import { File, NFTStorage } from 'nft.storage'
import { Box, BoxProps } from '@chakra-ui/layout'
import SongTitleInput from '../components/SongTitle'
import { useEthers } from '@usedapp/core'
import { AlbumArt as AlbumArtAddress } from '../artifacts/contracts/contractAddress'
import AlbumArt from '../artifacts/contracts/AlbumArt.sol/AlbumArt.json'
import { AlbumArt as AlbumArtType } from '../types/typechain'
import Lottie from 'react-lottie'
import { ethers } from 'ethers'
export const MotionBox = motion<BoxProps>(Box)
const client = new NFTStorage({ token: process.env.NFTStorage })
import axios from 'axios'
import animationData from '../public/confetti.json'
import { BsFillCheckCircleFill } from 'react-icons/bs'
const WritePage = (props: Props) => {
  const [activeLyrics, setActiveLyrics] = useRecoilState(Lyrics)

  const [title, setTitle] = useState('')
  const [submitting, isSubmitting] = useState(false)
  const [ipfsURL, setIPFSurl] = useState('')
  const controls = useAnimation()
  const [playAnimation, setPlayAnimation] = useState(false)
  const [submittedToIpfs, setSubmittedToIpfs] = useState(false)
  const [submittedToNFTPort, setSubmittedToNFTPort] = useState(false)
  const { account, chainId, library } = useEthers()

  const defaultAnimationOptions = {
    autoplay: true,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  async function fetchData() {
    if (library) {
      const contract = new ethers.Contract(
        AlbumArtAddress,
        AlbumArt.abi,
        library
      ) as AlbumArtType
      try {
        const data = await contract.returnMany()
        console.log(data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  const writeToNFTPort = async () => {
    const ipfsURL = await writeData()
    const data = await fetch('https://api.nftport.xyz/v0/mints/easy/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NFTPort,
      },
      body: JSON.stringify({
        chain: 'rinkeby',
        name: 'Example NFT!!!',
        description: 'This is the example description',
        file_url: ipfsURL,
        mint_to_address: account,
      }),
    }).then((res) => res.json())
    setSubmittedToIpfs(true)
    setSubmittedToNFTPort(true)
    console.log(data)
    setPlayAnimation(true)
    setTimeout(() => {
      setPlayAnimation(false)
    }, 5000)
  }

  const writeData = async () => {
    // Write active lyrics to a txt file
    const data = title + '\n' + activeLyrics.join('\n')
    // write txt file and upload to client
    const file = new File([data], 'lyrics.txt', { type: 'text/plain' })
    const fileHash = await client.store({
      name: title,
      description: 'Some Lyrics',
      image: file,
    })
    setSubmittedToIpfs(true)
    console.log(fileHash.data.image.href)
    setIPFSurl(fileHash.data.image.href)
    setPlayAnimation(true)
    setTimeout(() => {
      setPlayAnimation(false)
    }, 5000)
    return fileHash.data.image.href.replace('ipfs://', 'https://ipfs.io/ipfs/')
  }

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
        position={'relative'}
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
          {title ? (
            <Text
              fontFamily="Raleway, sans-serif"
              fontWeight="600"
              fontSize="5xl"
              color={'#66656D'}
            >
              {title}
            </Text>
          ) : (
            <SongTitleInput setTitle={setTitle} />
          )}
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
          <Box
            // border="1px solid red"
            mt={'5'}
            mr={'100px'}
            ml={'100px'}
            maxWidth="container.xl"
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Button
              // onClick={fetchData}
              onClick={writeData}
              // onClick={handleIPFSSubmission}
              variant="solid"
              colorScheme="blue"
              bg={'rgba(145, 218, 215, 0.4)'}
              border={'1px solid #47c2bc99'}
            >
              Submit to IPFS
            </Button>
            <Button
              ml={10}
              // onClick={fetchData}
              onClick={writeToNFTPort}
              // onClick={handleIPFSSubmission}
              variant="solid"
              colorScheme="blue"
              bg={'rgba(145, 218, 215, 0.4)'}
              border={'1px solid #47c2bc99'}
            >
              Submit to NFT Port
            </Button>
          </Box>
        </motion.div>
        <MotionBox
          mt={50}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {submittedToIpfs && (
            <Box
              // border={'1px solid red'}
              display={'flex'}
              flexDirection="row"
              alignItems="center"
              mr={100}
              ml={100}
            >
              <BsFillCheckCircleFill color={'green'} size={36} />
              <Text
                fontFamily="Raleway, sans-serif"
                fontWeight="600"
                fontSize="3xl"
                color={'#66656D'}
                ml={10}
              >
                {' '}
                Submitted to IPFS!
              </Text>
            </Box>
          )}
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {submittedToNFTPort && (
            <Box
              // border={'1px solid red'}
              display={'flex'}
              flexDirection="row"
              alignItems="center"
              mr={100}
              ml={100}
              mt={10}
            >
              <BsFillCheckCircleFill color={'green'} size={36} />
              <Text
                fontFamily="Raleway, sans-serif"
                fontWeight="600"
                fontSize="3xl"
                color={'#66656D'}
                ml={10}
              >
                {' '}
                Submitted to NFT Port!
              </Text>
            </Box>
          )}
        </MotionBox>
      </Flex>
      {playAnimation && (
        <Box position={'fixed'} bottom={'0%'}>
          <Lottie
            options={defaultAnimationOptions}
            height={'auto'}
            width={'100%'}
          />
        </Box>
      )}
    </Layout>
  )
}
export default WritePage
