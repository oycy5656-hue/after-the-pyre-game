const AUTO_KEY = 'pyre:auto:v1'
const SLOTS_KEY = 'pyre:slots:v1'
const ENDINGS_KEY = 'pyre:endings:v1'
const SETTINGS_KEY = 'pyre:settings:v1'

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function loadAuto() {
  return readJSON(AUTO_KEY, null)
}

export function saveAuto(state) {
  return writeJSON(AUTO_KEY, state)
}

export function clearAuto() {
  try {
    window.localStorage.removeItem(AUTO_KEY)
  } catch {
    // ignore
  }
}

export function loadSlots() {
  const slots = readJSON(SLOTS_KEY, [])
  return Array.isArray(slots) ? slots : []
}

export function saveSlot(index, state) {
  const slots = loadSlots()
  slots[index] = state
  return writeJSON(SLOTS_KEY, slots)
}

export function deleteSlot(index) {
  const slots = loadSlots()
  slots[index] = null
  return writeJSON(SLOTS_KEY, slots)
}

export function loadEndings() {
  const ids = readJSON(ENDINGS_KEY, [])
  return Array.isArray(ids) ? ids : []
}

export function recordEnding(id) {
  const ids = loadEndings()
  if (!ids.includes(id)) {
    ids.push(id)
    writeJSON(ENDINGS_KEY, ids)
  }
  return ids
}

export function loadSettings() {
  return readJSON(SETTINGS_KEY, { reduceMotion: false, textSize: 'normal' })
}

export function saveSettings(settings) {
  return writeJSON(SETTINGS_KEY, settings)
}

export function hasSave() {
  return Boolean(loadAuto())
}
