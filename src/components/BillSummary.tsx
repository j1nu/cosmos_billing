import styled from '@emotion/styled'
import React, { useMemo } from 'react'

import { Bill } from '@/types'
import { addComma } from '@/utils/stringUtil'

import AddBillingModal from './AddBillingModal'
import LoadBilling from './LoadBilling'

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: inherit;
  padding: 1rem 0;
`
const Summary = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 1.2rem;
`

const Count = styled.span`
  color: gray;
`

const Sum = styled.span``

const ButtonContainer = styled.div`
  display: flex;
`

export interface Props {
  onLoadBills: (bills: Bill[]) => void
  selectedBills: Bill[]
  onAddBill: (bill: Bill) => void
}

function BillSummary({ onLoadBills, selectedBills, onAddBill }: Props) {
  const sumAmount = useMemo(
    () => selectedBills.reduce((prev, current) => prev + current.usedAmount, 0),
    [selectedBills],
  )

  return (
    <Container>
      <Summary>
        {selectedBills.length > 0 && (
          <>
            <Count>{addComma(selectedBills.length, '건')} 선택</Count>
            <Sum>{addComma(sumAmount)}</Sum>
          </>
        )}
      </Summary>
      <ButtonContainer>
        <AddBillingModal header="이용 내역 추가하기" onAddBill={onAddBill} />
        <LoadBilling onLoadBills={onLoadBills} />
      </ButtonContainer>
    </Container>
  )
}

export default BillSummary
