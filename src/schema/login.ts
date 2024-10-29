import { ZodSchema, z } from 'zod';

const signUpSchema = z
  .object({
    userName: z.string().min(1, 'ユーザー名を入力してください'),
    date: z.string().min(1, '生年月日を選択してください'),
    sex: z.string().min(1, '性別を選択してください'),
    email: z.string().email('正しいメールアドレスを入力してください'),
    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(/^[a-zA-Z0-9]+$/, 'パスワードは英数字のみで入力してください'),
    passwordConfirm: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(/^[a-zA-Z0-9]+$/, 'パスワードは英数字のみで入力してください'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirm'],
  });

const loginSchema = z.object({
  email: z.string().email('メールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

export const getLoginSchema = (
  isSignUp: boolean,
): ZodSchema<LoginSchemaType> => {
  return isSignUp ? signUpSchema : loginSchema;
};

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const DEFAULT_SIGN_UP_VALUE: SignUpSchemaType = {
  userName: '',
  date: '',
  sex: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const DEFAULT_LOGIN_VALUE: LoginSchemaType = {
  email: '',
  password: '',
};
