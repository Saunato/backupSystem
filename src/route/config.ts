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
    key: '/servers',
    title: 'servers',
    page: Pages.Servers
  },
  {
    key: '/backupFiles',
    title: 'backupFiles',
    page: Pages.BackupFiles
  },
  {
    key: '/tracing',
    title: 'tracing',
    page: Pages.Tracing
  }
]