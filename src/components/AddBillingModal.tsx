import 'react-datepicker/dist/react-datepicker.css'

import styled from '@emotion/styled'
import ko from 'date-fns/locale/ko'
import React, { useRef, useState } from 'react'
import { useCallback } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Button, Form, Modal, ModalActions } from 'semantic-ui-react'

import { Bill } from '@/types'
import { formatToyyyyMMdd } from '@/utils/dateUtil'

registerLocale('ko', ko)

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 10px;
`
const Label = styled.label`
  display: block;
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 13px;
  text-transform: none;
`

const HiddenButton = styled.button`
  display: none;
`

interface Props {
  header: string
  onAddBill: (bill: Bill) => void
}

function AddBillingModal({ header, onAddBill }: Props) {
  const [open, setOpen] = React.useState<boolean>(false)

  const [bill, setBill] = useState<Bill>({
    usedDate: formatToyyyyMMdd(new Date()),
    storeName: '',
    usedAmount: 0,
    usedType: '',
    accountName: '',
    manual: true,
  })

  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSubmitNewBill = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      onAddBill(bill)

      setOpen(false)

      setBill({
        usedDate: formatToyyyyMMdd(new Date()),
        storeName: '',
        usedAmount: 0,
        usedType: '',
        accountName: '',
        manual: true,
      })
    },
    [onAddBill, bill],
  )

  const handleChangeNewBill = useCallback(
    ({ name, value }: EventTarget & HTMLInputElement) => {
      setBill({
        ...bill,
        [name]: value,
      })

      if (name === 'usedAmount') {
        setBill({
          ...bill,
          usedAmount: Number(value),
        })
      }
    },
    [bill],
  )

  const handleAddBillClick = useCallback(() => {
    if (!buttonRef.current) {
      return
    }

    buttonRef.current.click()
  }, [])

  return (
    <Modal
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      open={open}
      size="small"
      trigger={
        <Button primary size="small">
          {header}
        </Button>
      }
      dimmer="blurring"
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmitNewBill}>
          <InputContainer>
            <Form.Input
              label="가맹점명"
              name="storeName"
              type="text"
              placeholder="가맹점명"
              value={bill.storeName}
              onChange={(event) => {
                handleChangeNewBill(event.target)
              }}
            ></Form.Input>
            <Form.Input
              label="이용금액"
              name="usedAmount"
              type="text"
              placeholder="이용금액"
              value={bill.usedAmount}
              onChange={(event) => {
                handleChangeNewBill(event.target)
              }}
            ></Form.Input>
            <Form.Input
              label="출금처"
              name="accountName"
              type="text"
              placeholder="이용금액"
              value={bill.accountName}
              onChange={(event) => {
                handleChangeNewBill(event.target)
              }}
            ></Form.Input>
            <div>
              <Label>이용날짜</Label>
              <DatePicker
                selectsRange={false}
                showTimeSelect
                timeFormat="p"
                locale="ko"
                onChange={(date) =>
                  setBill({ ...bill, usedDate: formatToyyyyMMdd(date as Date) })
                }
                value={bill.usedDate}
              />
            </div>
          </InputContainer>
          <HiddenButton ref={buttonRef} type="submit" />
        </Form>
      </Modal.Content>
      <ModalActions>
        <Button onClick={() => setOpen(false)}>취소</Button>
        <Button primary onClick={handleAddBillClick}>
          추가
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default AddBillingModal
