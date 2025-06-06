import { saveAs } from 'file-saver';
import type { ITableColumn } from '../interface/table';
import { getTableCellValue } from './table';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportToCsv<T extends Record<string, any>>(
  columns: ITableColumn<T>[],
  data: T[],
  fileName: string = '导出数据'
): void {
  const header = columns.map(col => `"${col.title.replace(/"/g, '""')}"`).join(',');

  const rows = data.map(item =>
    columns.map(col => {
      let value = getTableCellValue(item, col);
      if (value === null || typeof value === 'undefined') {
        value = '';
      }
      const stringValue = String(value).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',')
  );

  const csvContent = [header, ...rows].join('\n');

  const dataBlob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8-sig;' }); // 添加 BOM 解决 Excel 中文乱码

  saveAs(dataBlob, `${fileName}.csv`);
}
