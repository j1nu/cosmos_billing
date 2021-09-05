import React, { useCallback, useState } from 'react'

import BillingTable from '@/components/BillingTable'
import BillSummary from '@/components/BillSummary'
import Layout from '@/components/Layout'
import { Bill } from '@/types'

function Billing() {
  const [bills, setBills] = useState<Bill[]>([])
  const [selectedBills, setSelectedBills] = useState<Bill[]>([])

  const handleLoadBills = useCallback((bills: Bill[]) => {
    setBills(bills)
  }, [])

  const handleAddBill = useCallback(
    (bill: Bill) => {
      setBills([...bills, bill])
    },
    [bills],
  )

  const handleSelectBills = useCallback((selectedBills: Bill[]) => {
    setSelectedBills(selectedBills)
  }, [])

  const handleDeleteBill = useCallback((index: number) => {
    return setBills((prev) => {
      const newBills = [...prev]

      newBills.splice(index, 1)

      console.log(bills)

      return newBills
    })
  }, [])

  return (
    <Layout>
      <BillSummary
        onLoadBills={handleLoadBills}
        selectedBills={selectedBills}
        onAddBill={handleAddBill}
      />
      <BillingTable
        bills={bills}
        onSelect={handleSelectBills}
        onDelete={handleDeleteBill}
      />
    </Layout>
  )
}

export default Billing
