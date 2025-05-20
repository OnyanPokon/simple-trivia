import { Footer as AntdFooter } from 'antd/es/layout/layout';

const Footer = () => {
  return (
    <AntdFooter style={{ textAlign: 'center' }}>
      <div>
        Quiz ©{new Date().getFullYear()} Created by <a href="">Rafiq.D</a>
      </div>
    </AntdFooter>
  );
};

export default Footer;
