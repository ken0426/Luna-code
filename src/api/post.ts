import { db } from '@/firebase';
import { PostSchemaType } from '@/schema/post';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

export const createPostApi = async (data: PostSchemaType) => {
  try {
    const postsRef = collection(db, 'posts');
    await addDoc(postsRef, data);
  } catch {
    return '投稿に失敗しました';
  }
};

export const deletePostApi = async (id: string) => {
  try {
    const postsRef = collection(db, 'posts');
    await deleteDoc(doc(postsRef, id));
  } catch {
    return '投稿の削除に失敗しました';
  }
};
