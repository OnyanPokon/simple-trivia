import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Index = () => {
  return (
    <div className="grid w-full grid-cols-6">
      <Tooltip title="Buat Quiz Baru">
        <div className="col-span-1 flex h-52 w-full items-center justify-center rounded-lg bg-white">
          <PlusOutlined className="text-4xl font-bold text-blue-500" />
        </div>
      </Tooltip>
    </div>
  );
};

export default Index;
