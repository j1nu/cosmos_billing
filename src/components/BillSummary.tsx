import styled from '@emotion/styled'
import React, { useMemo, useRef } from 'react'
import { Button } from 'semantic-ui-react'
import XLSX from 'xlsx'

import { Bill } from '@/types'
import { readFileAsArrayBuffer } from '@/utils/fileUtil'
import { addComma } from '@/utils/stringUtil'
import { convertKBankBills, KBankBill, sheetToJson } from '@/utils/xlsxUtil'

import AddBillingModal from './AddBillingModal'

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

export interface Props {
  onLoadBills: (bills: Bill[]) => void
  selectedBills: Bill[]
  onAddBill: (bill: Bill) => void
}

function BillSummary({ onLoadBills, selectedBills, onAddBill }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const sumAmount = useMemo(
    () => selectedBills.reduce((prev, current) => prev + current.usedAmount, 0),
    [selectedBills],
  )

  const handleLoadBillClick = () => {
    if (!inputRef.current) {
      return
    }

    inputRef.current.click()
  }

  const handleBillFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files
    if (!files) {
      return
    }

    const file = files[0]

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file)

      const { SheetNames, Sheets } = XLSX.read(arrayBuffer, { type: 'array' })
      const workSheet = Sheets[SheetNames[0]]

      const kBankBills = sheetToJson(workSheet) as KBankBill[]
      const bills = convertKBankBills(kBankBills)

      onLoadBills(bills)
    } catch {
      alert('이용 내역을 불러오는데 실패했습니다.')
    }
  }

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
      <div>
        <Button primary size="small" onClick={handleLoadBillClick}>
          이용 내역 불러오기
        </Button>
        <AddBillingModal header="이용 내역 추가하기" onAddBill={onAddBill} />
        <input
          ref={inputRef}
          type="file"
          accept=".xls, .xlsx"
          hidden
          onChange={handleBillFileChange}
        />
      </div>
    </Container>
  )
}

export default BillSummary
