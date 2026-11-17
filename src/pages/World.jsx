import { useMemo, useState } from 'react'
import Emblem from '../components/Emblem.jsx'
import MapGreyBay from '../components/MapGreyBay.jsx'
import Reveal from '../components/Reveal.jsx'
import { FACTIONS, LOCATIONS, SITE, TIMELINE, WIDER_WORLD } from '../data/world.js'

export default function World({ go }) {
  const [selected, setSelected] = useState('hall')
  const location = useMemo(
    () => LOCATIONS.find((item) => item.id === selected) || LOCATIONS[0],
    [selected],
  )
  const faction = FACTIONS.find((item) => item.id === location.faction)

  return (
    <>
      <section className="page-hero page-hero--world">
        <div className="container">
          <p className="eyebrow">ATLAS · 灰湾地理志</p>
          <div className="page-hero__title-row">
            <h1>
              灰湾<span className="page-hero__dot">.</span>
            </h1>
            <p>
              东海岸最后一座还有灯的城市。
              <br />
              六股势力，八个地点，四十七年的账。
            </p>
          </div>
          <div className="page-hero__meta">
            <span>坐标 · 东经 121° / 北纬 31°</span>
            <span>人口 · 约 42,000</span>
            <span>状态 · 灯火衰减</span>
          </div>
        </div>
      </section>

      <section className="world-map-section section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">01 / 城市</p>
              <h2 className="section-title">一张会烧起来的地图。</h2>
            </div>
            <p className="section-note">点击任意灯点，阅读该地点的档案。地图不是比例尺，是权力关系。</p>
          </div>

          <div className="world-map-layout">
            <div className="world-map-layout__canvas">
              <MapGreyBay selected={selected} onSelect={setSelected} />
            </div>
            <aside className="world-map-layout__panel">
              <p className="eyebrow">{location.type} · {faction?.name}</p>
              <h3>{location.name}</h3>
              <p className="world-map-layout__desc">{location.desc}</p>
              <div className="rule rule--short" />
              <p>{location.detail}</p>
              <dl className="world-map-layout__facts">
                <div>
                  <dt>辖区</dt>
                  <dd>{faction?.name}</dd>
                </div>
                <div>
                  <dt>领袖</dt>
                  <dd>{faction?.leader}</dd>
                </div>
                <div>
                  <dt>状态</dt>
                  <dd>{location.id === 'shelter' ? '核心过载' : '运转中'}</dd>
                </div>
              </dl>
              <button className="button button--ember button--block" onClick={() => go('play')}>
                从这里开始故事
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="faction-detail section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">02 / 六方</p>
              <h2 className="section-title">六种活法。</h2>
            </div>
            <p className="section-note">
              灰湾没有统一的法律。六方共管的真正含义是：每一方都有能力让别人活不下去。
            </p>
          </div>

          <div className="faction-detail__list">
            {FACTIONS.map((item, index) => (
              <Reveal key={item.id} className="faction-row" delay={index * 50}>
                <div className="faction-row__mark" style={{ color: item.color }}>
                  <Emblem type={item.emblem} size={54} />
                </div>
                <div className="faction-row__title">
                  <span className="faction-row__index">0{index + 1}</span>
                  <h3>{item.name}</h3>
                  <p>{item.english}</p>
                </div>
                <div className="faction-row__body">
                  <p className="faction-row__motto">“{item.motto}”</p>
                  <p>{item.long}</p>
                  <div className="faction-row__tags">
                    {item.values.map((value) => (
                      <span key={value}>{value}</span>
                    ))}
                  </div>
                </div>
                <dl className="faction-row__facts">
                  <div>
                    <dt>领袖</dt>
                    <dd>{item.leader}</dd>
                  </div>
                  <div>
                    <dt>据点</dt>
                    <dd>{item.seat}</dd>
                  </div>
                  <div>
                    <dt>强项</dt>
                    <dd>{item.strength}</dd>
                  </div>
                  <div>
                    <dt>软肋</dt>
                    <dd>{item.weakness}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">03 / 年表</p>
              <h2 className="section-title">从葬火到第七分钟。</h2>
            </div>
            <p className="section-note">官方年表与沈砚的档案有几处对不上。对不上的地方，通常才是真的。</p>
          </div>

          <div className="timeline">
            {TIMELINE.map((item, index) => (
              <Reveal key={item.year} className="timeline__item" delay={index * 50}>
                <div className="timeline__year">{item.year}</div>
                <div className="timeline__marker" aria-hidden="true">
                  <span />
                </div>
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wider-world section">
        <div className="container">
          <div className="wider-world__head">
            <p className="section-index">04 / 更远的地方</p>
            <h2 className="section-title">灰湾之外，还有二十二个名字。</h2>
            <p>
              葬火之后，旧世界的二十二个政权只剩下名字、边界和各自的账单。它们没有来救灰湾。但它们还在那里。
            </p>
          </div>
        </div>
        <div className="wider-world__marquee" aria-label="灰湾之外的国家">
          <div className="wider-world__track">
            {[...WIDER_WORLD, ...WIDER_WORLD].map((name, index) => (
              <span key={`${name}-${index}`}>{name}<i>·</i></span>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="wider-world__foot">
            <p>{SITE.warning}</p>
            <button className="button button--ghost" onClick={() => go('archive')}>
              打开灰湾档案
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
