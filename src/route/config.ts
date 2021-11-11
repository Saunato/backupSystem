import Pages from '../page';

export const routeConfig = [
  {
    key: '/',
    title: 'home',
    page: Pages.Home
  },
  {
    key: '/home',
    title: 'home',
    page: Pages.Home
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