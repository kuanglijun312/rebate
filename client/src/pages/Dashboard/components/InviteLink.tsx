import clsx from 'clsx';
import { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';

const InviteLink = ({
  className
}: {
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const { user } = useUser();
  
  const inviteUrl = `${window.location.origin}/register?inviteCode=${user?.inviteCode}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('copy failed:', err);
    }
  };

  return (
    <div className={clsx("bg-white p-6 rounded-lg shadow-lg", className)}>
      <h3 className="text-lg text-gray-900 mb-4">邀请好友</h3>
      
      <div className="flex items-center space-x-2">
        <div className="flex-1 p-3 bg-gray-50 rounded-md overflow-x-auto">
          <code className="text-sm text-gray-800">{inviteUrl}</code>
        </div>
        
        <button onClick={handleCopy} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {copied ? '已复制!' : '复制链接'}
        </button>
      </div>
      
      <p className="mt-3 text-sm text-gray-500">
        分享此链接给好友，好友注册后您将获得返佣奖励
      </p>
    </div>
  );
};

export default InviteLink;