import React, { useMemo } from 'react'

import Table, { Column } from '@/components/Table'
import { Bill } from '@/types'

export interface ComponentProps {
  data: Bill[]
}

function BillingTable({ data }: ComponentProps) {
  const columns = useMemo<Column<Bill>[]>(
    () => [
      { accessor: 'usedDate', header: '이용일시' },
      { accessor: 'storeName', header: '가맹점명' },
      {
        accessor: 'usedAmount',
        header: '이용금액',
      },
      { accessor: 'usedType', header: '이용구분' },
      { accessor: 'purchaseStatus', header: '매입상태' },
    ],
    [],
  )

  const mockData = useMemo<Bill[]>(
    () => [
      {
        purchaseStatus: '매입',
        storeName: '서울대입구역 커피빈',
        usedAmount: 20000,
        usedDate: '2021-08-12',
        usedType: '일시불',
      },
      {
        purchaseStatus: '매입',
        storeName: '영등포역 카페',
        usedAmount: 12000,
        usedDate: '2021-08-12',
        usedType: '일시불',
      },
    ],
    [],
  )

  return <Table columns={columns} data={mockData} />
}

export default BillingTable
