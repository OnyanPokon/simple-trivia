import { Button, Typography } from 'antd';
import { ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const QuizRunner = ({ quizData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [quizProgress, setQuizProgress] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const navigate = useNavigate();

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const savedUserStr = localStorage.getItem("loggedUser");
    const registeredUsersStr = localStorage.getItem("registeredUsers");

    if (savedUserStr && registeredUsersStr) {
      const savedUser = JSON.parse(savedUserStr);
      const registeredUsers = JSON.parse(registeredUsersStr);

      const userData = registeredUsers.find((user) => user.username === savedUser.username);
      if (userData && userData.quizProgress) {
        const progressForThisQuiz = userData.quizProgress.find((q) => q.idQuiz === quizData.id);
        if (progressForThisQuiz) {
          setQuizProgress(progressForThisQuiz.progress);
          setCurrentIndex(progressForThisQuiz.progress.length);
          setTimeLeft(progressForThisQuiz.timeLeft ?? 120);
        }
      }
    }
  }, [quizData.id]);

  useEffect(() => {
    if (quizData && quizData.quiz && quizData.quiz.length > 0) {
      const item = quizData.quiz[currentIndex];
      const allAnswers = shuffleArray([item.correct_answer, ...item.incorrect_answers]);
      setShuffledAnswers(allAnswers);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setHasChecked(false);
    }
  }, [currentIndex, quizData]);

  useEffect(() => {
    if (isFinish) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;

        const savedUserStr = localStorage.getItem("loggedUser");
        const registeredUsersStr = localStorage.getItem("registeredUsers");
        if (savedUserStr && registeredUsersStr) {
          const savedUser = JSON.parse(savedUserStr);
          const registeredUsers = JSON.parse(registeredUsersStr);
          const userIndex = registeredUsers.findIndex((u) => u.username === savedUser.username);
          if (userIndex >= 0) {
            const quizIndex = registeredUsers[userIndex].quizProgress.findIndex((q) => q.idQuiz === quizData.id);
            if (quizIndex >= 0) {
              registeredUsers[userIndex].quizProgress[quizIndex].timeLeft = newTime;
              localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            }
          }
        }

        if (newTime <= 0) {
          clearInterval(interval);
          handleFinishByTimeout();
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinish, quizData.id]);

  const handleCheck = () => {
    if (selectedAnswer === null) return alert("Pilih jawaban dulu!");

    const item = quizData.quiz[currentIndex];
    const correct = selectedAnswer === item.correct_answer;

    const newEntry = {
      question: item.question,
      selectedAnswer,
      isCorrect: correct,
    };

    const updatedProgress = [...quizProgress, newEntry];
    setQuizProgress(updatedProgress);

    const savedUserStr = localStorage.getItem("loggedUser");
    const registeredUsersStr = localStorage.getItem("registeredUsers");

    if (savedUserStr && registeredUsersStr) {
      const savedUser = JSON.parse(savedUserStr);
      const registeredUsers = JSON.parse(registeredUsersStr);
      const userIndex = registeredUsers.findIndex((u) => u.username === savedUser.username);

      if (userIndex >= 0) {
        const quizIndex = registeredUsers[userIndex].quizProgress.findIndex((q) => q.idQuiz === quizData.id);

        const quizProgressEntry = {
          idQuiz: quizData.id,
          progress: updatedProgress,
          timeLeft: timeLeft,
        };

        if (quizIndex >= 0) {
          registeredUsers[userIndex].quizProgress[quizIndex] = quizProgressEntry;
        } else {
          registeredUsers[userIndex].quizProgress.push(quizProgressEntry);
        }

        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      }
    }

    setIsCorrect(correct);
    setHasChecked(true);
  };

  const handleContinue = () => {
    if (currentIndex < quizData.quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinish(true);
    }
  };

  const handleFinish = () => {
    const savedUserStr = localStorage.getItem("loggedUser");
    const registeredUsersStr = localStorage.getItem("registeredUsers");

    if (savedUserStr && registeredUsersStr) {
      const savedUser = JSON.parse(savedUserStr);
      const registeredUsers = JSON.parse(registeredUsersStr);
      const userIndex = registeredUsers.findIndex((u) => u.username === savedUser.username);

      if (userIndex >= 0) {
        registeredUsers[userIndex].quizProgress = registeredUsers[userIndex].quizProgress.filter(
          (q) => q.idQuiz !== quizData.id
        );
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      }
    }

    navigate(-1);
  };

  const handleFinishByTimeout = () => {
    setIsFinish(true);
  };

  const getResult = () => {
    const correctCount = quizProgress.filter((entry) => entry.isCorrect).length;
    const wrongCount = quizProgress.filter((entry) => entry.selectedAnswer !== null && !entry.isCorrect).length;
    const unanswered = quizData.quiz.length - quizProgress.length;
    return { correctCount, wrongCount, unanswered };
  };

  if (!quizData || !quizData.quiz || quizData.quiz.length === 0) {
    return <div>Tidak ada quiz</div>;
  }

  const item = quizData.quiz[currentIndex];
  const result = getResult();

  return (
    <div className="flex h-full flex-col gap-y-2">
      <div className="inline-flex w-full items-center justify-between rounded-md bg-white p-4">
        <div className='inline-flex items-center gap-x-2'>
          <Button onClick={() => navigate(-1)} variant="link" shape="round" icon={<LeftOutlined />} color="primary" />
          <Typography.Title level={5} style={{ margin: 0 }}>
            Quiz - Quiz Name
          </Typography.Title>
        </div>
        <div className='inline-flex items-center gap-x-2'>
          <ClockCircleOutlined />
          <span>{timeLeft}s</span>
        </div>
      </div>
      {!isFinish ? (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-12 overflow-y-auto rounded-lg bg-white p-4">
            <Typography.Title level={3}>{item.question}</Typography.Title>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              {shuffledAnswers.map((answer, i) => {
                const isSelected = selectedAnswer === answer;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={hasChecked}
                    onClick={() => setSelectedAnswer(answer)}
                    aria-pressed={isSelected}
                    className={`flex h-20 w-80 items-center justify-center rounded-lg border px-4 py-2 transition duration-200 ease-in-out focus:outline-none ${isSelected ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'} ${hasChecked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <Typography.Title level={5} className="!m-0 text-center">
                      {answer}
                    </Typography.Title>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`flex flex-col lg:flex-row w-full items-center justify-center gap-y-6 lg:justify-between gap-x-2 rounded-md p-6 ${isCorrect === null ? 'bg-white text-black' : isCorrect ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'} `}>
            {hasChecked && (
              <div className="flex items-center gap-x-2">
                {/* <ExclamationCircleOutlined className={`${isCorrect ? 'text-blue-500' : 'text-red-500'} text-lg`} /> */}
                <Typography.Title level={4} style={{ color: isCorrect ? '#3B82F6' : '#EF4444', margin: 0 }}>
                  {isCorrect ? 'Yey Jawaban Kamu Benar' : 'Ops Jawaban Kamu Salah'}
                </Typography.Title>
              </div>
            )}
            {!hasChecked ? (
              <Button size="large" type="primary" className="lg:ml-auto px-12" onClick={handleCheck} disabled={selectedAnswer === null}>
                Check
              </Button>
            ) : (
              <Button size="large" type="primary" className="lg:ml-auto px-12" onClick={handleContinue}>
                Lanjut
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-6 overflow-y-auto rounded-lg bg-white p-4">
            <Typography.Title level={3}>Quiz Selesai</Typography.Title>

            <div className="text-center">
              <Typography.Text strong className="block text-lg">
                Jawaban Benar: {result.correctCount}
              </Typography.Text>
              <Typography.Text strong className="block text-lg text-red-500">
                Jawaban Salah: {result.wrongCount}
              </Typography.Text>
              <Typography.Text strong className="block text-lg text-red-500">
                Pertanyaan Tidak Dijawab: {result.unanswered}
              </Typography.Text>
            </div>
          </div>

          <div className="inline-flex w-full items-center justify-end gap-x-2 rounded-md bg-white p-6">
            <Button size="large" type="primary" className="px-12" onClick={handleFinish}>
              Kembali
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

QuizRunner.propTypes = {
  quizData: PropTypes.object.isRequired
};

export default QuizRunner;
