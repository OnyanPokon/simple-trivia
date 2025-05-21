import { Card, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { formFields } from './Myquiz/Formfields';
import { useCrudModal, useNotification } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [quiz, setQuiz] = useState([]);
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const quizesStr = localStorage.getItem('quizes');
    if (quizesStr) {
      const quizes = JSON.parse(quizesStr);
      setQuiz(quizes);
    }
  }, []);

  const handlePlayQuiz = (quizItem) => {
    if (quizItem.token) {
      modal.create({
        title: `Masukan Token Quiz`,
        formFields: formFields(),
        onSubmit: (values) => {
          if (values.token === quizItem.token) {
            success('Berhasil', 'Token Valid');
            navigate('/my_quiz/run/' + quizItem.id);
            return true;
          } else {
            error('Gagal', 'Token Tidak Valid');
            return false;
          }
        }
      });
    } else {
      navigate('/my_quiz/run/' + quizItem.id);
    }
  };

  return (
    <div className="grid w-full grid-cols-6 gap-2">
      {quiz.map((item) => (
        <Card
          actions={[
            <Tooltip key="play" title="Play Quiz">
              <PlayCircleOutlined onClick={() => handlePlayQuiz(item)} />
            </Tooltip>
          ]}
          cover={<img alt="quiz cover" src={item.image_path} className="h-28 w-full object-cover" />}
          key={item.id}
          className="lg:col-span-1 md:col-span-2 col-span-6  w-full"
        >
          <Meta title={<Typography.Title level={5}>{item.quiz[0]?.category || 'Kategori Tidak Diketahui'}</Typography.Title>} description={`${item.quiz.length} Question${item.createdBy ? `, Created By ${item.createdBy}` : ''}`} />
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
