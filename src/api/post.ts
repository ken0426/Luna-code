import { db } from '@/firebase';
import { PostSchemaType } from '@/schema/post';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

export const createPostApi = async (data: PostSchemaType) => {
  console.log(data);
  const postsRef = collection(db, 'posts');
  await addDoc(postsRef, data);
};

export const deletePostApi = async (id: string) => {
  const postsRef = collection(db, 'posts');
  await deleteDoc(doc(postsRef, id));
};
