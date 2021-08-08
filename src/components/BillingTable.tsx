import React, { useMemo } from 'react'

import Table, { Column } from '@/components/Table'
import { Bill } from '@/types'

export interface ComponentProps {
  bills: Bill[]
}

function BillingTable({ bills }: ComponentProps) {
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

  const data = useMemo<Bill[]>(() => [...bills], [bills])

  return <Table columns={columns} data={data} />
}

export default BillingTable
