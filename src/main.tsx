import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import { ROUTE_CONFIG } from './routes/index.ts'
import Page404 from './containers/Page404/index.tsx'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo.ts'
import UserInfo from './containers/components/UserInfo/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>

      <BrowserRouter>
        <UserInfo >
      <Routes>
        {ROUTE_CONFIG.map(item => <Route path={item.path} key={item.key} element={<item.element/>}  />)}
        {/* <Route path='/login' element={<Login/>}></Route> */}
        <Route path='*' element={<Page404/>}></Route>
        </Routes>
      </UserInfo>
        </BrowserRouter>
     
</ApolloProvider>
  </StrictMode>,
)
