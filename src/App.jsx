import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { postAuth } from './api'
import Navbar from './components/Navbar'
import NavbarProvider from './context/NavbarContext'
import Loading from './pages/Loading'

const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const TopGames = lazy(() => import('./pages/TopGames'))

export default function App () {
  useEffect(() => {
    postAuth('/token')
      .then((data) => {
        localStorage.setItem('token', data.access_token)
        console.log(data.access_token)
      })
  }, [])

  return (
    <div className='App bg-slate-900 min-h-screen text-white flex items-center flex-col w-full'>
      <Router>
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/top-games' element={<TopGames />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}
