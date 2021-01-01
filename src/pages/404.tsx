import React, { useState, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import SEO from '../components/seo'
import Layout from '../layout/layout'
import GlowParticle from '../utils/GlowParticle'

const COLORS = [
  { r: 255, g: 149, b: 0 }, // orange
  { r: 255, g: 45, b: 85 }, // pink
  { r: 175, g: 82, b: 222 }, // purple
  { r: 255, g: 59, b: 48 }, // red
  { r: 255, g: 204, b: 0 }, // yellow
]

export default function NotFound(): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<GlowParticle[]>([])
  const isCreated = useRef<boolean>(false)
  const requestRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const canvasObj = canvasRef.current
    const ctx = canvasObj?.getContext('2d')
    let stageWidth = document.body.clientWidth
    let stageHeight = document.body.clientHeight
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

    const totalParticles = 5
    const maxRadius = Math.max(Math.floor(stageWidth / 3), 600)
    const minRadius = Math.max(Math.floor(stageWidth / 5), 300)

    const createParticles = () => {
      let colorIndex = 0
      setParticles([])

      for (let i = 0; i < totalParticles; i++) {
        const newParticle = new GlowParticle({
          x: Math.random() * stageWidth,
          y: Math.random() * stageHeight,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          rgb: COLORS[colorIndex],
        })

        if (++colorIndex >= COLORS.length) colorIndex = 0

        setParticles((prevParticles) => [...prevParticles, newParticle])
      }
    }

    const render = () => {
      if (ctx) {
        ctx.clearRect(0, 0, stageWidth, stageHeight)
      }

      for (let i = 0; i < totalParticles; i++) {
        const item: GlowParticle = particles[i]
        if (!item) return
        item.animate(ctx, stageWidth, stageHeight)
      }
      requestRef.current = requestAnimationFrame(render)
    }

    const resize = () => {
      stageWidth = document.body.clientWidth
      stageHeight = document.body.clientHeight

      if (canvasObj) {
        canvasObj.width = stageWidth * pixelRatio
        canvasObj.height = stageHeight * pixelRatio
      }
      if (ctx) {
        ctx.scale(pixelRatio, pixelRatio)
        ctx.globalCompositeOperation = 'saturation'
        ctx.clearRect(0, 0, stageWidth, stageHeight)
      }

      isCreated.current = true
      createParticles()
    }

    const init = () => {
      if (!isCreated.current) resize()
      else render()
    }

    init()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current)
      }
    }
  })

  return (
    <Layout>
      <SEO title="Not found" />
      <Container>
        <TitleWrap>
          <Title>404</Title>
          <Divider />
          <Desc>Page not found</Desc>
        </TitleWrap>
        <Canvas ref={canvasRef} />
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 45, 85);
`

const Divider = styled.div`
  width: 100%;
  height: 4px;
  margin: 1rem 0 1.5rem 0;
  background-color: rgba(255, 255, 255, 0.5);
`

const TitleWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
`

const Title = styled.h1`
  color: white;
  font-size: 8rem;
`

const Desc = styled.h2`
  color: white;
  font-size: 2.5rem;
`

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
