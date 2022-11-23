# plugin-bi-demo

## 使用

```typescript
import React from 'react';
import Designer from '@mybricks/designer-spa';
import Plugin from '@xxx/plugin-bi-demo'; // 插件发布后的包名

export default function MyDesigner() {
  return (
    <Designer
      config={{
        plugins: [Plugin()],
        comLibLoader() {},
        pageContentLoader() {},
        com: {},
      }}
    />
  );
}
```

## 插件操作步骤

1. 选择数据集和字段
   ![image](https://github.com/mybricks/plugin-bi-demo/blob/main/assets/01chose_field.gif)
2. 使用连接器将上一步筛选的数据给到图表
   ![image](https://github.com/mybricks/plugin-bi-demo/blob/main/assets/02fetch_data.gif)
