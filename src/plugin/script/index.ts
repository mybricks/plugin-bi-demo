// @ts-nocheck
function getScript(dataSource, config) {
  const axisKeys = Object.values(config).map((item) => item.value);

  const result = dataSource.map((item) =>
    axisKeys.reduce((obj, key) => {
      obj[key] = item[key];
      return obj;
    }, {})
  );

  // 连接器运行时的脚本示例
  // params表示搭建时通过连线传入的接口入参
  // then表示成功的回调
  // onError表示失败的回调
  // config表示应用中传入的配置，比如ajax方法
  function fetch(params, { then, onError }, config) {
    return Promise.resolve(__data__)
      .then((res) => {
        then(res);
      })
      .catch((error) => {
        onError(error);
      });
  }

  return encodeURIComponent(
    fetch.toString().replace('__data__', JSON.stringify(result))
  );
}

export { getScript };
