'use client';

import { useContext, useState } from 'react';

import Link from 'next/link';

import { AuthContext } from '@/provider/AuthProvider';
import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';

import UserFiled from '@/components/atoms/UserFiled';
import MainCustomArea from '@/components/layout/MainCustomArea';

import style from '@/styles/settings/settingsList.module.css';

const Page = () => {
  const [selectedList, setSelectedList] = useState<number>(0);
  const { setIsLogoutModal } = useContext(PostContext);
  const { userProfile } = useContext(AuthContext);

  const settingsList = [
    { text: 'アカウント' },
    { text: '利用規約' },
    { text: 'ログアウト' },
  ];

  return (
    <MainCustomArea>
      <div className={style.listArea}>
        <ul className={style.listContainer}>
          {settingsList.map((list, index) => (
            <li
              key={index}
              style={{ color: COLORS.WHITE }}
              className={
                index === selectedList
                  ? style.listSelectedItem
                  : style.listNotSelectedItem
              }
              onClick={() => setSelectedList(index)}
            >
              <span>{list.text}</span>
              <span>＞</span>
            </li>
          ))}
        </ul>
        <div className={style.contentContainer}>
          {selectedList === 0 && (
            <div className={style.sideContainer}>
              <p style={{ color: COLORS.WHITE }} className={style.title}>
                アカウント情報
              </p>
              <ul className={style.userContainer}>
                <UserFiled
                  label={'ユーザー名'}
                  userText={userProfile.userName}
                />
                <UserFiled
                  label={'メールアドレス'}
                  userText={userProfile.email}
                />
                <UserFiled
                  label={'性別'}
                  userText={
                    userProfile.sex === 'man'
                      ? '男性'
                      : userProfile.sex === 'woman'
                        ? '女性'
                        : ''
                  }
                />
              </ul>
            </div>
          )}
          {selectedList === 1 && (
            <div className={style.sideContainer}>
              <p style={{ color: COLORS.WHITE }} className={style.title}>
                利用規約
              </p>
              <Link
                target="_blank"
                href={
                  'https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc'
                }
                style={{ color: COLORS.WHITE, textAlign: 'center' }}
              >
                利用規約はこちら
              </Link>
            </div>
          )}
          {selectedList === 2 && (
            <div className={style.sideLogoutContainer}>
              <p style={{ color: COLORS.WHITE }} className={style.logout}>
                ログアウトしますか？
              </p>
              <button
                style={{ color: COLORS.WHITE, backgroundColor: COLORS.ERROR }}
                className={style.logoutButton}
                onClick={() => setIsLogoutModal(true)}
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </MainCustomArea>
  );
};

export default Page;
