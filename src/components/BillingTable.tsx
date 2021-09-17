import styled from '@emotion/styled'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { Checkbox, Icon } from 'semantic-ui-react'

import Table, { Column, Row } from '@/components/Table'
import { Bill } from '@/types'

const Amount = styled.span<{ isNegative: boolean }>`
  color: ${({ isNegative }) => (isNegative ? 'DarkGrey' : 'black')};
`

type SelectedBills = Record<number, Bill>

export interface ComponentProps {
  bills: Bill[]
  bank: string
  onSelect: (selectedBills: Bill[]) => void
  onDelete: (index: number) => void
}

function BillingTable({ bills, bank, onSelect, onDelete }: ComponentProps) {
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

  const handleDeleteBill = useCallback(
    (index: number) => {
      onDelete(index)

      if (selectedBills[index] !== undefined) {
        setSelectedBills((prev) => {
          const newSelectedBills = { ...prev }

          delete newSelectedBills[index]

          return newSelectedBills
        })
      }
    },
    [onDelete, selectedBills],
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
        cell: ({ row }) => (
          <Amount isNegative={row.data.usedAmount < 0}>
            {row.data.usedAmount}
          </Amount>
        ),
        accessor: 'usedAmount',
        header: '이용금액',
      },
      { accessor: 'usedType', header: '이용구분' },
      { accessor: 'accountName', header: '출금처' },
      {
        cell: ({ row }) => (
          <>
            {row.data.manual && (
              <Icon
                name="close"
                color="grey"
                onClick={() => {
                  handleDeleteBill(row.index)
                }}
              />
            )}
          </>
        ),
        accessor: 'manual',
        header: '',
      },
    ],
    [
      isEmpty,
      isAllSelected,
      handleSelectAllChange,
      selectedBills,
      handleSelectChange,
      handleDeleteBill,
    ],
  )

  const data = useMemo<Bill[]>(() => [...bills], [bills])

  useEffect(() => {
    onSelect(Object.values(selectedBills))
  }, [onSelect, selectedBills])

  useEffect(() => {
    setSelectedBills({})
  }, [bank])

  return <Table columns={columns} data={data} />
}

export default BillingTable
