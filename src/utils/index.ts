import { Config } from '../interface';

export function axis2schema (axis: Config) {
  const properties: any = {};
  Object.values(axis).forEach((item) => {
    properties[item.value] = { type: 'string'};
  })

  return {
    type: 'array',
    items: {
      type: 'object',
      properties
    }
  }
}
