import { STORY, ENDINGS } from '../data/story.js'
import { ORIGINS, DIFFICULTIES, STATS } from '../data/world.js'
import { CODEX, codexById } from '../data/codex.js'

export const COMPANION_NAMES = {
  sera: '塞拉菲娜',
  zhuo: '卓正',
  niao: '鸟先生',
  qi: '祁鸢',
}

export function getOrigin(id) {
  return ORIGINS.find((origin) => origin.id === id) || ORIGINS[0]
}

export function getDifficulty(id) {
  return DIFFICULTIES.find((difficulty) => difficulty.id === id) || DIFFICULTIES[1]
}

export function getCompanion(state) {
  const id = state.flags?.companion
  return id ? { id, name: COMPANION_NAMES[id] || id } : null
}

export function createRun({ name, originId, difficultyId }) {
  const origin = getOrigin(originId)
  const difficulty = getDifficulty(difficultyId)
  const now = new Date().toISOString()
  return {
    version: 1,
    name: (name || '').trim() || '无名者',
    originId: origin.id,
    difficultyId: difficulty.id,
    nodeId: STORY.start,
    stats: { ...origin.stats },
    maxHp: 10,
    hp: 10,
    supply: 4,
    light: 3,
    rep: 0,
    trust: 0,
    items: [...origin.items],
    flags: { ...origin.flags },
    codex: [...origin.codex],
    visited: [],
    history: [],
    ending: null,
    turns: 0,
    createdAt: now,
    updatedAt: now,
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export function applyEffects(state, effects = {}) {
  const next = {
    ...state,
    stats: { ...state.stats },
    items: [...state.items],
    flags: { ...state.flags },
    codex: [...state.codex],
    visited: [...state.visited],
    history: [...state.history],
  }

  if (typeof effects.hp === 'number') {
    next.hp = clamp(next.hp + effects.hp, 0, next.maxHp)
  }
  if (typeof effects.maxHp === 'number') {
    next.maxHp = clamp(next.maxHp + effects.maxHp, 1, 20)
    next.hp = clamp(next.hp, 0, next.maxHp)
  }
  for (const key of ['supply', 'light']) {
    if (typeof effects[key] === 'number') {
      next[key] = clamp(next[key] + effects[key], 0, 9)
    }
  }
  if (typeof effects.rep === 'number') {
    next.rep = clamp(next.rep + effects.rep, -10, 10)
  }
  if (typeof effects.trust === 'number') {
    next.trust = clamp(next.trust + effects.trust, -3, 6)
  }
  for (const key of Object.keys(STATS)) {
    if (typeof effects[key] === 'number') {
      next.stats[key] = clamp(next.stats[key] + effects[key], 1, 6)
    }
  }
  if (Array.isArray(effects.items)) {
    for (const item of effects.items) {
      if (!next.items.includes(item)) next.items.push(item)
    }
  }
  if (Array.isArray(effects.removeItems)) {
    next.items = next.items.filter((item) => !effects.removeItems.includes(item))
  }
  if (effects.flags && typeof effects.flags === 'object') {
    Object.assign(next.flags, effects.flags)
  }
  if (Array.isArray(effects.codex)) {
    for (const id of effects.codex) {
      if (codexById[id] && !next.codex.includes(id)) next.codex.push(id)
    }
  }
  next.updatedAt = new Date().toISOString()
  return next
}

export function enterNode(state, nodeId) {
  const node = STORY.nodes[nodeId]
  if (!node) throw new Error(`Unknown story node: ${nodeId}`)

  let next = { ...state, nodeId, turns: state.turns + 1 }
  const firstVisit = !next.visited.includes(nodeId)
  if (firstVisit) {
    next.visited = [...next.visited, nodeId]
    if (node.onEnter) next = applyEffects(next, node.onEnter)
  }
  if (node.ending) {
    next.ending = node.ending
  }
  next.history = [
    ...next.history.slice(-24),
    {
      nodeId,
      title: node.title,
      chapter: node.chapter,
      location: node.location,
      act: node.act,
      at: new Date().toISOString(),
    },
  ]
  next.updatedAt = new Date().toISOString()

  if (next.hp <= 0 && !next.ending) {
    next.ending = 'dark'
    next.nodeId = 'ending_dark'
  }
  return next
}

export function startRun(config) {
  let state = createRun(config)
  state = enterNode(state, STORY.start)
  return state
}

export function choiceAvailability(state, choice) {
  const req = choice.require
  if (req) {
    if (req.flag && !state.flags[req.flag]) {
      return { ok: false, reason: '条件未满足' }
    }
    if (req.allFlags && !req.allFlags.every((flag) => state.flags[flag])) {
      return { ok: false, reason: '条件未满足' }
    }
    if (req.anyFlags && !req.anyFlags.some((flag) => state.flags[flag])) {
      return { ok: false, reason: '条件未满足' }
    }
    if (req.item && !state.items.includes(req.item)) {
      return { ok: false, reason: `需要：${req.item}` }
    }
    if (req.rep && state.rep < req.rep) {
      return { ok: false, reason: `需要声望 ${req.rep}` }
    }
    if (req.codex && state.codex.length < req.codex) {
      return { ok: false, reason: `需要档案 ${req.codex}` }
    }
    if (typeof req.trustMin === 'number' && state.trust < req.trustMin) {
      return { ok: false, reason: `需要信任 ${req.trustMin}` }
    }
    if (typeof req.trustMax === 'number' && state.trust > req.trustMax) {
      return { ok: false, reason: '条件已改变' }
    }
    if (req.attr) {
      const need = req.min ?? 1
      if ((state.stats[req.attr] || 0) < need) {
        return { ok: false, reason: `需要${STATS[req.attr]?.name || req.attr} ${need}` }
      }
    }
  }

  if (choice.cost) {
    if (choice.cost.supply && state.supply < choice.cost.supply) {
      return { ok: false, reason: `需要 ${choice.cost.supply} 补给` }
    }
    if (choice.cost.hp && state.hp <= choice.cost.hp) {
      return { ok: false, reason: '生命不足' }
    }
    if (choice.cost.light && state.light < choice.cost.light) {
      return { ok: false, reason: '灯油不足' }
    }
  }
  return { ok: true, reason: '' }
}

export function applyChoiceCost(state, choice) {
  if (!choice.cost) return state
  return applyEffects(state, {
    hp: choice.cost.hp ? -choice.cost.hp : 0,
    supply: choice.cost.supply ? -choice.cost.supply : 0,
    light: choice.cost.light ? -choice.cost.light : 0,
  })
}

export function choose(state, choice) {
  const availability = choiceAvailability(state, choice)
  if (!availability.ok) return { error: availability.reason }

  let next = applyChoiceCost(state, choice)
  if (choice.effects) next = applyEffects(next, choice.effects)

  if (choice.check) {
    return {
      pending: {
        choice,
        state: next,
      },
    }
  }

  if (choice.to) {
    return { state: enterNode(next, choice.to) }
  }
  return { state: next }
}

export function getCheckChance(state, choice) {
  if (!choice?.check) return 0
  const difficulty = getDifficulty(state.difficultyId)
  const stat = state.stats[choice.check.attr] || 0
  const need = choice.check.dc - stat - difficulty.checkBonus
  return clamp(Math.round(((21 - need) / 20) * 100), 5, 95)
}

export function performCheck(state, pending) {
  const { choice } = pending
  const difficulty = getDifficulty(state.difficultyId)
  const stat = state.stats[choice.check.attr] || 0
  const bonus = difficulty.checkBonus
  const roll = Math.floor(Math.random() * 20) + 1
  const total = roll + stat + bonus
  const success = roll === 20 || (roll !== 1 && total >= choice.check.dc)
  const outcomeEffects = success ? choice.successEffects : choice.failEffects
  let next = outcomeEffects ? applyEffects(pending.state, outcomeEffects) : pending.state
  return {
    nextState: next,
    nextId: success ? choice.check.success : choice.check.fail,
    roll,
    total,
    stat,
    bonus,
    dc: choice.check.dc,
    success,
  }
}

export function finishCheck(result) {
  let next = enterNode(result.nextState, result.nextId)
  return next
}

export function getNode(state) {
  return STORY.nodes[state.nodeId] || STORY.nodes[STORY.start]
}

export function getEnding(id) {
  return ENDINGS[id] || ENDINGS.dark
}

export function getCodexEntry(id) {
  return codexById[id]
}

export function getVisibleCodex(state) {
  return state.codex.map((id) => codexById[id]).filter(Boolean)
}

export function getCodexProgress(state) {
  return {
    unlocked: state.codex.length,
    total: CODEX.length,
    percent: Math.round((state.codex.length / CODEX.length) * 100),
  }
}

export function getActProgress(state) {
  const node = getNode(state)
  const act = node.act || 1
  const actInfo = STORY.acts.find((item) => item.n === ['I', 'II', 'III'][act - 1]) || STORY.acts[0]
  return { act, actInfo, percent: Math.round(((act - 1) / 3) * 100 + 12) }
}

export function describeRequirement(require) {
  if (!require) return ''
  if (require.item) return `需要：${require.item}`
  if (require.flag) return '需要特定经历'
  if (require.anyFlags) return '需要与某人建立过联系'
  if (require.allFlags) return '需要掌握完整真相'
  if (require.rep) return `需要声望 ${require.rep}`
  if (require.codex) return `需要档案 ${require.codex}`
  if (require.trustMin) return `需要信任 ${require.trustMin}`
  return '条件未满足'
}

export function summarizeEffects(effects = {}) {
  const parts = []
  if (effects.hp) parts.push(`生命 ${effects.hp > 0 ? '+' : ''}${effects.hp}`)
  if (effects.supply) parts.push(`补给 ${effects.supply > 0 ? '+' : ''}${effects.supply}`)
  if (effects.rep) parts.push(`声望 ${effects.rep > 0 ? '+' : ''}${effects.rep}`)
  if (effects.trust) parts.push(`信任 ${effects.trust > 0 ? '+' : ''}${effects.trust}`)
  if (effects.items?.length) parts.push(`获得：${effects.items.join('、')}`)
  return parts.join(' · ')
}
