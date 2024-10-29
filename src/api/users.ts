import { auth, db } from '@/firebase';
import { LoginSchemaType, SignUpSchemaType } from '@/schema/login';
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
  } catch (error) {
    throw new Error('user作成中にエラーが発生しました。');
  }
};

/** ユーザーログイン */
export const loginUserApi = async (data: LoginSchemaType) => {
  await signInWithEmailAndPassword(auth, data.email, data.password);
};
