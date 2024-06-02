import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useAppLanguage } from '@/utils/modules';
import { AppLoadingOverlay } from '../AppLoadingOverlay/AppLoadingOverlay';

export type TBaseColumn = {
  id: string | number;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  label: string;
  ellipsis?: boolean;
  ellipsisLine?: number;
  ellipsisElement?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any) => React.ReactNode;
};

export type TBaseData = {
  id: string | number;
};

export type TAppDatatableProps<
  TColumn extends TBaseColumn,
  TData extends TBaseData,
> = {
  columns: TColumn[];
  data: TData[];
  isLoading?: boolean;
  maxHeight?: number | string;
  count?: number;
  onChangePagination?: (page: number, rowPerPage: number) => void;
};

export function AppDatatable<C extends TBaseColumn, D extends TBaseData>({
  columns,
  data,
  isLoading,
  maxHeight,
  count,
  onChangePagination,
}: TAppDatatableProps<C, D>) {
  const [pagination, setPagination] = useState<{
    rowPerPage: number;
    page: number;
  }>({
    page: 0,
    rowPerPage: 10,
  });
  const { Strings } = useAppLanguage();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPagination(_pagination => ({ ..._pagination, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPagination(() => ({
      rowPerPage: +event.target.value,
      page: 0,
    }));
  };

  useEffect(() => {
    onChangePagination?.(pagination.page + 1, pagination.rowPerPage);
  }, [pagination]);

  const renderTableRow = () => {
    if (!data || !data.length)
      return (
        <TableRow>
          <TableCell colSpan={columns.length + 1} align="center">
            {Strings.no_data}
          </TableCell>
        </TableRow>
      );
    return data.map(row => {
      return (
        <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
          {columns.map((column, idx) => {
            const value = row[column.id as keyof TBaseData];
            const innerClassName = `& .${column?.ellipsisElement}`;
            if (column.render) {
              return (
                <TableCell
                  sx={{
                    p: 1,
                    [innerClassName]: {
                      display: '-webkit-box !important',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '-webkit-line-clamp': `${column?.ellipsisLine ?? 1}`,
                      '-webkit-box-orient': 'vertical',
                    },
                  }}
                  key={`${column.id} ${idx}`}
                  align={column.align}
                >
                  {column.render(row)}
                </TableCell>
              );
            }
            return (
              <TableCell key={`${column.id} ${idx}`} align={column.align}>
                {/* @ts-ignore */}
                {column.format?.(value) || value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  return (
    <AppLoadingOverlay isLoading={!!isLoading}>
      <TableContainer sx={{ maxHeight: maxHeight ?? 'auto' }}>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableCell
                  key={`${column.id} ${idx}`}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: column?.width,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                  sx={{
                    py: 1,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRow()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={Strings.rows_per_page}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count ?? 0}
        rowsPerPage={pagination.rowPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </AppLoadingOverlay>
  );
}
