import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'

import Table, { Column, Row } from '@/components/Table'
import { Bill } from '@/types'

type SelectedBills = Record<number, Bill>

export interface ComponentProps {
  bills: Bill[]
  onSelect: (selectedBills: Bill[]) => void
}

function BillingTable({ bills, onSelect }: ComponentProps) {
  const [selectedBills, setSelectedBills] = useState<SelectedBills>({})

  const isEmpty = useMemo(() => bills.length === 0, [bills.length])

  const isAllSelected = useMemo(() => {
    if (isEmpty) {
      return false
    }

    return Object.keys(selectedBills).length === bills.length
  }, [bills.length, isEmpty, selectedBills])

  const handleSelectAllChange = useCallback(
    (checked?: boolean) => {
      if (!checked) {
        return setSelectedBills({})
      }

      setSelectedBills(() => {
        const newSelectedBills: SelectedBills = {}

        bills.forEach((bill, index) => {
          newSelectedBills[index] = bill
        })

        return newSelectedBills
      })
    },
    [bills],
  )

  const handleSelectChange = useCallback(
    (row: Row<Bill>, checked?: boolean) => {
      if (!checked) {
        return setSelectedBills((prev) => {
          const newSelectedBills = { ...prev }

          delete newSelectedBills[row.index]

          return newSelectedBills
        })
      }

      setSelectedBills((prev) => ({ ...prev, [row.index]: row.data }))
    },
    [],
  )

  const columns = useMemo<Column<Bill>[]>(
    () => [
      {
        id: 'selection',
        header: (
          <Checkbox
            disabled={isEmpty}
            checked={isAllSelected}
            onChange={(_, { checked }) => handleSelectAllChange(checked)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedBills[row.index] !== undefined}
            onChange={(_, { checked }) => handleSelectChange(row, checked)}
          />
        ),
      },
      { accessor: 'usedDate', header: '이용일시' },
      { accessor: 'storeName', header: '가맹점명' },
      {
        accessor: 'usedAmount',
        header: '이용금액',
      },
      { accessor: 'usedType', header: '이용구분' },
      { accessor: 'purchaseStatus', header: '매입상태' },
    ],
    [
      isEmpty,
      isAllSelected,
      handleSelectAllChange,
      selectedBills,
      handleSelectChange,
    ],
  )

  const data = useMemo<Bill[]>(() => [...bills], [bills])

  useEffect(() => {
    onSelect(Object.values(selectedBills))
  }, [onSelect, selectedBills])

  return <Table columns={columns} data={data} />
}

export default BillingTable
