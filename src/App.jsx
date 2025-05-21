import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { authLink, dashboardLink, landingLink } from './data/link';
import { AuthLayout, DashboardLayout, LandingLayout } from './layouts';
import { RunQuiz } from './pages/dashboard';

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <LandingLayout />,
          children: [
            ...landingLink.map(({ path, element: Element }) => ({
              path,
              element: <Element />
            }))
          ]
        },
        {
          element: <DashboardLayout />,
          children: [
            ...dashboardLink.flatMap(({ children }) =>
              children.map(({ path, element: Element }) => {
                return {
                  path,
                  element: <Element />
                };
              })
            ),
            { path: '/my_quiz/run/:id', element: <RunQuiz /> }
          ]
        },
        {
          element: <AuthLayout />,
          children: authLink.map(({ path, element: Element }) => ({
            path,
            element: <Element />
          }))
        }
      ])}
    />
  );
}

export default App;
