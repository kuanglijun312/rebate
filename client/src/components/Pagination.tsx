
export const Pagination = ({ page, pageSize, total, onChange }: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        显示 {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, total)} 条，共 {total} 条
      </div>
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onChange(page - 1, pageSize)}
        >
          上一页
        </button>
        <span className="px-3 py-1">
          {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1, pageSize)}
        >
          下一页
        </button>
      </div>
    </div>
  );
};