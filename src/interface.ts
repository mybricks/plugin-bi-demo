export interface Item {
  label: string;
  value: string;
}

export interface Config {
  xAXis: Item;
  yAXis: Item;
  zAXis: Item;
}

// data中存储的数据结构没有限制
// 此处表示当前demo中只有config字段
export interface Data {
  config: Config
}