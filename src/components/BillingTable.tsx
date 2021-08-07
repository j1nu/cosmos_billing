import React from 'react'
import { Rating, Table } from 'semantic-ui-react'

import { BILLING_TABLE_COLUMNS } from '../constants'
import { Bill } from '../types'

export interface ComponentProps {
  data: Bill[]
}

function BillingTable({ data }: ComponentProps) {
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          {BILLING_TABLE_COLUMNS.map((column, index) => (
            <Table.HeaderCell key={index}>{column}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>A</Table.Cell>
          <Table.Cell singleLine>Power Output</Table.Cell>
          <Table.Cell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>A</Table.Cell>
          <Table.Cell singleLine>Power Output</Table.Cell>
          <Table.Cell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>A</Table.Cell>
          <Table.Cell singleLine>Power Output</Table.Cell>
          <Table.Cell>
            <Rating icon="star" defaultRating={3} maxRating={3} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default BillingTable
