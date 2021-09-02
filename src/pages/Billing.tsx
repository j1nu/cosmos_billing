import React, { useCallback, useState } from 'react'

import BillingTable from '@/components/BillingTable'
import BillSummary from '@/components/BillSummary'
import Layout from '@/components/Layout'
import { Bill } from '@/types'

function Billing() {
  const [bills, setBills] = useState<Bill[]>([])
  const [selectedBills, setSelectedBills] = useState<Bill[]>([])

  const handleLoadBill = useCallback((bills: Bill[]) => {
    setBills(bills)
  }, [])

  const handleAddBill = (bill: Bill) => {
    setBills([...bills, bill])
  }

  const handleSelect = useCallback((selectedBills: Bill[]) => {
    setSelectedBills(selectedBills)
  }, [])

  return (
    <Layout>
      <BillSummary
        onLoadBill={handleLoadBill}
        selectedBills={selectedBills}
        onAddBill={handleAddBill}
      />
      <BillingTable bills={bills} onSelect={handleSelect} />
    </Layout>
  )
}

export default Billing
