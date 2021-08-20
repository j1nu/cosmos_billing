import styled from '@emotion/styled'
import React, { ReactNode } from 'react'

const Container = styled.div`
  padding: 3rem 0;
`

const Content = styled.div`
  max-width: 768px;
  margin: 0 auto;
  background-color: white;
  padding: 1.5rem;
`

export interface ComponentProps {
  children: ReactNode
}

function Layout({ children }: ComponentProps) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  )
}

export default Layout
