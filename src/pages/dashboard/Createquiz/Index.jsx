import { Card, Popconfirm, Result, Tooltip, Typography } from 'antd';
import { CopyOutlined, DeleteOutlined, LockOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth, useCrudModal, useNotification, useService } from '@/hooks';
import { TriviaService } from '@/services';
import { formFields } from './Formfields';
import saveQuizToLocalStorage from '@/utils/saveQuizToLocalStorage';
import { useEffect, useState } from 'react';
import Meta from 'antd/es/card/Meta';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const modal = useCrudModal();
  const navigate = useNavigate();
  const { loggedUser } = useAuth();
  const { success, error } = useNotification();

  const { execute: fetchCategories, ...getAllCategories } = useService(TriviaService.getAllCategories);
  const getQuiz = useService(TriviaService.getQuiz);

  const [quizes, setQuizes] = useState([]);

  const categories = getAllCategories.data ?? [];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const raw = localStorage.getItem('quizes');
    const allQuizes = JSON.parse(raw) ?? [];

    const filtered = allQuizes.filter((q) => q.createdBy === loggedUser.username);
    setQuizes(filtered);
  }, [loggedUser]);

  const handleDeleteQuiz = (id) => {
    const raw = localStorage.getItem('quizes');
    const allQuizes = JSON.parse(raw) ?? [];

    const updatedQuizes = allQuizes.filter((quiz) => quiz.id !== id);
    localStorage.setItem('quizes', JSON.stringify(updatedQuizes));

    const filtered = updatedQuizes.filter((q) => q.createdBy === loggedUser.username);
    setQuizes(filtered);
  };

  const handleCreateQuiz = () => {
    modal.create({
      title: `Buat Quiz`,
      formFields: formFields({ options: { categories } }),
      onSubmit: async (values) => {
        const { message, isSuccess, data } = await getQuiz.execute({
          amount: values.amount,
          category: values.category,
          difficulty: values.difficulty,
          type: 'multiple'
        });

        if (isSuccess) {
          success('Berhasil', message);

          saveQuizToLocalStorage({
            createdBy: loggedUser.username,
            quiz: data,
            token: values.token === '' ? '' : values.token
          });

          const raw = localStorage.getItem('quizes');
          const allQuizes = JSON.parse(raw) ?? [];
          const filtered = allQuizes.filter((q) => q.createdBy === loggedUser.username);
          setQuizes(filtered);
        } else {
          error('Gagal', message);
        }

        return isSuccess;
      }
    });
  };

  return (
    <div className="grid w-full grid-cols-6 gap-2">
      {quizes.map((item) => (
        <Card
          actions={[
            <Tooltip key="play" title="Play Quiz">
              <PlayCircleOutlined onClick={() => navigate('/my_quiz/run/' + item.id)} />
            </Tooltip>,
            <Tooltip key="token" title="Token">
              <LockOutlined
                onClick={() => {
                  modal.show.paragraph({
                    title: 'Token',
                    data: {
                      content: (
                        <>
                          {item.token ? (
                            <div className="desc inline-flex w-full items-center justify-center gap-x-6 py-16">
                              <b className="text-5xl text-gray-500">{item.token.split('').join('-')}</b>
                              <Tooltip title="Salin Ke Clipboard">
                                <button onClick={() => copyToClipboard(item.token)} className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-gray-300 text-gray-400">
                                  <CopyOutlined />
                                </button>
                              </Tooltip>
                            </div>
                          ) : (
                            <Result status="info" title="Quiz bersifat publik" subTitle="Quiz ini tidak memerlukan token untuk dimainkan" />
                          )}
                        </>
                      )
                    }
                  });
                }}
              />
            </Tooltip>,
            <Tooltip key="delete" title="Delete Quiz">
              <Popconfirm title="Yakin ingin menghapus quiz ini?" onConfirm={() => handleDeleteQuiz(item.id)} okText="Ya" cancelText="Tidak">
                <DeleteOutlined />
              </Popconfirm>
            </Tooltip>
          ]}
          cover={<img alt="example" src={item.image_path} className="h-28" />}
          key={item.id}
          className="lg:col-span-1 md:col-span-2 col-span-6  w-full"
        >
          <Meta title={<Typography.Title level={5}>{item.quiz[0].category}</Typography.Title>} description={`${item.quiz.length} Question, Created By ${item.createdBy}`} />
        </Card>
      ))}
      <Tooltip title="Buat Quiz Baru" className="lg:col-span-1 md:col-span-2 col-span-6  w-full">
        <button onClick={handleCreateQuiz} className="flex h-60 w-full flex-col items-center justify-center gap-y-4 rounded-lg bg-white hover:cursor-pointer">
          <PlusOutlined className="text-4xl font-bold text-blue-500" />
          <span className="text-blue-500">Generate</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default Index;
