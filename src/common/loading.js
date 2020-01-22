import { Loading } from 'element-ui';
let loading; 
function startLoading() { // 使用Element loading.tart 方法
  loading = Loading.service({
    lock: true,
    text: 'loading……',
    background: 'rgba(0, 0, 0, 0.5)',
  });
}
function endLoading() { // 使用Element loading.close 方法
  loading.close();
}
//通过needLoadingCount来记录，在多个地方使用loading时候处理
let needLoadingCount = 0;
export function showLoading() {
	
  if (needLoadingCount === 0) {
	  console.log('showLoading')
    startLoading();
  }
  needLoadingCount++;//eslint-disable-line
}
export function tryHideLoading() {
  if (needLoadingCount >= 0) needLoadingCount--;//eslint-disable-line
  if (needLoadingCount === 0) {
	console.log('tryHideLoading')
    endLoading();
  }
}