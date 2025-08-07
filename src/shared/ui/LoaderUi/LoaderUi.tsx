import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const LoaderUi = () => {
   return (
      <div className='df jcc aic'>
         <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
      </div>
   );
};