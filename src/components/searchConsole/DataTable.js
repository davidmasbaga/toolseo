import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 }, 
    },
    useSortBy,
    usePagination
  );

  return (
    <div className='relative overflow-x-auto'>
      <table {...getTableProps()} className="w-full text-sm text-left text- dark:text-gray-400 rounded-lg ">
        <thead className='text-xs text-black uppercase dark:bg-gray-700 text-center'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-3 font-bold uppercase bg-gray-200 text-gray-600 lg:table-cell">
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className="p-3 text-center  lg:table-cell">{cell.render('Cell')}</td>
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination mt-10 mx-4">
        <button className='mx-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>{' '}
        <button className='mx-1' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>{' '}
        <button className='mx-1' onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>{' '}
        <button className='mx-1' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>{' '}
        <span className='ml-1'>
          Página{' '}
          <strong className='mr-2'>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default DataTable;
