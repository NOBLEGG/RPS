// 애플리케이션의 진입점으로, 리액트 최상위 컴포넌트를 DOM에 mounting

import React from 'react';
import ReactDOM from 'react-dom';

import 'index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import Root from 'containers/Root';

ReactDOM.render(<Root />, document.getElementById('root'));
