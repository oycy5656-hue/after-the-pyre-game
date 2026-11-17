import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/world.js'
import { getCheckChance, summarizeEffects } from '../game/engine.js'

export default function DiceModal({ state, pending, onRoll, onContinue }) {
  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState(null)
  const timer = useRef(null)
  const buttonRef = useRef(null)
  const choice = pending.choice
  const attr = STATS[choice.check.attr]
  const chance = getCheckChance(state, choice)

  useEffect(() => {
    buttonRef.current?.focus()
    return () => clearTimeout(timer.current)
  }, [])

  const roll = () => {
    if (rolling || result) return
    setRolling(true)
    timer.current = setTimeout(() => {
      const outcome = onRoll()
      setResult(outcome)
      setRolling(false)
    }, 900)
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="命运检定">
      <div className={`dice-modal ${result ? (result.success ? 'is-success' : 'is-fail') : ''}`}>
        <div className="dice-modal__ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <p className="eyebrow">命运检定 · D20</p>
        <h2 className="dice-modal__title">{choice.text}</h2>
        <p className="dice-modal__meta">
          <span>{attr?.name}</span>
          <span className="dot">·</span>
          <span>难度 {choice.check.dc}</span>
          <span className="dot">·</span>
          <span>成功率 {chance}%</span>
        </p>

        <div className={`dice ${rolling ? 'is-rolling' : ''} ${result ? (result.success ? 'is-success' : 'is-fail') : ''}`}>
          <div className="dice__face">
            <span>{result ? result.roll : '?'}</span>
          </div>
          <div className="dice__shadow" />
        </div>

        {result ? (
          <div className="dice-result">
            <p className={`dice-result__verdict ${result.success ? 'is-success' : 'is-fail'}`}>
              {result.success ? '成功' : '失败'}
            </p>
            <p className="dice-result__math">
              {result.roll} + {result.stat}
              {result.bonus !== 0 ? ` ${result.bonus > 0 ? '+' : '-'} ${Math.abs(result.bonus)}` : ''} ={' '}
              <strong>{result.total}</strong> / DC {result.dc}
            </p>
            <p className="dice-result__text">
              {result.success
                ? '骰子落在你这边。'
                : '骰子没有站在你这边。灰湾不会因为你想赢就让你赢。'}
            </p>
            {(choice.successEffects || choice.failEffects) && (
              <p className="dice-result__effects">
                {summarizeEffects(result.success ? choice.successEffects : choice.failEffects)}
              </p>
            )}
            <button className="button button--ember dice-result__button" onClick={() => onContinue(result)}>
              继续
            </button>
          </div>
        ) : (
          <>
            <p className="dice-modal__flavor">
              {rolling ? '骰子还在转。' : '结果不会改变你做过的事。它只会改变你接下来要走的路。'}
            </p>
            <button
              ref={buttonRef}
              className="button button--ember dice-modal__button"
              onClick={roll}
              disabled={rolling}
            >
              {rolling ? '掷骰中……' : '掷骰'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
