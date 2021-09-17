import React, { useRef } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import XLSX from 'xlsx'

import { Bill } from '@/types'
import { readFileAsArrayBuffer } from '@/utils/fileUtil'
import {
  convertKBankBills,
  convertShinhanBankBills,
  KBankBill,
  sheetToJson,
  ShinhanBankBill,
} from '@/utils/xlsxUtil'

interface Props {
  bank: string
  onLoadBills: (bills: Bill[]) => void
  onChangeBank: (bank: string) => void
}

function LoadBilling({ bank, onLoadBills, onChangeBank }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleLoadBillClick = (bank: string) => {
    onChangeBank(bank)

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

      let bills = []

      if (bank === 'kbank') {
        const kBankBills = sheetToJson(workSheet) as KBankBill[]
        bills = convertKBankBills(kBankBills)
      } else {
        const shinhanBills = sheetToJson(workSheet) as ShinhanBankBill[]
        bills = convertShinhanBankBills(shinhanBills)
      }

      onLoadBills(bills)
    } catch {
      alert('이용 내역을 불러오는데 실패했습니다.')
    }
  }

  return (
    <div>
      <Menu compact size="small">
        <Dropdown text="이용내역 불러오기" simple item>
          <Dropdown.Menu>
            <Dropdown.Item
              text="케이뱅크"
              onClick={() => handleLoadBillClick('kbank')}
            />
            <Dropdown.Item
              text="신한은행"
              onClick={() => handleLoadBillClick('shinhan')}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <input
        ref={inputRef}
        type="file"
        accept=".xls, .xlsx"
        hidden
        onChange={handleBillFileChange}
      />
    </div>
  )
}

export default LoadBilling
