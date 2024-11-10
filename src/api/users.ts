import { auth, db } from '@/firebase';
import { LoginSchemaType, SignUpSchemaType } from '@/schema/login';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

/** 新規アカウント作成 */
export const createUserApi = async (data: SignUpSchemaType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );

    const userUid = userCredential.user.uid;
    const userRef = doc(db, 'users', userUid);

    await setDoc(
      userRef,
      {
        user_id: userUid,
        userName: data.userName,
        email: data.email,
        sex: data.sex,
        date: data.date,
        image: '',
      },
      { merge: true },
    );
  } catch {
    return 'アカウント作成に失敗しまいた。時間をおいて再度お試しください';
  }
};

/** ユーザーログイン */
export const loginUserApi = async (data: LoginSchemaType) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);

      if (error.code === 'auth/user-not-found') {
        return 'メールアドレスまたはパスワードが違います';
      } else if (error.code === 'auth/email-already-in-use') {
        return 'このメールアドレスはすでに使用されています';
      } else {
        return '時間をおいて再度お試しください';
      }
    }
  }
};

/** ログアウト */
export const logoutUserApi = async () => {
  try {
    await auth.signOut();
  } catch {
    return 'ログアウトに失敗しました';
  }
};
