import { Container, Heading, HStack, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import NavBar from './navBar/navBar'
import SEO from './seo'

type Props = {
  title: string
  description?: string
  image?: string
  children: ReactNode
  right?: ReactNode
}

export default function Layout({ title, description, image, children, right }: Props) {
  const { t } = useTranslation()
  const contentWidth = '1024px'

  return (
    <>
      <SEO title={t(title)} description={description} image={image} />
      <div style={{ minHeight: 'calc(100vh - 48px)' }}>
        <NavBar />
        <Container maxW={contentWidth}>
          <Heading marginY="24px">{t(title)}</Heading>
          {children}
        </Container>
      </div>
      <Container position="absolute" top="54px" right={`calc((100vw - ${contentWidth}) / 2 * (-1))`}>
        {right}
      </Container>
      <Container centerContent height="48px">
        <HStack aria-label="Copyright">
          <Text fontSize="md">
            {'Copyright © '}
            <a href="mailto:sboh1214@gmail.com" target="_top">
              Seungbin Oh
            </a>
            {'. Built with '}
            <a href="https://github.com/sungik-choi/gatsby-starter-apple" target="__blank">
              'gatsby-starter-apple'
            </a>
          </Text>
        </HStack>
      </Container>
    </>
  )
}
