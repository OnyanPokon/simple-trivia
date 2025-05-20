import { Button, Card, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth, useNotification } from '@/hooks';
import { useState } from 'react';

const Login = () => {
  const { login, register } = useAuth();
  const { error, success } = useNotification();
  const [form] = Form.useForm();

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (values) => {
    try {
      if (isRegister) {
        register(values.username);
        success('Berhasil', 'Pendaftaran berhasil!');
        form.resetFields();
      } else {
        login(values.username);
        success('Berhasil', 'Berhasil login!');
      }
    } catch (err) {
      error('Gagal', err.message);
    }
  };

  return (
    <Card className="w-full max-w-md px-4">
      <div className="mb-5 mt-4 flex w-full flex-col items-center justify-center gap-y-2">
        <div className="mb-4 flex flex-col items-center justify-center gap-y-2 text-center">
          <h1 className="text-xl font-semibold">Selamat Datang!</h1>
          <p className="max-w-xs text-xs"> Hai! Siap menguji seberapa luas pengetahuan umummu? Yuk, mainkan kuis-kuis seru di sini!</p>
        </div>
      </div>
      <Form form={form} name="login" layout="vertical" initialValues={{ remember: true }} onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan username!'
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
        </Form.Item>
        <Form.Item>
          <div className="inline-flex w-full items-center gap-x-2">
            <Button block loading={false} type="primary" htmlType="submit" size="large" className="w-full" onClick={() => setIsRegister(false)}>
              Masuk
            </Button>
            <Button block variant="solid" size="large" htmlType="submit" className="w-full" onClick={() => setIsRegister(true)}>
              Daftar
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
