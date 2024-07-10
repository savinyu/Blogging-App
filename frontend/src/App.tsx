import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup.tsx';
import Signin from './Pages/Signin.tsx';
import Blog from './Pages/Blog.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Signin/>} path='/signin' />
        <Route element={<Signup/>} path='/signup' />
        <Route element={<Blog/>} path='/blog' />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
