/**
 * 头像
 */
import classnames from 'classnames';
import Image from 'next/image';

import AvatarImage from '@/assets/image/avatar.png';

export default function Avatar({
  width = 50,
  height = 50,
  className = '',
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={classnames(
        'rounded-full p-3px border-1 border-#00000040',
        className,
      )}
      style={{ width, height }}
    >
      <Image
        src={AvatarImage}
        alt="avatar"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1px solid #00000040',
        }}
      />
    </div>
  );
}
