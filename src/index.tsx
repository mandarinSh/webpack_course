import { Suspense } from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from '@/components/App/App';
import { LazyAbout } from '@/pages/about/About.lazy';
import { Shop } from '@/pages/shop';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/about',
        element: <Suspense fallback={'...loading'}><LazyAbout/></Suspense>
      },
      {
        path: '/shop',
        element: <Suspense fallback={'...loading'}><Shop/></Suspense> 
      }
    ]
  },
]);

container.render(<RouterProvider router={router} />);
