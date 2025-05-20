import { Reveal } from '@/components';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Boom = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen w-full bg-white">
      <div className="relative z-10 mx-auto flex h-full max-w-screen-sm flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <Typography.Title>
            Open Trivia <span className="text-blue-500">Quiz</span>
          </Typography.Title>
        </Reveal>
        <Reveal>
          <div className="flex items-center justify-center">
            <small className="text-center">Hai! Siap menguji seberapa luas pengetahuan umummu? Yuk, mainkan kuis-kuis seru di sini!</small>
          </div>
        </Reveal>
        <Button onClick={() => navigate('/login')} className="mt-4" color="primary" variant="solid" size="large">
          Mainkan Quiz
        </Button>
      </div>
      <img src="/illustration/city_sillhoute.png" className="absolute bottom-0 left-0 z-0 w-full" />
    </section>
  );
};

export default Boom;
