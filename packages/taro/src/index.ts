import { taroCompiler } from '@iconpark-taro-vue3/core';

taroCompiler()
  .then(() => {
    console.log('编译完成');
  })
  .catch(e => {
    console.error('编译出错: \t', e);
  });
