import React, { useCallback, useState } from 'react';
import Header from './compoment/header';
import Dimension from './compoment/dimension';
import Axis from './compoment/axis';
import mockData from '../constant';
import { getScript } from './script';
import { axis2schema } from '../utils';
import { Data } from '../interface';
import css from './index.less';

interface Connector {
  id: string | number;
  type: string;
  title: string;
  inputSchema: any;
  outputSchema: any;
  script: string;
}

interface Props {
  connector: {
    add: (params: Connector) => void;
    update: (params: Connector) => void;
    remove: (id: string | number) => void;
  };
  data: Data;
}

export default function Plugin(props: Props) {
  // connector通过在入口文件的apiSet中申明，由设计器注入
  // data在入口文件中进行申明，用于存储插件产生的数据，非必须
  const { connector, data } = props;
  const [isDragging, setDrag] = useState(false);

  const [id, setId] = useState('d1');
  const onDatasetChange = useCallback((id: string) => {
    updateConnector(id);
    setId(id);
  }, []);

  const updateConnector = useCallback((id = 'id1') => {
    const item: Connector = {
      id,
      type: 'http',
      title: '图表数据源',
      inputSchema: { type: 'object' },
      outputSchema: axis2schema(data.config),
      // 连接器组件runtime需要的脚本，点击方法名查看定义详情
      script: getScript(mockData[id].dataSource, data.config),
    };
    try {
      // 更新连接器条目
      connector.update(item);
    } catch (error) {
      // 向连接器中增加条目
      connector.add(item);
    }
  }, []);

  const onAxisChange = useCallback(() => {
    updateConnector(id);
  }, [id]);

  const onDimensionChange = useCallback(
    ({ isDragging }: { isDragging: boolean }) => {
      setDrag(isDragging);
    },
    []
  );
  return (
    <div className={css.ct}>
      <div className={css.left}>
        <Header value={id} onChange={onDatasetChange} />
        <Dimension value={id} onChange={onDimensionChange} />
      </div>
      <div className={css.right}>
        <Axis data={data} onChange={onAxisChange} isDragging={isDragging} />
      </div>
    </div>
  );
}
