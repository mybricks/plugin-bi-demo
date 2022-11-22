import css from './index.less';
import React, { memo, useCallback } from 'react';
import { remove } from '../../../icon';
import Collapse from '../../../components/Collapse';

interface Item {
  label: string;
  value: string;
}

const axisList: Item[] = [
  { label: 'x轴', value: 'xAxis' },
  { label: 'y轴', value: 'yAxis' },
  { label: 'z轴', value: 'zAxis' },
];

function Axis({ data, onChange, isDragging }: any) {
  const onDrop = useCallback((ev: React.DragEvent, axis: string) => {
    ev.preventDefault();
    const dimension = ev.dataTransfer.getData('dimension');
    try {
      data.config[axis] = JSON.parse(dimension);
      onChange();
    } catch (error) {}
  }, []);

  const onDragOver = useCallback((ev: React.DragEvent) => {
    ev.preventDefault();
  }, []);

  const onRemove = useCallback((axis: string) => {
    Reflect.deleteProperty(data.config, axis);
    data.config = { ...data.config };
    onChange();
  }, []);

  return (
    <div className={css.axis}>
      <div className={css.title}>字段配置</div>
      {axisList.map(({ label, value }) => (
        <div onDrop={(e) => onDrop(e, value)} onDragOver={onDragOver}>
          <Collapse
            className={`${css.ct} ${isDragging ? css.drag : ''}`}
            header={label}
            defaultFold={false}
          >
            {data.config[value] ? (
              <div className={css.item}>
                <div>{data.config[value].label}</div>
                <span onClick={() => onRemove(value)}>{remove}</span>
              </div>
            ) : null}
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default memo(Axis)