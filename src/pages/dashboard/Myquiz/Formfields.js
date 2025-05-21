import { InputType } from '@/constants';

export const formFields = () => [
  {
    name: 'token',
    type: InputType.OTP,
    rules: [
      {
        required: true,
        message: `Panjang harus diisi`
      }
    ],
    extra: {
      length: 4
    }
  }
];
