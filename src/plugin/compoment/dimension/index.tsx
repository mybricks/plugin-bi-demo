import css from './index.less';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { plus, remove, edit } from '../../../icon';
import data from '../../../constant';
import { Item } from '../../../interface';

function Dimension ({ value: id, onChange }: any) {
  const [dimensions, set] = useState<Item[]>(data[id].dimension);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const add = useCallback(() => {
    setVisible(true);
  }, []);

  const addDimension = useCallback(async () => {
    const item = await form.validateFields();
    set((list) => [...list, item]);
    setVisible(false);
  }, []);

  const onEdit = useCallback((item: Item) => {
    form.setFieldsValue(item);
    setVisible(true);
  }, []);

  useEffect(() => {
    set(data[id].dimension);
  }, [id]);

  const onDragStart = useCallback((ev: React.DragEvent, item: Item) => {
    ev.dataTransfer.setData("dimension", JSON.stringify(item));
    onChange && onChange({ isDragging: true });
  }, []);

  const onDragEnd = useCallback(() => {
    onChange({ isDragging: false });
  }, [])

  return (
    <div className={css.dimension}>
      <div className={css.header}>
        <div>维度</div>
        <div onClick={add}>{plus}</div>
      </div>
      <div>
        {dimensions.map((item) => (
          <div
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            onDragEnd={onDragEnd}
            className={css.item}
          >
            <div>{item.label}</div>
            <div>
              <span onClick={() => onEdit(item)}>{edit}</span>
              <span>{remove}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal
        width={360}
        title='维度编辑'
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={addDimension}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item name='label' label='名称'>
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item name='value' label='值'>
            <Input placeholder='请输入值' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(Dimension)