/* eslint-disable react/jsx-key */
import {Filter, Archive, TrashCan} from '@carbon/icons-react';
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
} from '@carbon/react';

import React from 'react';

import type {
  DataTableCustomRenderProps,
  DataTableProps,
} from 'carbon-components-react';

import styles from './BasicTable.module.css';

// TEMPORARY FIX FOR CARBON DATA TABLE TYPES
class DataTable extends React.Component<
  DataTableProps & {children?: Function}
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
  handleArchive,
  handleDelete,
  toolbarActions,
}: DataTableProps & {
  handleArchive?: Function;
  handleDelete?: Function;
  toolbarActions?: JSX.Element;
}) => (
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
              {handleDelete && (
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={TrashCan}
                  kind='danger'
                  onClick={() => {
                    handleDelete(selectedRows);
                  }}
                >
                  Delete
                </TableBatchAction>
              )}
              {handleArchive && (
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Archive}
                  kind='secondary'
                  className={styles.archive_button}
                  onClick={() => {
                    handleArchive(selectedRows);
                  }}
                >
                  Archive
                </TableBatchAction>
              )}
            </TableBatchActions>
            <TableToolbarContent
              aria-hidden={batchActionProps.shouldShowBatchActions}
            >
              <TableToolbarSearch
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />
              {toolbarActions && (
                <TableToolbarMenu
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  renderIcon={Filter}
                  title='Filter'
                >
                  {toolbarActions}
                </TableToolbarMenu>
              )}
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />

                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({header})}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({row})} className='table-row'>
                  <TableSelectRow {...getSelectionProps({row})} />
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

export {BasicTable, DataTable};
