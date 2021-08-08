import React, { ComponentType, ReactNode, useCallback } from 'react'
import { Table as SemanticUITable } from 'semantic-ui-react'

export type Column<T extends object> = {
  header: ReactNode
} & (
  | { id: Extract<keyof T, string> | string }
  | { accessor: Extract<keyof T, string> }
) & { cell?: ComponentType<{ row: T }> }

export interface ComponentProps<T extends object> {
  columns: Column<T>[]
  data: T[]
}

function Table<T extends object>({ columns, data }: ComponentProps<T>) {
  const getCell = useCallback((row: T, column: Column<T>) => {
    if ('id' in column) {
      return null
    }

    if ('cell' in column) {
      const Component = column.cell

      if (!Component) {
        return null
      }

      return <Component row={row} />
    }

    return row[column.accessor] ?? null
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
        {data.map((row, index) => (
          <SemanticUITable.Row key={index}>
            {columns.map((column, index) => (
              <SemanticUITable.Cell key={index}>
                {getCell(row, column)}
              </SemanticUITable.Cell>
            ))}
          </SemanticUITable.Row>
        ))}
      </SemanticUITable.Body>
    </SemanticUITable>
  )
}

export default Table
