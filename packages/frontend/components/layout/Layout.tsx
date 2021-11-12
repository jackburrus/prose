import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useEthers, useNotifications } from '@usedapp/core'
import blockies from 'blockies-ts'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getErrorMessage } from '../../lib/utils'
import { Balance } from '../Balance'
import { ConnectWallet } from '../ConnectWallet'
import { Head, MetaProps } from './Head'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

/**
 * Constants & Helpers
 */

// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

/**
 * Prop Types
 */
interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

/**
 * Component
 */
export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { account, deactivate, error } = useEthers()
  const { notifications } = useNotifications()
  const router = useRouter()
  let blockieImageSrc
  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account }).toDataURL()
  }

  return (
    <>
      <Head customMeta={customMeta} />
      <header style={{ backgroundColor: 'white', width: '100vw' }}>
        <Container maxWidth="container.xl" width={'100vw'} bg="white">
          <SimpleGrid
            columns={[1, 1, 1, 2]}
            alignItems="center"
            justifyContent="space-between"
            py="8"
          >
            <Flex py={[4, null, null, 0]}>
              <NextLink href="/Write" passHref>
                <Link px="4" py="1">
                  <Text
                    fontSize={'3xl'}
                    fontFamily="sans-serif"
                    letterSpacing={'0.05em'}
                    color={router.pathname === '/Write' ? 'black' : 'grey'}
                  >
                    Write
                  </Text>
                </Link>
              </NextLink>
              <NextLink href="/" passHref>
                <Link px="4" py="1">
                  <Text
                    fontSize={'3xl'}
                    fontFamily="sans-serif"
                    letterSpacing={'0.05em'}
                    color={router.pathname === '/' ? 'black' : 'grey'}
                  >
                    Explore
                  </Text>
                </Link>
              </NextLink>

              <NextLink href="/Holdings" passHref>
                <Link px="4" py="1">
                  <Text
                    fontSize={'3xl'}
                    fontFamily="sans-serif"
                    letterSpacing={'0.05em'}
                    color={router.pathname === '/Holdings' ? 'black' : 'grey'}
                  >
                    Holdings
                  </Text>
                </Link>
              </NextLink>
              <NextLink href="/Leaderboard" passHref>
                <Link px="4" py="1">
                  <Text
                    fontSize={'3xl'}
                    fontFamily="sans-serif"
                    letterSpacing={'0.05em'}
                    color={
                      router.pathname === '/Leaderboard' ? 'black' : 'grey'
                    }
                  >
                    Leaderboard
                  </Text>
                </Link>
              </NextLink>
            </Flex>
            {account ? (
              <Flex
                order={[-1, null, null, 2]}
                alignItems={'center'}
                justifyContent={['flex-start', null, null, 'flex-end']}
              >
                <Balance />
                <Image ml="4" src={blockieImageSrc} alt="blockie" />
                <Menu placement="bottom-end">
                  <MenuButton as={Button} ml="4">
                    <Text color="black">{truncateHash(account)}</Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        deactivate()
                      }}
                    >
                      Disconnect
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <ConnectWallet />
            )}
          </SimpleGrid>
        </Container>
      </header>
      <main
        style={{ backgroundColor: 'white', width: '100vw', display: 'flex' }}
      >
        <Container maxWidth="container.xl" bg="white">
          {error && (
            <Alert status="error" mb="8">
              <AlertIcon />
              <AlertTitle mr={2}>Error:</AlertTitle>
              <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            </Alert>
          )}
          {children}
          {notifications.map((notification) => {
            if (notification.type === 'walletConnected') {
              return null
            }
            return (
              <Alert
                key={notification.id}
                status="success"
                position="fixed"
                bottom="8"
                right="8"
                width="400px"
              >
                <AlertIcon />
                <Box>
                  <AlertTitle>
                    {TRANSACTION_TITLES[notification.type]}
                  </AlertTitle>
                  <AlertDescription overflow="hidden">
                    Transaction Hash:{' '}
                    {truncateHash(notification.transaction.hash, 61)}
                  </AlertDescription>
                </Box>
              </Alert>
            )
          })}
        </Container>
      </main>
    </>
  )
}
