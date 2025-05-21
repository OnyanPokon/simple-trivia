import { Card, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useCrudModal, useNotification } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { formFields } from './Formfields';

const Index = () => {
  const [matchedQuizzes, setMatchedQuizzes] = useState([]);
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const quizesStr = localStorage.getItem('quizes');
    const loggedUserStr = localStorage.getItem('loggedUser');
    const registeredUsersStr = localStorage.getItem('registeredUsers');

    if (quizesStr && loggedUserStr && registeredUsersStr) {
      const quizes = JSON.parse(quizesStr);
      const loggedUser = JSON.parse(loggedUserStr);
      const registeredUsers = JSON.parse(registeredUsersStr);

      const userData = registeredUsers.find((u) => u.username === loggedUser.username);
      const progressList = userData?.quizProgress || [];

      const matched = quizes.filter((quiz) => progressList.some((p) => p.idQuiz === quiz.id));

      setMatchedQuizzes(matched);
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
      {matchedQuizzes.map((item) => (
        <Card
          actions={[
            <Tooltip key="play" title="Play Quiz">
              <PlayCircleOutlined onClick={() => handlePlayQuiz(item)} />
            </Tooltip>
          ]}
          cover={<img alt="example" src={item.image_path} className="h-28" />}
          key={item.id}
          className="lg:col-span-1 md:col-span-2 col-span-6  w-full"
        >
          <Meta title={<Typography.Title level={5}>{item.quiz[0].category}</Typography.Title>} description={`${item.quiz.length} Question, Created By ${item.createdBy}`} />
        </Card>
      ))}
    </div>
  );
};

export default Index;
