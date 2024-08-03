import './App.css';
import MainLayout from './Layouts/MainLayout.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx';
import Products from './components/Products/Products.jsx';
import ProductsDetails from './components/ProductsDetails/ProductsDetails.jsx';

function App() {
  let routes = createBrowserRouter([
    {
      path: '',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "products", element: <Products /> },
        { path: "category", element: <HomePage /> },
        { path: "product-details/:id", element: <ProductsDetails /> },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App;
