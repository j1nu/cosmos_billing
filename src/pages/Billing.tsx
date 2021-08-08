import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import { Button } from 'semantic-ui-react'
import XLSX from 'xlsx'

import BillingTable from '@/components/BillingTable'
import Layout from '@/components/Layout'
import { Bill } from '@/types'
import { readFileAsArrayBuffer } from '@/utils/fileUtil'

import { convertKBankBills, KBankBill, sheetToJson } from '../utils/xlsxUtil'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function Billing() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [bills, setBills] = useState<Bill[]>([])

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

    try {
      const arrayBuffer = await readFileAsArrayBuffer(files[0])

      const { SheetNames, Sheets } = XLSX.read(arrayBuffer, { type: 'array' })
      const workSheet = Sheets[SheetNames[0]]

      const kBankBills = sheetToJson(workSheet) as KBankBill[]
      const bills = convertKBankBills(kBankBills)

      setBills(bills)
    } catch {}
  }

  return (
    <Layout>
      <ButtonContainer>
        <Button primary size="large" onClick={handleLoadBillClick}>
          이용 내역 불러오기
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".xls, .xlsx"
          hidden
          onChange={handleBillFileChange}
        />
      </ButtonContainer>

      <BillingTable bills={bills} />
    </Layout>
  )
}

export default Billing
