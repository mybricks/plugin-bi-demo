import React, { memo, useCallback } from 'react';
import { Select } from 'antd';
import css from './index.less';

const dataSet = [
  { label: '数据集1_202211182164', value: 'd1' },
  { label: '数据集2_202210101223', value: 'd2' },
  { label: '数据集3_202201012356', value: 'd3' },
];

function Header({ value, onChange }: any) {
  const onIdChange = useCallback(async (id: string) => {
    onChange(id);
  }, []);

  return (
    <div className={css.header}>
      <Select
        onChange={onIdChange}
        style={{ width: 220 }}
        size='small'
        value={value}
        options={dataSet}
        dropdownMatchSelectWidth
      />
    </div>
  );
}

export default memo(Header);
