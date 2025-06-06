
export interface IPagination {
  page: number
  pageSize: number
  total: number
}

export enum TableDataTypeEnums {
  currency = 'currency',
  text = 'text',
  date = 'date',
  percent = 'percent',
}

export interface ITableColumn<T> {
  name: keyof T
  title: string
  align?: 'left' | 'center' | 'right'
  dataType?: TableDataTypeEnums
}