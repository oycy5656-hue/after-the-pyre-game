import { useEffect, useState } from 'react'
import Emblem from './Emblem.jsx'

const LINKS = [
  { id: 'world', label: '世界', en: 'ATLAS' },
  { id: 'archive', label: '档案', en: 'ARCHIVE' },
  { id: 'about', label: '关于', en: 'ABOUT' },
]

export default function SiteHeader({ route, go }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [route])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navigate = (id) => {
    setMenuOpen(false)
    go(id)
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${route === 'home' ? 'is-home' : 'is-inner'}`}>
        <div className="site-header__inner">
          <button className="brand" onClick={() => navigate('home')} aria-label="返回首页">
            <span className="brand__mark">
              <Emblem type="flame" size={26} />
            </span>
            <span className="brand__text">
              <strong>葬火之后</strong>
              <small>AFTER THE PYRE</small>
            </span>
          </button>

          <nav className="site-nav" aria-label="主导航">
            {LINKS.map((link) => (
              <button
                key={link.id}
                className={`site-nav__link ${route === link.id ? 'is-active' : ''}`}
                onClick={() => navigate(link.id)}
              >
                <span>{link.label}</span>
                <small>{link.en}</small>
              </button>
            ))}
          </nav>

          <div className="site-header__actions">
            <span className="site-header__chapter">灰湾 · 047</span>
            <button className="button button--sm button--ember" onClick={() => navigate('play')}>
              <span>进入灰湾</span>
              <span aria-hidden="true">↗</span>
            </button>
            <button
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__inner">
          <p className="eyebrow">灰湾编年史 · 第一卷</p>
          <button className="mobile-menu__link" onClick={() => navigate('home')}>
            <span>首页</span>
            <small>HOME</small>
          </button>
          {LINKS.map((link) => (
            <button key={link.id} className="mobile-menu__link" onClick={() => navigate(link.id)}>
              <span>{link.label}</span>
              <small>{link.en}</small>
            </button>
          ))}
          <button className="mobile-menu__link mobile-menu__link--accent" onClick={() => navigate('play')}>
            <span>进入灰湾</span>
            <small>PLAY</small>
          </button>
          <p className="mobile-menu__warning">本作包含暴力、死亡、饥荒与宗教隐喻。建议十六岁以上阅读。</p>
        </div>
      </div>
    </>
  )
}
