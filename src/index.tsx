import Plugin from './plugin';
import { icon } from './icon';
import data from './data';

export default function pluginEntry(config?: any) {
  return {
    name: '@mybricks/plugins/dataSet',
    title: '数据集',
    description: '数据集DEMO',
    data, // 用于保存插件数据
    contributes: {
      sliderView: {
        tab: {
          title: '数据集',
          icon: icon,
          apiSet: ['connector'],  // 注入设计器的API，此处的connector用于创建、更新连接器条目
          render(args: any) {
            // @ts-ignore
            return <Plugin {...config} {...args} />;
          },
        },
      },
    },
  };
}

