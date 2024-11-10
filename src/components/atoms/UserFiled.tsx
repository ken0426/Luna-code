import { FC } from 'react';

import { COLORS } from '@/styles';

import style from '@/styles/settings/settingsList.module.css';

type Props = {
  label: string;
  userText: string;
};

const UserFiled: FC<Props> = ({ label, userText }) => {
  return (
    <li>
      <span style={{ color: COLORS.WHITE }} className={style.userLabel}>
        【{label}】
      </span>
      {userText ? (
        <span style={{ color: COLORS.WHITE }} className={style.userData}>
          {userText}
        </span>
      ) : (
        <span style={{ color: COLORS.WHITE }}>loading...</span>
      )}
    </li>
  );
};

export default UserFiled;
