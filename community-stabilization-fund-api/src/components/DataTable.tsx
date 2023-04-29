/* eslint-disable react/jsx-key */
import { Filter, TrashCan } from '@carbon/icons-react';
import {
  DataTable as CarbonDataTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableToolbar,
  TableBatchAction,
  TableBatchActions,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
  TableSelectRow,
  TableSelectAll,
  Checkbox,
} from 'carbon-components-react';

import React from 'react';

import type {
  DataTableCustomRenderProps,
  DataTableProps,
} from 'carbon-components-react';

import type { ChangeEvent } from 'react';

// TEMPORARY FIX FOR CARBON DATA TABLE TYPES
class DataTable extends React.Component<
  DataTableProps & { children?: Function }
> {
  render() {
    return (
      <CarbonDataTable {...this.props}>{this.props.children}</CarbonDataTable>
    );
  }
}

const BasicTable = ({
  rows,
  headers,
  handleDelete,
  handleFilter,
}: DataTableProps & { handleDelete: Function; handleFilter: Function }) => (
  <DataTable rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
    }: DataTableCustomRenderProps) => {
      const batchActionProps = getBatchActionProps();
      return (
        <TableContainer {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...batchActionProps}>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan}
                onClick={() => {
                  handleDelete(selectedRows);
                }}
              >
                Delete
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent
              aria-hidden={batchActionProps.shouldShowBatchActions}
            >
              <TableToolbarSearch
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />
              <TableToolbarMenu
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                renderIcon={Filter}
              >
                <div style={{ width: '100%' }}>
                  <div style={{ padding: '0.5rem' }}>
                    <Checkbox
                      labelText={`Is Black?`}
                      id='checkbox-label-1'
                      value='is_black'
                      onChange={(e: ChangeEvent) =>
                        handleFilter((e.target as HTMLInputElement).value)
                      }
                    />
                    <Checkbox
                      labelText={`Is Local?`}
                      id='checkbox-label-2'
                      value='is_local'
                      onChange={(e: ChangeEvent) =>
                        handleFilter((e.target as HTMLInputElement).value)
                      }
                    />
                  </div>
                </div>
              </TableToolbarMenu>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />

                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })} className='table-row'>
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }}
  </DataTable>
);

export { BasicTable, DataTable };
