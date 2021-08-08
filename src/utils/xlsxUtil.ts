import XLSX from 'xlsx'
import { WorkSheet } from 'xlsx/types'

import { Bill } from '@/types'

export interface KBankBill {
  가맹점명: string
  승인시각: string
  승인일자: string
  '이용금액(\\)': string
  이용지역: string
  카드번호: string
}

export function sheetToJson(workSheet: WorkSheet) {
  return XLSX.utils.sheet_to_json(workSheet)
}

export function convertKBankBills(kBankBills: KBankBill[]) {
  return kBankBills.map(
    ({ 가맹점명, 승인시각, 승인일자, '이용금액(\\)': 이용금액 }) => {
      const bill: Bill = {
        usedDate: `${승인일자} ${승인시각}`,
        storeName: 가맹점명,
        usedAmount: Number(이용금액.replace(/[^\d]/g, '')),
      }

      return bill
    },
  )
}
