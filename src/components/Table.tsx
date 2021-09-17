import React, { ComponentType, ReactNode, useCallback } from 'react'
import { Table as SemanticUITable } from 'semantic-ui-react'

export type Column<T extends object> = {
  header: ReactNode
  cell?: ComponentType<{ row: Row<T> }>
} & (
  | { id: Extract<keyof T, string> | string }
  | { accessor: Extract<keyof T, string> }
)

export interface Row<T extends object> {
  index: number
  data: T
}

export interface ComponentProps<T extends object> {
  columns: Column<T>[]
  data: T[]
}

function Table<T extends object>({ columns, data }: ComponentProps<T>) {
  const getCell = useCallback((row: T, column: Column<T>, rowIndex: number) => {
    if ('accessor' in column) {
      return row[column.accessor] ?? null
    }

    if ('cell' in column) {
      const Component = column.cell

      if (!Component) {
        return null
      }

      const props: Row<T> = { index: rowIndex, data: { ...row } }

      return <Component row={props} />
    }
  }, [])

  return (
    <SemanticUITable padded>
      <SemanticUITable.Header>
        <SemanticUITable.Row>
          {columns.map((column, index) => (
            <SemanticUITable.HeaderCell key={index}>
              {column.header}
            </SemanticUITable.HeaderCell>
          ))}
        </SemanticUITable.Row>
      </SemanticUITable.Header>

      <SemanticUITable.Body>
        {data.map((row, rowIndex) => (
          <SemanticUITable.Row key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <SemanticUITable.Cell key={columnIndex}>
                {getCell(row, column, rowIndex)}
              </SemanticUITable.Cell>
            ))}
          </SemanticUITable.Row>
        ))}
      </SemanticUITable.Body>
    </SemanticUITable>
  )
}

export default Table
