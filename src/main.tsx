import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_CONFIG, routes } from './routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo.ts';
import UserInfo from './containers/components/UserInfo/index.tsx';
import Layout from './Layout/index.tsx';
import Login from './containers/Login/index.tsx';
import Register from './containers/Register/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              {routes.map((item) => (
                <Route
                  path={item.path}
                  key={item.key}
                  element={item.element()}
                />
              ))}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
