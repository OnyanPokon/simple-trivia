import * as Auth from '@/pages/auth';
import * as Dashboard from '@/pages/dashboard';
import * as Landing from '@/pages/landing';
import { DashboardOutlined, DatabaseOutlined } from '@ant-design/icons';

export const landingLink = [
  {
    label: 'Beranda',
    path: '/',
    element: Landing.Landing
  }
];

export const dashboardLink = [
  {
    label: 'Overview',
    icon: DashboardOutlined,
    children: [{ path: '/dashboard', label: 'Dashboard', element: Dashboard.Dashboard }]
  },
  {
    label: 'Quiz',
    icon: DatabaseOutlined,
    children: [
      { path: '/my_quiz', label: 'Quiz Saya', element: Dashboard.IndexMyQuiz },
      { path: '/create_quiz', label: 'Buat Quiz', element: Dashboard.IndexcCreateQuiz }
    ]
  }
];

export const authLink = [
  {
    path: '/login',
    element: Auth.Login
  }
];
