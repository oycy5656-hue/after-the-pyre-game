import { useEffect, useState } from 'react'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import World from './pages/World.jsx'
import Archive from './pages/Archive.jsx'
import Play from './pages/Play.jsx'
import About from './pages/About.jsx'

const ROUTES = ['home', 'play', 'world', 'archive', 'about']

function readRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const route = hash.split('?')[0]
  return ROUTES.includes(route) ? route : 'home'
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (next) => {
    if (next === route) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = `/${next}`
  }

  return (
    <div className={`app app--${route}`}>
      <SiteHeader route={route} go={go} />
      <main>
        {route === 'home' && <Home go={go} />}
        {route === 'play' && <Play go={go} />}
        {route === 'world' && <World go={go} />}
        {route === 'archive' && <Archive />}
        {route === 'about' && <About />}
      </main>
      {route !== 'play' && <SiteFooter go={go} />}
    </div>
  )
}
