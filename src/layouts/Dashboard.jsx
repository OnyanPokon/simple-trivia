import { Avatar, Button, Dropdown, Layout, Space, theme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { DashboardFooter, DashboardSider } from '@/components';
import { Content, Header } from 'antd/es/layout/layout';
import { useAuth } from '@/hooks';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { loggedUser, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (loggedUser) return;
    navigate(`/login?redirect=${pathname}`);
  }, [navigate, loggedUser, pathname]);

  const items = useMemo(
    () => [
      {
        key: '2',
        label: (
          <button onClick={logout} className="text-color-danger-500 flex min-w-32 items-center gap-x-2">
            <LogoutOutlined />
            Logout
          </button>
        )
      }
    ],
    [logout]
  );

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout className="min-h-screen font-sans">
      <DashboardSider collapsed={collapsed} onCloseMenu={() => setCollapsed(true)} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        >
          <div className="flex h-full w-full items-center justify-between px-4">
            <Button type="text" icon={<MenuOutlined />} onClick={() => setCollapsed(!collapsed)} color="default"></Button>
            <div className="flex items-center gap-x-2">
              <>
                <span>Hai</span>

                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Avatar className="bg-color-primary-100 text-color-primary-500 font-semibold">U</Avatar>
                    </Space>
                  </a>
                </Dropdown>
              </>
            </div>
          </div>
        </Header>

        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>

        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
