import { useEffect, useMemo, useState } from 'react'
import { CODEX_CATEGORIES } from '../data/codex.js'

export default function CodexModal({ entries, onClose, title = '灰湾档案' }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter((entry) => {
      const categoryOk = category === '全部' || entry.category === category
      const queryOk =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.body.join('').toLowerCase().includes(q)
      return categoryOk && queryOk
    })
  }, [entries, category, query])

  const active = entries.find((entry) => entry.id === activeId)

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="codex-modal">
        <div className="codex-modal__head">
          <div>
            <p className="eyebrow">ARCHIVE · {entries.length} ENTRIES</p>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="关闭档案">
            ✕
          </button>
        </div>

        {active ? (
          <div className="codex-detail">
            <button className="text-button" onClick={() => setActiveId(null)}>
              ← 返回档案列表
            </button>
            <p className="eyebrow">{active.category}</p>
            <h3>{active.title}</h3>
            <p className="codex-detail__subtitle">{active.subtitle}</p>
            <div className="rule rule--short" />
            {active.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {active.spoiler && <p className="codex-detail__spoiler">含后期剧情信息</p>}
          </div>
        ) : (
          <>
            <div className="codex-toolbar">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索档案……"
                aria-label="搜索档案"
              />
              <div className="codex-tabs">
                {CODEX_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    className={`codex-tab ${category === item ? 'is-active' : ''}`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="codex-grid">
              {filtered.map((entry) => (
                <button key={entry.id} className="codex-card" onClick={() => setActiveId(entry.id)}>
                  <span className="codex-card__category">{entry.category}</span>
                  <strong>{entry.title}</strong>
                  <span>{entry.summary}</span>
                </button>
              ))}
              {!filtered.length && <p className="empty-state">没有找到对应的档案。</p>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
