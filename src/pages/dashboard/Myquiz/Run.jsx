import { QuizRunner } from '@/components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Run = () => {
  const { id } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('quizes');
    if (raw) {
      const quizes = JSON.parse(raw);
      const found = quizes.find((q) => q.id === id);
      setSelectedQuiz(found || null);
    }
  }, [id]);

  if (!selectedQuiz) {
    return <div>Loading quiz...</div>;
  }

  return <QuizRunner quizData={selectedQuiz} />;
};

export default Run;
