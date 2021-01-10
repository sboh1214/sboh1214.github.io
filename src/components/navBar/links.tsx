import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

type LinksProps = {
  width?: string
}

export default function Links({ width }: LinksProps) {
  return (
    <>
      <LinkButton name="about" width={width} />
      <LinkButton name="apps" width={width} />
      <LinkButton name="libs" width={width} />
      <LinkButton name="blog" width={width} />
    </>
  )
}

type LinkButtonProps = {
  name: string
  width?: string
}

function LinkButton({ name, width }: LinkButtonProps) {
  const { t } = useTranslation()

  return (
    <Link to={`/${name}`}>
      <Button variant="ghost" flexDirection="column" alignItems="start" width={width}>
        {t(`nav.${name}`)}
      </Button>
    </Link>
  )
}
