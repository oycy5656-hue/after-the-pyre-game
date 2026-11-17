import { useEffect, useMemo, useState } from 'react'
import DiceModal from '../components/DiceModal.jsx'
import CodexModal from '../components/CodexModal.jsx'
import Emblem from '../components/Emblem.jsx'
import {
  COMPANION_NAMES,
  choiceAvailability,
  choose,
  describeRequirement,
  finishCheck,
  getActProgress,
  getCheckChance,
  getCodexProgress,
  getCompanion,
  getDifficulty,
  getEnding,
  getNode,
  getOrigin,
  getVisibleCodex,
  performCheck,
  startRun,
} from '../game/engine.js'
import { STORY } from '../data/story.js'
import { DIFFICULTIES, ORIGINS, STATS } from '../data/world.js'
import {
  clearAuto,
  deleteSlot,
  loadAuto,
  loadEndings,
  loadSettings,
  loadSlots,
  recordEnding,
  saveAuto,
  saveSettings,
  saveSlot,
} from '../game/storage.js'

const ORIGIN_NAMES = Object.fromEntries(ORIGINS.map((origin) => [origin.id, origin.name]))

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}

function StatDots({ value, max = 6 }) {
  return (
    <span className="stat-dots" aria-label={`${value} / ${max}`}>
      {Array.from({ length: max }).map((_, index) => (
        <i key={index} className={index < value ? 'is-filled' : ''} />
      ))}
    </span>
  )
}

function ResourceBar({ label, value, max, tone = 'ember' }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={`resource-bar resource-bar--${tone}`}>
      <div className="resource-bar__label">
        <span>{label}</span>
        <strong>
          {value} / {max}
        </strong>
      </div>
      <div className="resource-bar__track">
        <i style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

function Setup({ onStart, onBack, hasSaved }) {
  const [name, setName] = useState('')
  const [originId, setOriginId] = useState(ORIGINS[0].id)
  const [difficultyId, setDifficultyId] = useState('standard')
  const origin = ORIGINS.find((item) => item.id === originId)
  const canStart = name.trim().length > 0

  return (
    <div className="setup">
      <div className="container setup__inner">
        <div className="setup__top">
          <button className="text-button" onClick={onBack}>
            ← 返回
          </button>
          <p className="eyebrow">NEW JOURNEY · 新的旅程</p>
        </div>

        <div className="setup__head">
          <h1>
            在被灰埋掉之前，
            <br />
            先告诉我们<span>你是谁。</span>
          </h1>
          <p>
            出身不会决定你的结局，但它会决定你一开始能看见什么、相信什么，以及别人愿不愿意把枪放下。
          </p>
        </div>

        <div className="setup__name">
          <label htmlFor="player-name">你的名字</label>
          <input
            id="player-name"
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, 12))}
            placeholder="灰湾的人会用它叫你"
            autoComplete="off"
          />
          <div className="setup__name-hints">
            <span>或者：</span>
            {['言烬', '沈渡', '阿灯'].map((suggestion) => (
              <button key={suggestion} onClick={() => setName(suggestion)}>
                {suggestion}
              </button>
            ))}
            <span className="setup__name-count">{name.length}/12</span>
          </div>
        </div>

        <div className="setup__section-head">
          <p className="section-index">01 / 出身</p>
          <p>四种出身，四种看灰湾的方式。</p>
        </div>
        <div className="origin-grid">
          {ORIGINS.map((item) => (
            <button
              key={item.id}
              className={`origin-card ${originId === item.id ? 'is-active' : ''}`}
              onClick={() => setOriginId(item.id)}
              aria-pressed={originId === item.id}
            >
              <div className="origin-card__top">
                <span>{item.english}</span>
                <i className="radio-dot" />
              </div>
              <h3>{item.name}</h3>
              <p className="origin-card__epithet">{item.epithet}</p>
              <p className="origin-card__desc">{item.desc}</p>
              <div className="origin-card__stats">
                {Object.entries(STATS).map(([key, stat]) => (
                  <div key={key}>
                    <span>{stat.name}</span>
                    <StatDots value={item.stats[key]} />
                  </div>
                ))}
              </div>
              <div className="origin-card__items">
                {item.items.map((itemName) => (
                  <span key={itemName}>{itemName}</span>
                ))}
              </div>
              <p className="origin-card__quote">“{item.quote}”</p>
            </button>
          ))}
        </div>

        <div className="setup__section-head">
          <p className="section-index">02 / 难度</p>
          <p>骰子不会因为你害怕就停下来。</p>
        </div>
        <div className="difficulty-grid">
          {DIFFICULTIES.map((item) => (
            <button
              key={item.id}
              className={`difficulty-card ${difficultyId === item.id ? 'is-active' : ''}`}
              onClick={() => setDifficultyId(item.id)}
              aria-pressed={difficultyId === item.id}
            >
              <div className="difficulty-card__top">
                <strong>{item.name}</strong>
                <i className="radio-dot" />
              </div>
              <p>{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="setup__summary">
          <div>
            <span>你将扮演</span>
            <strong>{name.trim() || '一个还没有名字的人'}</strong>
          </div>
          <div>
            <span>出身</span>
            <strong>{origin?.name}</strong>
          </div>
          <div>
            <span>难度</span>
            <strong>{DIFFICULTIES.find((item) => item.id === difficultyId)?.name}</strong>
          </div>
          <button
            className="button button--ember button--lg"
            disabled={!canStart}
            onClick={() => onStart({ name, originId, difficultyId })}
          >
            <span>推开三号闸门</span>
            <span className="button__arrow" aria-hidden="true">↗</span>
          </button>
        </div>
        {!canStart && <p className="setup__hint">先给自己起一个名字。或者点一个上面的名字。</p>}
        {hasSaved && <p className="setup__hint">开始新旅程会覆盖现有的自动存档。</p>}
      </div>
    </div>
  )
}

function EndingView({ state, onRestart, onArchive, onHome, go }) {
  const ending = getEnding(state.ending)
  const origin = getOrigin(state.originId)
  const codex = getCodexProgress(state)
  const [endingCount, setEndingCount] = useState(() => loadEndings().length)

  useEffect(() => {
    recordEnding(state.ending)
    setEndingCount(loadEndings().length)
  }, [state.ending])

  return (
    <div className={`ending-view ending-view--${ending.tone}`}>
      <div className="ending-view__glow" aria-hidden="true" />
      <div className="container ending-view__inner">
        <div className="ending-view__head">
          <p className="eyebrow">ENDING {ending.code} · {ending.tone}</p>
          <span className="ending-view__english">{ending.english}</span>
        </div>
        <h1>{ending.title}</h1>
        <p className="ending-view__quote">“{ending.quote}”</p>
        <div className="ending-view__rule" />
        <div className="ending-view__body">
          {ending.body.map((paragraph, index) => (
            <p key={index} style={{ animationDelay: `${index * 90}ms` }}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="ending-view__aftermath">
          <span>此后</span>
          <p>{ending.aftermath}</p>
        </div>

        <div className="ending-view__stats">
          <div>
            <span>记录</span>
            <strong>{state.name}</strong>
          </div>
          <div>
            <span>出身</span>
            <strong>{origin.name}</strong>
          </div>
          <div>
            <span>节点</span>
            <strong>{state.turns}</strong>
          </div>
          <div>
            <span>档案</span>
            <strong>{codex.unlocked} / {codex.total}</strong>
          </div>
          <div>
            <span>声望</span>
            <strong>{state.rep}</strong>
          </div>
        </div>

        <div className="ending-view__actions">
          <button className="button button--ember" onClick={onRestart}>
            再走一次
          </button>
          <button className="button button--ghost" onClick={onArchive}>
            查看已解锁档案
          </button>
          <button className="button button--ghost" onClick={onHome}>
            回到首页
          </button>
        </div>
        <p className="ending-view__note">
          {endingCount >= 7
            ? '这台设备已经记录了全部七种结局。'
            : `还有 ${7 - endingCount} 种结局没有在这台设备上留下记录。`}
        </p>
      </div>
    </div>
  )
}

export default function Play({ go }) {
  const [state, setState] = useState(null)
  const [view, setView] = useState('menu')
  const [saved, setSaved] = useState(() => loadAuto())
  const [pending, setPending] = useState(null)
  const [modal, setModal] = useState(null)
  const [slots, setSlots] = useState([])
  const [settings, setSettings] = useState(() => loadSettings())
  const [toast, setToast] = useState('')
  const [savedEndings, setSavedEndings] = useState(() => loadEndings())

  const node = state ? getNode(state) : null
  const origin = state ? getOrigin(state.originId) : null
  const companion = state ? getCompanion(state) : null
  const codex = state ? getCodexProgress(state) : null
  const actProgress = state ? getActProgress(state) : null
  const visibleCodex = state ? getVisibleCodex(state) : []

  useEffect(() => {
    document.documentElement.dataset.textSize = settings.textSize
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion)
    saveSettings(settings)
  }, [settings])

  useEffect(() => {
    if (!state) return
    saveAuto(state)
    setSaved(state)
    if (state.ending) {
      recordEnding(state.ending)
      setSavedEndings(loadEndings())
    }
  }, [state])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (state) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state?.nodeId])

  useEffect(() => {
    if (!state || view !== 'game' || pending || modal) return
    const onKey = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      const index = Number.parseInt(event.key, 10)
      if (!Number.isInteger(index) || index < 1) return
      const choice = node?.choices?.[index - 1]
      if (!choice) return
      if (!choiceAvailability(state, choice).ok) return
      event.preventDefault()
      handleChoice(choice)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, view, pending, modal, node])

  const handleStart = (config) => {
    const next = startRun(config)
    setState(next)
    setSaved(next)
    setView('game')
  }

  const handleContinue = () => {
    if (!saved) return
    setState(saved)
    setView(saved.ending ? 'game' : 'game')
  }

  const handleChoice = (choice) => {
    const result = choose(state, choice)
    if (result.error) {
      setToast(result.error)
      return
    }
    if (result.pending) {
      setPending(result.pending)
      return
    }
    if (result.state) {
      setState(result.state)
    }
  }

  const handleRoll = () => {
    if (!pending) return null
    return performCheck(pending.state, pending)
  }

  const handleCheckContinue = (outcome) => {
    const next = finishCheck(outcome)
    setState(next)
    setPending(null)
  }

  const openSaves = () => {
    setSlots(loadSlots())
    setModal('save')
  }

  const handleSaveSlot = (index) => {
    if (!state) return
    saveSlot(index, state)
    setSlots(loadSlots())
    setToast(`已写入存档 ${index + 1}`)
  }

  const handleLoadSlot = (index) => {
    const slot = slots[index]
    if (!slot) return
    setState(slot)
    setSaved(slot)
    setModal(null)
    setView('game')
    setToast('已读取存档')
  }

  const handleDeleteSlot = (index) => {
    deleteSlot(index)
    setSlots(loadSlots())
    setToast(`已删除存档 ${index + 1}`)
  }

  const restart = () => {
    if (state && !window.confirm('确定要开始新的旅程吗？当前自动存档会被覆盖。')) return
    clearAuto()
    setState(null)
    setSaved(null)
    setPending(null)
    setModal(null)
    setView('setup')
  }

  const resetEverything = () => {
    if (!window.confirm('这会清空自动存档与三个手动存档。确定吗？')) return
    clearAuto()
    ;[0, 1, 2].forEach((index) => deleteSlot(index))
    setState(null)
    setSaved(null)
    setSlots([])
    setView('menu')
    setSettings((current) => ({ ...current }))
    setToast('本机存档已清空')
  }

  if (state?.ending) {
    return (
      <>
        <EndingView
          state={state}
          onRestart={restart}
          onArchive={() => setModal('codex')}
          onHome={() => go('home')}
          go={go}
        />
        {modal === 'codex' && (
          <CodexModal
            entries={visibleCodex}
            onClose={() => setModal(null)}
            title="灰湾档案 · 已解锁"
          />
        )}
        {toast && <div className="toast">{toast}</div>}
      </>
    )
  }

  if (view === 'menu') {
    const savedOrigin = saved ? getOrigin(saved.originId) : null
    const savedNode = saved ? getNode(saved) : null
    return (
      <div className="play-menu">
        <div className="play-menu__glow" aria-hidden="true" />
        <div className="container play-menu__inner">
          <div className="play-menu__brand">
            <Emblem type="flame" size={54} />
            <p className="eyebrow">GREY BAY · INTERACTIVE FICTION</p>
            <h1>
              灰湾<span>编年史</span>
            </h1>
            <p className="play-menu__tagline">灯还亮着。你要不要走进来？</p>
          </div>

          <div className="play-menu__cards">
            {saved && savedNode && (
              <button className="resume-card" onClick={handleContinue}>
                <div className="resume-card__top">
                  <span className="eyebrow">CONTINUE · 继续旅程</span>
                  <span className="resume-card__time">{formatDate(saved.updatedAt)}</span>
                </div>
                <h2>
                  {saved.name}
                  <small>{savedOrigin?.name}</small>
                </h2>
                <p>
                  {savedNode.chapter} · {savedNode.title}
                </p>
                <div className="resume-card__meta">
                  <span>生命 {saved.hp}/{saved.maxHp}</span>
                  <span>补给 {saved.supply}</span>
                  <span>档案 {saved.codex.length}</span>
                  {saved.ending && <span>已抵达结局</span>}
                </div>
                <span className="resume-card__arrow" aria-hidden="true">→</span>
              </button>
            )}

            <button className="new-game-card" onClick={() => setView('setup')}>
              <span className="eyebrow">NEW JOURNEY · 新的旅程</span>
              <h2>从三号闸门开始</h2>
              <p>四种出身 · 骰子检定 · 七种结局</p>
              <span className="new-game-card__arrow" aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="play-menu__foot">
            <p>无需注册 · 自动保存在本机 · 约 40–70 分钟</p>
            <div>
              {savedEndings.length > 0 && <span>已见证 {savedEndings.length} / 7 种结局</span>}
              <button className="text-button" onClick={() => setModal('codex')}>
                档案
              </button>
              <button className="text-button" onClick={() => setModal('settings')}>
                设置
              </button>
            </div>
          </div>
        </div>

        {modal === 'codex' && (
          <CodexModal
            entries={saved ? getVisibleCodex(saved) : []}
            onClose={() => setModal(null)}
            title="灰湾档案 · 已解锁"
          />
        )}
        {modal === 'settings' && (
          <SettingsModal
            settings={settings}
            setSettings={setSettings}
            onClose={() => setModal(null)}
            onReset={resetEverything}
          />
        )}
        {toast && <div className="toast">{toast}</div>}
      </div>
    )
  }

  if (view === 'setup') {
    return (
      <>
        <Setup onStart={handleStart} onBack={() => setView('menu')} hasSaved={Boolean(saved)} />
        {toast && <div className="toast">{toast}</div>}
      </>
    )
  }

  if (!state || !node) return null

  return (
    <div className="play-game">
      <div className="play-topbar">
        <div className="container play-topbar__inner">
          <div className="play-topbar__left">
            <button className="play-exit" onClick={() => setView('menu')}>
              <span aria-hidden="true">←</span> 暂离
            </button>
            <span className="play-topbar__chapter">
              {node.chapter} <i>/</i> {node.title}
            </span>
          </div>
          <div className="play-topbar__acts" aria-label="进度">
            {STORY.acts.map((act) => (
              <span key={act.n} className={node.act >= Number(act.n === 'I' ? 1 : act.n === 'II' ? 2 : 3) ? 'is-active' : ''}>
                <i>{act.n}</i>
                <em>{act.title}</em>
              </span>
            ))}
          </div>
          <div className="play-topbar__actions">
            <button onClick={() => setModal('codex')}>
              档案 <small>{codex.unlocked}/{codex.total}</small>
            </button>
            <button onClick={openSaves}>存档</button>
            <button onClick={() => setModal('settings')}>设置</button>
          </div>
        </div>
        <div className="play-progress">
          <span style={{ width: `${actProgress.percent}%` }} />
        </div>
      </div>

      <div className="container play-shell">
        <aside className="play-rail">
          <div className="character-card">
            <div className="character-card__head">
              <div className="character-card__sigil">
                <Emblem type="flame" size={24} />
              </div>
              <div>
                <p className="eyebrow">{origin.english}</p>
                <h2>{state.name}</h2>
                <p className="character-card__origin">{origin.name} · {origin.epithet}</p>
              </div>
            </div>

            <div className="character-card__stats">
              {Object.entries(STATS).map(([key, stat]) => (
                <div key={key}>
                  <span>{stat.name}</span>
                  <StatDots value={state.stats[key]} />
                </div>
              ))}
            </div>

            <div className="character-card__resources">
              <ResourceBar label="生命" value={state.hp} max={state.maxHp} tone="red" />
              <ResourceBar label="补给" value={state.supply} max={9} tone="green" />
            </div>

            <div className="character-card__meta">
              <span>声望 <strong>{state.rep}</strong></span>
              <span>信任 <strong>{state.trust}</strong></span>
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-section__head">
              <span>随身物</span>
              <small>{state.items.length}</small>
            </div>
            <div className="inventory">
              {state.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="rail-section rail-section--note">
            <p>“名字比尸体活得久。所以活人得替死人把名字念对。”</p>
            <span>—— 沈砚</span>
          </div>
        </aside>

        <article className="story-panel" key={node.nodeId}>
          <header className="story-head">
            <p className="story-location">
              <span aria-hidden="true">◇</span> {node.location}
            </p>
            <h1>{node.title}</h1>
            <div className="story-head__rule" />
          </header>

          <div className="story-text">
            {node.text.map((paragraph, index) => (
              <p key={index} style={{ animationDelay: `${Math.min(index, 10) * 80}ms` }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mobile-status">
            <span>生命 {state.hp}/{state.maxHp}</span>
            <span>补给 {state.supply}</span>
            <span>声望 {state.rep}</span>
            <span>档案 {codex.unlocked}/{codex.total}</span>
          </div>

          <div className="choices" aria-label="选择">
            {node.choices.map((choice, index) => {
              const availability = choiceAvailability(state, choice)
              const chance = choice.check ? getCheckChance(state, choice) : null
              return (
                <button
                  key={`${node.nodeId}-${index}`}
                  className={`choice ${!availability.ok ? 'is-locked' : ''}`}
                  onClick={() => availability.ok && handleChoice(choice)}
                  disabled={!availability.ok}
                >
                  <span className="choice__num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="choice__body">
                    <span className="choice__text">{choice.text}</span>
                    <span className="choice__hint">
                      {availability.ok ? choice.hint : describeRequirement(choice.require) || availability.reason}
                    </span>
                  </span>
                  <span className="choice__meta">
                    {chance !== null && <em className="choice__chance">D20 · {chance}%</em>}
                    {choice.cost?.supply && <em className="choice__cost">补给 -{choice.cost.supply}</em>}
                    {choice.cost?.hp && <em className="choice__cost">生命 -{choice.cost.hp}</em>}
                    <i className="choice__arrow" aria-hidden="true">→</i>
                  </span>
                </button>
              )
            })}
          </div>

          <footer className="story-foot">
            <span>按数字键 1–9 也可选择</span>
            <button className="text-button" onClick={openSaves}>
              保存进度
            </button>
          </footer>
        </article>

        <aside className="play-aside">
          <div className="act-card-mini">
            <p className="eyebrow">ACT {STORY.acts[node.act - 1]?.n || 'I'}</p>
            <h3>{STORY.acts[node.act - 1]?.title}</h3>
            <p>{STORY.acts[node.act - 1]?.subtitle}</p>
            <div className="act-card-mini__dots">
              {[1, 2, 3].map((act) => (
                <i key={act} className={node.act >= act ? 'is-filled' : ''} />
              ))}
            </div>
          </div>

          {companion ? (
            <div className="companion-card">
              <p className="eyebrow">同行者</p>
              <h3>{companion.name}</h3>
              <p>信任 {state.trust} / 6</p>
              <div className="companion-card__trust">
                <span style={{ width: `${Math.max(0, Math.min(100, (state.trust / 6) * 100))}%` }} />
              </div>
              <p className="companion-card__hint">
                {state.trust >= 3 ? 'ta会在关键时刻站在你这边。' : 'ta还没有决定要不要信你。'}
              </p>
            </div>
          ) : (
            <div className="companion-card companion-card--empty">
              <p className="eyebrow">同行者</p>
              <h3>没有人</h3>
              <p>你选择了一个人下来。这也许会让你更快，也许会让你更慢。</p>
            </div>
          )}

          <div className="codex-mini">
            <div className="codex-mini__head">
              <span>档案</span>
              <small>{codex.unlocked} / {codex.total}</small>
            </div>
            <div className="codex-mini__bar">
              <i style={{ width: `${codex.percent}%` }} />
            </div>
            <button className="text-button" onClick={() => setModal('codex')}>
              打开档案 ↗
            </button>
          </div>

          <div className="journal">
            <p className="eyebrow">足迹</p>
            {state.history.slice(-4).reverse().map((entry, index) => (
              <div key={`${entry.nodeId}-${index}`} className="journal__item">
                <span>{entry.chapter}</span>
                <p>{entry.title}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {pending && (
        <DiceModal
          state={pending.state}
          pending={pending}
          onRoll={handleRoll}
          onContinue={handleCheckContinue}
        />
      )}

      {modal === 'codex' && (
        <CodexModal
          entries={visibleCodex}
          onClose={() => setModal(null)}
          title="灰湾档案 · 已解锁"
        />
      )}

      {modal === 'save' && (
        <SaveModal
          slots={slots}
          current={state}
          onClose={() => setModal(null)}
          onSave={handleSaveSlot}
          onLoad={handleLoadSlot}
          onDelete={handleDeleteSlot}
        />
      )}

      {modal === 'settings' && (
        <SettingsModal
          settings={settings}
          setSettings={setSettings}
          onClose={() => setModal(null)}
          onReset={resetEverything}
          onRestart={restart}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function SaveModal({ slots, current, onClose, onSave, onLoad, onDelete }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="存档">
      <div className="save-modal">
        <div className="save-modal__head">
          <div>
            <p className="eyebrow">SAVE / LOAD</p>
            <h2>存档</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="关闭">
            ✕
          </button>
        </div>
        <p className="save-modal__note">自动存档会在每次选择后更新。下面三个档位可以手动保存。</p>
        <div className="save-slots">
          {[0, 1, 2].map((index) => {
            const slot = slots[index]
            return (
              <div key={index} className={`save-slot ${slot ? 'is-filled' : ''}`}>
                <div className="save-slot__head">
                  <span>存档 {index + 1}</span>
                  {slot && <small>{formatDate(slot.updatedAt)}</small>}
                </div>
                {slot ? (
                  <>
                    <strong>{slot.name}</strong>
                    <p>{ORIGIN_NAMES[slot.originId] || '未知出身'} · {getNode(slot)?.chapter}</p>
                    <div className="save-slot__actions">
                      <button onClick={() => onLoad(index)}>读取</button>
                      <button onClick={() => onSave(index)}>覆盖</button>
                      <button className="is-danger" onClick={() => onDelete(index)}>删除</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="save-slot__empty">空档位</p>
                    <div className="save-slot__actions">
                      <button onClick={() => onSave(index)}>存入此档</button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className="save-modal__current">
          <span>当前</span>
          <strong>{current.name}</strong>
          <span>{getNode(current)?.chapter}</span>
          <span>生命 {current.hp}/{current.maxHp}</span>
        </div>
      </div>
    </div>
  )
}

function SettingsModal({ settings, setSettings, onClose, onReset, onRestart }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="设置">
      <div className="settings-modal">
        <div className="save-modal__head">
          <div>
            <p className="eyebrow">SETTINGS</p>
            <h2>设置</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="关闭">
            ✕
          </button>
        </div>

        <div className="settings-row">
          <div>
            <strong>减少动态效果</strong>
            <p>关闭页面的部分淡入、漂浮与骰子动画。</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.reduceMotion}
              onChange={(event) => setSettings({ ...settings, reduceMotion: event.target.checked })}
            />
            <span />
          </label>
        </div>

        <div className="settings-row">
          <div>
            <strong>正文字号</strong>
            <p>只影响故事正文，不影响界面。</p>
          </div>
          <div className="segmented">
            {[
              ['normal', '标准'],
              ['large', '大'],
            ].map(([value, label]) => (
              <button
                key={value}
                className={settings.textSize === value ? 'is-active' : ''}
                onClick={() => setSettings({ ...settings, textSize: value })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>重新开始</strong>
            <p>清空当前自动存档，回到出身选择。</p>
          </div>
          <button className="button button--ghost button--sm" onClick={onRestart}>
            新的旅程
          </button>
        </div>

        <div className="settings-row settings-row--danger">
          <div>
            <strong>清空本机存档</strong>
            <p>自动存档、手动存档与结局记录都会消失。无法撤销。</p>
          </div>
          <button className="button button--danger button--sm" onClick={onReset}>
            清空
          </button>
        </div>

        <p className="settings-modal__foot">本作不收集任何数据。所有内容只保存在此浏览器中。</p>
      </div>
    </div>
  )
}
