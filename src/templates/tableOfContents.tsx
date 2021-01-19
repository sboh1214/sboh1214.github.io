import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
  html: string
  currentHeaderUrl?: string
}

export default function TableOfContents({ html, currentHeaderUrl }: Props): JSX.Element {
  return (
    <Box
      width="calc((100vw - 1024px) / 2 - 50px)"
      sx={{
        // 윈도우 너비가 1200px보다 작으면 TOC를 노출하지 않는다.
        display: 'none',
        '@media screen and (min-width: 1200px)': {
          // sticky 속성을 사용해서 화면에 계속 머무르도록 한다
          // sticky는 fixed와 static을 결합한 형태라고 생각하면 됨.
          position: `sticky`,
          display: 'block',
          fontSize: '14px',
        },
      }}
    >
      <Box
        dangerouslySetInnerHTML={{ __html: html }}
        sx={{
          // 낮은 depth가 더 안쪽으로 들어가도록 모든 ul에 marginLeft를 부여한다.
          '& ul': {
            marginLeft: '20px',
          },
          // currentHeaderUrl 문자열이 href 속성에 포함된다면 아래 스타일을 부여한다.
          // 현재 스크롤에 해당하는 Header를 하이라이트 하기 위함
          [`& ul > li a[href*="${currentHeaderUrl}"]`]: {
            fontSize: '15px',
            color: '#333333',
            fontWeight: '600',
          },
        }}
      />
    </Box>
  )
}
