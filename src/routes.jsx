import { lazy } from 'react';

// Lazy load the components for better performance
const Dashboard = lazy(() => import('./components/Dashboard'));
const Employees = lazy(() => import('./components/Employees'));
const Attendance = lazy(() => import('./components/Attendance'));
const Leave = lazy(() => import('./components/Leave'));
const Payroll = lazy(() => import('./components/Payroll'));
const Settings = lazy(() => import('./components/Settings'));

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/employees',
    name: 'Employees',
    element: <Employees />,
  },
  {
    path: '/attendance',
    name: 'Attendance',
    element: <Attendance />,
  },
  {
    path: '/leave',
    name: 'Leave Management',
    element: <Leave />,
  },
  {
    path: '/payroll',
    name: 'Payroll',
    element: <Payroll />,
  },
  {
    path: '/settings',
    name: 'Settings',
    element: <Settings />,
  },
  {
    path: '*',
    name: 'Not Found',
    element: <div>Page not found</div>,
  },
];

export default routes;
