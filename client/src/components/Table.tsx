import clsx from "clsx"
import { type IPagination, type ITableColumn } from "../interface/table"
import { Pagination } from "./Pagination"
import { getTableCellValue } from "../utils/table"

export function Table<T>({
  className,
  columns,
  data,
  pagination,
  onChangePagination,
}: {
  className?: string
  columns: ITableColumn<T>[]
  pagination: IPagination
  data: T[]
  onChangePagination: (pagination: IPagination) => void
}) {
  
  return (
    <div className={clsx("min-w-full bg-white rounded-lg overflow-hidden", className)}>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={clsx("px-4 py-2", {
                "text-left": column.align === "left",
                "text-right": column.align === "right",
                "text-center": column.align === "center",
              })}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {
                columns.map((column, index) => (
                  <td key={index} className={clsx("px-4 py-2", {
                    "text-left": column.align === "left",
                    "text-right": column.align === "right",
                    "text-center": column.align === "center",
                  })}>
                    {getTableCellValue(item, column) as string}
                  </td>
                ))
              }
            </tr>
          ))}
          {
            data && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-2 text-center">
                  暂无数据
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Pagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page, pageSize) => onChangePagination({ ...pagination, page, pageSize })}
      />
    </div>
  );
}