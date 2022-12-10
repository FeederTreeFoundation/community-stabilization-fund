/* eslint-disable react/jsx-key */
import {
  DataTable as CarbonDataTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Table
} from 'carbon-components-react';
import React from 'react';

import type {
  DataTableCustomRenderProps,
  DataTableProps
} from 'carbon-components-react';
  
// TEMPORARY FIX FOR CARBON DATA TABLE TYPES
class DataTable extends React.Component<DataTableProps & {children?: Function}> {
  render() {
    return (
      <CarbonDataTable {...this.props}>
        {this.props.children}
      </CarbonDataTable>
    );
  }
}

const BasicTable = ({rows, headers}: DataTableProps) => (
  <DataTable rows={rows} headers={headers}>
    {({ rows, headers, getTableProps, getHeaderProps, getRowProps }: DataTableCustomRenderProps) => (
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader  {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow  {...getRowProps({ row })}>
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </DataTable>
);

export { BasicTable, DataTable };