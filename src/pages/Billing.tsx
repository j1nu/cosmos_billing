import styled from '@emotion/styled'
import React from 'react'
import { Button } from 'semantic-ui-react'

import BillingTable from '../components/BillingTable'
import Layout from '../components/Layout'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function Billing() {
  return (
    <Layout>
      <ButtonContainer>
        <Button primary size="large">
          이용 내역 불러오기
        </Button>
      </ButtonContainer>

      <BillingTable data={[]} />
    </Layout>
  )
}

export default Billing
