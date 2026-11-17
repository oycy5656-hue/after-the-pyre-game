import { useEffect, useMemo, useState } from 'react'
import { CODEX, CODEX_CATEGORIES } from '../data/codex.js'

export default function Archive() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const [showSpoilers, setShowSpoilers] = useState(false)
  const [activeId, setActiveId] = useState(null)

  const active = CODEX.find((entry) => entry.id === activeId)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  const counts = useMemo(() => {
    const map = { 全部: CODEX.length }
    CODEX.forEach((entry) => {
      map[entry.category] = (map[entry.category] || 0) + 1
    })
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CODEX.filter((entry) => {
      const categoryOk = category === '全部' || entry.category === category
      const spoilerOk = showSpoilers || !entry.spoiler
      const queryOk =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.body.join('').toLowerCase().includes(q)
      return categoryOk && spoilerOk && queryOk
    })
  }, [category, query, showSpoilers])

  return (
    <>
      <section className="page-hero page-hero--archive">
        <div className="container">
          <p className="eyebrow">ARCHIVE · 灰湾档案</p>
          <div className="page-hero__title-row">
            <h1>
              档案<span className="page-hero__dot">.</span>
            </h1>
            <p>
              四十七年，四万多个名字。
              <br />
              有些人被写进了档案，有些人只被写在门板上。
            </p>
          </div>
          <div className="page-hero__meta">
            <span>共 {CODEX.length} 条记录</span>
            <span>最后更新 · 灰潮 47 年</span>
            <span>保管人 · 沈砚</span>
          </div>
        </div>
      </section>

      <section className="archive-page section">
        <div className="container">
          <div className="archive-toolbar">
            <div className="archive-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索地名、人物、术语……"
                aria-label="搜索档案"
              />
            </div>
            <div className="archive-tabs">
              {CODEX_CATEGORIES.map((item) => (
                <button
                  key={item}
                  className={`archive-tab ${category === item ? 'is-active' : ''}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  <small>{counts[item] || 0}</small>
                </button>
              ))}
            </div>
            <label className="spoiler-toggle">
              <input
                type="checkbox"
                checked={showSpoilers}
                onChange={(event) => setShowSpoilers(event.target.checked)}
              />
              <span className="spoiler-toggle__track" aria-hidden="true">
                <i />
              </span>
              <span>显示剧透档案</span>
            </label>
          </div>

          <div className="archive-meta">
            <p>
              {filtered.length} 条记录
              {!showSpoilers && <span> · 已隐藏含后期剧情的档案</span>}
            </p>
            <p className="archive-meta__hint">点击任意档案，展开全文。</p>
          </div>

          <div className="archive-grid">
            {filtered.map((entry, index) => (
              <button
                key={entry.id}
                className={`archive-card ${entry.spoiler ? 'is-spoiler' : ''}`}
                onClick={() => setActiveId(entry.id)}
                style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
              >
                <div className="archive-card__top">
                  <span>{entry.category}</span>
                  {entry.spoiler && <em>剧透</em>}
                </div>
                <h3>{entry.title}</h3>
                <p className="archive-card__subtitle">{entry.subtitle}</p>
                <p className="archive-card__summary">{entry.summary}</p>
                <span className="archive-card__more">展开全文 ↗</span>
              </button>
            ))}
            {!filtered.length && (
              <div className="empty-state">
                <p>没有找到对应的档案。</p>
                <span>试试别的关键词，或者打开剧透档案。</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {active && (
        <div className="archive-detail-backdrop" role="dialog" aria-modal="true" aria-label={active.title}>
          <article className="archive-detail">
            <button className="archive-detail__close" onClick={() => setActiveId(null)} aria-label="关闭">
              ✕
            </button>
            <p className="eyebrow">
              {active.category} · {active.spoiler ? '后期档案' : '公开档案'}
            </p>
            <h2>{active.title}</h2>
            <p className="archive-detail__subtitle">{active.subtitle}</p>
            <div className="rule rule--short" />
            {active.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="archive-detail__foot">
              <span>灰湾档案 · 第 {String(CODEX.findIndex((entry) => entry.id === active.id) + 1).padStart(3, '0')} 号</span>
              <button className="text-button" onClick={() => setActiveId(null)}>
                关闭档案
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  )
}
