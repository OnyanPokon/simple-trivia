import { Outlet } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex h-dvh flex-col font-sans">
      <main className="flex-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Landing;
