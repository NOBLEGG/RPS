// Redux 스토어를 생성하는 함수를 만들어 모듈화

import { createStore } from 'redux';
import modules from 'store/modules';

const configure = () => {
  const store = createStore(modules);
  return store;
}

export default configure;