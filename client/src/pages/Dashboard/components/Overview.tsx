import clsx from 'clsx';
import { getOverviewData } from '../../../api/trade';
import { wrapPromise } from '../../../utils/wrapPromise';

// function getOverviewDataReadable<T>() {
//   return wrapPromise<T>(getOverviewData());
// }

interface IOverviewData {
  invitedUserCount: number
  tradeCount: number
  totalAmount: number
  totalFee: number,
  totalRebate: number
}

const overviewResource = wrapPromise(() => getOverviewData(), 'overview');

const Item = ({
  label,
  value,
  className
}: {
  label: string
  value?: number
  className?: string
}) => (
  <div className={clsx('bg-white p-4 rounded-lg shadow', className)}>
    <div className="flex items-center mb-2">
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
)

export const Overview = ({ className }: {
  className?: string
}) => {
  const overviewData: IOverviewData = overviewResource.read()

  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-white p-6 shadow-lg", className)}>
      <Item label="邀请人数" value={overviewData?.invitedUserCount} className='mb-4' />
      <Item label="交易总次数" value={overviewData?.tradeCount} className='mb-4' />
      <Item label="交易总金额" value={overviewData?.totalAmount} className='mb-4' />
      <Item label="返佣金额" value={overviewData?.totalRebate}  className='mb-4' />
    </div>
  );
};