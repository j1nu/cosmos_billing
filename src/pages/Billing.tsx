import React, { useCallback, useState } from 'react'

import BillingTable from '@/components/BillingTable'
import BillSummary from '@/components/BillSummary'
import Layout from '@/components/Layout'
import { Bill } from '@/types'

function Billing() {
  const [bills, setBills] = useState<Bill[]>([])
  const [selectedBills, setSelectedBills] = useState<Bill[]>([])
  const [bank, setBank] = useState<string>('')

  const handleLoadBills = useCallback((bills: Bill[]) => {
    setBills(bills)
  }, [])

  const handleAddBill = useCallback(
    (bill: Bill) => {
      setBills(
        [...bills, bill].sort((a, b) => a.usedDate.localeCompare(b.usedDate)),
      )
    },
    [bills],
  )

  const handleDeleteBill = useCallback((index: number) => {
    return setBills((prev) => {
      const newBills = [...prev]

      newBills.splice(index, 1)

      return newBills
    })
  }, [])

  const handleSelectBills = useCallback((selectedBills: Bill[]) => {
    setSelectedBills(selectedBills)
  }, [])

  const handleChangeBank = useCallback((bank: string) => {
    setBank(bank)
  }, [])

  return (
    <Layout>
      <BillSummary
        selectedBills={selectedBills}
        bank={bank}
        onLoadBills={handleLoadBills}
        onAddBill={handleAddBill}
        onChangeBank={handleChangeBank}
      />
      <BillingTable
        bills={bills}
        bank={bank}
        onSelect={handleSelectBills}
        onDelete={handleDeleteBill}
      />
    </Layout>
  )
}

export default Billing
