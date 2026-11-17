import { useMemo, useState } from 'react'
import EmberCanvas from '../components/EmberCanvas.jsx'
import Emblem from '../components/Emblem.jsx'
import MapGreyBay from '../components/MapGreyBay.jsx'
import Reveal from '../components/Reveal.jsx'
import { FACTIONS, LOCATIONS, ORIGINS, SITE, STATS } from '../data/world.js'
import { ENDING_ORDER, STORY } from '../data/story.js'

const sceneCount = Object.keys(STORY.nodes).length

export default function Home({ go }) {
  const [mapId, setMapId] = useState('hall')
  const mapLocation = useMemo(
    () => LOCATIONS.find((location) => location.id === mapId) || LOCATIONS[0],
    [mapId],
  )

  return (
    <>
      <section className="hero">
        <img className="hero__art" src={`${import.meta.env.BASE_URL}art/hero.svg`} alt="" />
        <div className="hero__veil" aria-hidden="true" />
        <EmberCanvas />
        <div className="container hero__content">
          <div className="hero__topline">
            <span>INTERACTIVE FICTION</span>
            <span className="hero__topline-rule" />
            <span>VOL. I / GREY BAY</span>
          </div>

          <div className="hero__main">
            <div className="hero__title-block">
              <p className="hero__kicker">葬火之后 · 灰湾编年史</p>
              <h1 className="hero__title">
                <span className="hero__title-line">葬火</span>
                <span className="hero__title-line hero__title-line--offset">之后</span>
              </h1>
              <div className="hero__seal" aria-hidden="true">
                <span>灰</span>
                <span>湾</span>
              </div>
            </div>

            <div className="hero__aside">
              <p className="hero__tagline">{SITE.tagline}</p>
              <p className="hero__desc">{SITE.description}</p>
              <div className="hero__actions">
                <button className="button button--ember button--lg" onClick={() => go('play')}>
                  <span>进入灰湾</span>
                  <span className="button__arrow" aria-hidden="true">↗</span>
                </button>
                <button className="button button--ghost button--lg" onClick={() => go('world')}>
                  阅读世界
                </button>
              </div>
              <p className="hero__warning">
                <span aria-hidden="true">◇</span> {SITE.warning}
              </p>
            </div>
          </div>

          <div className="hero__footer">
            <div className="hero__stats">
              <span>
                <strong>04</strong> 种出身
              </span>
              <span>
                <strong>{sceneCount}</strong> 个叙事节点
              </span>
              <span>
                <strong>06</strong> 股势力
              </span>
              <span>
                <strong>07</strong> 种结局
              </span>
            </div>
            <div className="hero__scroll">
              <span>向下阅读</span>
              <i aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="hero__vertical" aria-hidden="true">
          <span>灰潮四十七年</span>
          <i />
          <span>东海岸 · 第七实验场</span>
        </div>
      </section>

      <section className="manifesto section">
        <div className="container">
          <div className="section-head section-head--split">
            <p className="section-index">01 / 序</p>
            <p className="section-note">一部长篇互动小说 · 建议在安静处阅读</p>
          </div>

          <div className="manifesto__grid">
            <Reveal className="manifesto__quote">
              <p>
                火不是神赐的。
                <br />
                火是有人从灰里，
                <br />
                一粒一粒捡回来的。
              </p>
              <span className="manifesto__attribution">—— 沈砚，第九避难所档案员</span>
            </Reveal>

            <Reveal className="manifesto__body" delay={120}>
              <p className="dropcap">
                葬火之后第四十七年，灰湾的灯开始熄灭。你带着一封没有署名的信，走进这座由六股势力共同维持的城。信上只有一句话：交给第七层，别让他们点灯。
              </p>
              <p>
                地下九层，藏着一颗不该被唤醒的太阳。它曾经烧掉整个旧世界，如今却成了灰湾唯一的光源。有人想点亮它，有人想卖掉它，有人想把它永远埋回去。
              </p>
              <p>
                你会遇见一个不相信自己是神的女王，一个把名字写在纸上的守夜人，一个连脸都不肯露的佣兵，一个宁愿让城一直走的工程师。你们会一起下到第七层，然后在第七分钟里，各自做出选择。
              </p>
              <div className="manifesto__facts">
                <div>
                  <span>类型</span>
                  <strong>多结局文字冒险</strong>
                </div>
                <div>
                  <span>单周目</span>
                  <strong>约 40–70 分钟</strong>
                </div>
                <div>
                  <span>存档</span>
                  <strong>本地自动保存</strong>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="acts section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">02 / 三幕</p>
              <h2 className="section-title">一座城，七分钟，<em>三次</em>选择。</h2>
            </div>
            <p className="section-note">
              故事分为三幕。每一幕结束时，你都会失去一点东西；每一幕开始时，你都可以重新决定自己是谁。
            </p>
          </div>

          <div className="acts__grid">
            {STORY.acts.map((act, index) => {
              const count = Object.values(STORY.nodes).filter((node) => node.act === index + 1).length
              return (
                <Reveal key={act.n} className={`act-card act-card--${index + 1}`} delay={index * 100}>
                  <div className="act-card__top">
                    <span className="act-card__numeral">{act.n}</span>
                    <span className="act-card__count">{count} 个节点</span>
                  </div>
                  <div className="act-card__body">
                    <p className="act-card__subtitle">{act.subtitle}</p>
                    <h3>{act.title}</h3>
                    <p>{act.desc}</p>
                  </div>
                  <div className="act-card__line" aria-hidden="true" />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="factions section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">03 / 六方</p>
              <h2 className="section-title">没有人是反派。<br />每个人都只是想活过冬天。</h2>
            </div>
            <button className="text-button" onClick={() => go('world')}>
              查看完整势力档案 <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="factions__grid">
            {FACTIONS.map((faction, index) => (
              <Reveal key={faction.id} className="faction-card" delay={index * 60}>
                <div className="faction-card__head">
                  <span className="faction-card__emblem" style={{ color: faction.color }}>
                    <Emblem type={faction.emblem} size={38} />
                  </span>
                  <span className="faction-card__index">0{index + 1}</span>
                </div>
                <div className="faction-card__title">
                  <h3>{faction.name}</h3>
                  <span>{faction.english}</span>
                </div>
                <p className="faction-card__motto">“{faction.motto}”</p>
                <p className="faction-card__desc">{faction.desc}</p>
                <div className="faction-card__foot">
                  <span>领袖 · {faction.leader}</span>
                  <span>{faction.values.join(' / ')}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="map-section section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">04 / 灰湾</p>
              <h2 className="section-title">灰湾不是一张地图。<br />是一张账单。</h2>
            </div>
            <p className="section-note">
              点击地图上的灯，看看这座城的每一块地方欠了什么、又守住了什么。
            </p>
          </div>

          <div className="map-layout">
            <Reveal className="map-layout__map">
              <MapGreyBay selected={mapId} onSelect={setMapId} />
            </Reveal>
            <Reveal className="map-layout__info" delay={120}>
              <p className="eyebrow">{mapLocation.type} · {mapLocation.short}</p>
              <h3>{mapLocation.name}</h3>
              <p className="map-layout__desc">{mapLocation.desc}</p>
              <p className="map-layout__detail">{mapLocation.detail}</p>
              <div className="map-layout__foot">
                <span>辖区 · {FACTIONS.find((faction) => faction.id === mapLocation.faction)?.name}</span>
                <button className="text-button" onClick={() => go('world')}>
                  打开世界地图 <span aria-hidden="true">↗</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mechanics section">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="section-index">05 / 规则</p>
              <h2 className="section-title">骰子不保证成功。<br />但每一次选择都留下痕迹。</h2>
            </div>
            <p className="section-note">没有最优解，也没有“正确”的结局。只有你愿意承担的那一种。</p>
          </div>

          <div className="mechanics__grid">
            <Reveal className="mechanic">
              <span className="mechanic__num">01</span>
              <h3>选择你的出身</h3>
              <p>书记、护卫、拾荒者、守灯人。四种出身改变你的属性、初始物品与别人看你的方式。</p>
              <div className="mechanic__chips">
                {ORIGINS.map((origin) => (
                  <span key={origin.id}>{origin.name}</span>
                ))}
              </div>
            </Reveal>
            <Reveal className="mechanic" delay={80}>
              <span className="mechanic__num">02</span>
              <h3>接受骰子的裁决</h3>
              <p>关键行动会进行 D20 检定。属性、出身与难度共同决定成功率。失败不是结束，只是另一条路。</p>
              <div className="mechanic__stats">
                {Object.values(STATS).map((stat) => (
                  <div key={stat.name}>
                    <span>{stat.short}</span>
                    <strong>{stat.name}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="mechanic" delay={160}>
              <span className="mechanic__num">03</span>
              <h3>把名字留下来</h3>
              <p>自动存档、三个手动存档位、可解锁的灰湾档案，以及七种会被记录在案的结局。</p>
              <div className="mechanic__endings">
                {ENDING_ORDER.map((id) => (
                  <span key={id}>{id === 'dark' ? '??' : '？'}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="endings-teaser section">
        <div className="container">
          <div className="endings-teaser__inner">
            <p className="section-index">06 / 结局</p>
            <h2 className="endings-teaser__title">七种结局。<br /><em>没有一种</em>不需要代价。</h2>
            <p>
              你可以成为灯芯，可以交出太阳，可以把火分给十二个街区，也可以带着它离开。你甚至可以把真相广播出去，听听四十七年来第一次有人回答。
            </p>
            <button className="button button--ghost button--lg" onClick={() => go('archive')}>
              先读一读灰湾的档案
            </button>
          </div>
          <div className="endings-teaser__seals" aria-hidden="true">
            {ENDING_ORDER.map((id, index) => (
              <span key={id} className={`ending-seal ending-seal--${index + 1}`}>
                E-0{index + 1}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <EmberCanvas density={24} />
        <div className="container final-cta__inner">
          <p className="eyebrow">灰湾 · 三号闸门 · 灯还亮着</p>
          <h2>灯还亮着。</h2>
          <p>你要不要走进来？</p>
          <button className="button button--ember button--xl" onClick={() => go('play')}>
            <span>开始你的灰湾编年史</span>
            <span className="button__arrow" aria-hidden="true">↗</span>
          </button>
          <span className="final-cta__meta">无需注册 · 本地存档 · 约 40–70 分钟</span>
        </div>
      </section>
    </>
  )
}
