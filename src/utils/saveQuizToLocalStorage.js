import nanoId from './nanoId';
import { getRandomIllustration } from './randomImage';

const saveQuizToLocalStorage = ({ token, createdBy, quiz }) => {
  const existing = JSON.parse(localStorage.getItem('quizes') || '[]');

  const newQuiz = {
    id: nanoId(),
    token: token === '' ? '' : token,
    createdBy,
    createdAt: new Date().toISOString(),
    quiz: quiz,
    image_path: getRandomIllustration()
  };

  const updated = [...existing, newQuiz];
  localStorage.setItem('quizes', JSON.stringify(updated));

  return updated;
};

export default saveQuizToLocalStorage;
