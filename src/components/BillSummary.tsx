import styled from '@emotion/styled'
import React, { useMemo, useRef, useState } from 'react'
import { Button } from 'semantic-ui-react'
import XLSX from 'xlsx'

import { Bill } from '@/types'
import { readFileAsArrayBuffer } from '@/utils/fileUtil'
import { addComma } from '@/utils/stringUtil'
import { convertKBankBills, KBankBill, sheetToJson } from '@/utils/xlsxUtil'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const FileName = styled.span`
  margin-right: 0.5rem;
`

export interface Props {
  onLoadBill: (bills: Bill[]) => void
  selectedBills: Bill[]
}

function BillSummary({ onLoadBill, selectedBills }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>()

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

      setFileName(file.name)

      onLoadBill(bills)
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
        <FileName>{fileName}</FileName>
        <Button primary onClick={handleLoadBillClick}>
          이용 내역 불러오기
        </Button>
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
