import { TableDataTypeEnums, type ITableColumn } from "../interface/table"
import { getTimeDisplay } from "./time"

export const getTableCellValue = <T>(item: T, column: ITableColumn<T>) => {
  const value = item[column.name]
  if (column.dataType === TableDataTypeEnums.date) {
    return getTimeDisplay(value as number)
  } else if (column.dataType === TableDataTypeEnums.currency) {
    return '¥ ' + (value as number).toLocaleString('zh-CN')
  }
  return value
}