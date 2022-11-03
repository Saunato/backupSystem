import Pages from '../page';

export const routeConfig = [
  {
    key: '/',
    title: 'login',
    page: Pages.Login
  },
  {
    key: '/login',
    title: 'login',
    page: Pages.Login
  },
  {
    key: '/example',
    title: 'example',
    page: Pages.Example
  },
  {
    key: '/singlepredict',
    title: 'singlepredict',
    page: Pages.SinglePredict
  },
  {
    key: '/batchpredict',
    title: 'batchpredict',
    page: Pages.BatchPredict
  }
]