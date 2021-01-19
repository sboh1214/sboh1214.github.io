import { Container, Text } from '@chakra-ui/react'
import React from 'react'
import Layout from '../components/layout'

export default function NotFound(): JSX.Element {
  return (
    <Layout title="nav.notfound">
      <Container centerContent marginTop="20vh">
        <Text textAlign="center" bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="8xl" fontWeight="extrabold">
          404
        </Text>
      </Container>
    </Layout>
  )
}
