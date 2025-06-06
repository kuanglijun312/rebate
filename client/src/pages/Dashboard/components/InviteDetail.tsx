import React, { useDeferredValue, useEffect, useMemo } from 'react';
import type { ITradeItem } from '../../../interface/model';
import { TableDataTypeEnums, type IPagination, type ITableColumn } from '../../../interface/table';
import { getTradeList } from '../../../api/trade';
import { wrapPromise } from '../../../utils/wrapPromise';
import { Table } from '../../../components/Table';
import { concurrentRequests } from '../../../utils/concurrentRequests';
import { exportToCsv } from '../../../utils/export';

export const InviteDetail = () => {
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    pageSize: 10,
    total: 0,
  })
  const [searchContent, setSearchContent] = React.useState<string>('')
  const searchContentValue = useDeferredValue(searchContent)
  const getTradeListResource = useMemo(() => {
    return wrapPromise(() => getTradeList(searchContentValue, pagination.page, pagination.pageSize), `tradeList-${searchContentValue}-${pagination.page}-${pagination.pageSize}`)
  }, [pagination.page, pagination.pageSize, searchContentValue])
  const data = getTradeListResource.read() as { list: ITradeItem[], pagination: IPagination }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value)
  }

  useEffect(() => {
    if (data?.pagination) {
        setPagination(data.pagination)
    }
  }, [data])

  const onChangePagination = (pagination: IPagination) => {
    setPagination(pagination)
  }

  const columns: ITableColumn<ITradeItem>[] = [
    {
      name: 'id',
      title: 'ID',
      align: 'left',
    },
    {
      name: 'uid',
      title: '用户ID',
      align: 'left',
    },
    {
      name: 'userName',
      title: '用户姓名',
      align: 'left',
    },
    {
      name: 'amount',
      title: '交易金额',
      align: 'left',
      dataType: TableDataTypeEnums.currency,
    },
    {
      name: 'fee',
      title: '手续费',
      align: 'left',
      dataType: TableDataTypeEnums.currency,
    },
    {
      name: 'rebate',
      title: '返佣金额',
      align: 'left',
      dataType: TableDataTypeEnums.currency,
    },
    {
      name: 'timestamp',
      title: '交易时间',
      align: 'left',
      dataType: TableDataTypeEnums.date,
    },
  ];

  const [inExport, setInExport] = React.useState<boolean>(false)
  const handleExport = async () => {
    if (pagination.total === 0) {
      return
    }
    setInExport(true)
    try {
      const result = await concurrentRequests(new Array(Math.ceil(pagination.total / pagination.pageSize)).fill(0).map((_, index) => {
        return async () => {
          const result = await getTradeList(searchContentValue, index + 1, pagination.pageSize)
          return result.data.list
        }
      }), 5)
      const data = result.flat()
      exportToCsv(columns, data)
    } finally {
      setInExport(false)
    }
  }

  return (
    <div className="overflow-x-auto bg-white p-4 shadow-xl">
      <div className='flex justify-between mb-4'>
        <label className='flex items-center'>
          <span className='text-gray-500 mr-3'>用户名:</span>
          <input
            type="text"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchContent}
            onChange={handleSearchChange}
          />
        </label>
        <button className='ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 self-end' onClick={handleExport} disabled={inExport}>
          导出
        </button>
      </div>
      <Table<ITradeItem>
        columns={columns}
        data={data?.list}
        pagination={pagination}
        onChangePagination={onChangePagination}
      />
    </div>
  );
}
