import Emblem from '../components/Emblem.jsx'
import { SITE } from '../data/world.js'

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="container">
          <p className="eyebrow">ABOUT · 关于本作</p>
          <div className="page-hero__title-row">
            <h1>
              余烬<span className="page-hero__dot">.</span>
            </h1>
            <p>
              一个关于选择、代价与明天的故事。
              <br />
              也是一次把世界观变成可玩叙事的尝试。
            </p>
          </div>
        </div>
      </section>

      <section className="about-page section">
        <div className="container about-layout">
          <div className="about-main">
            <p className="about-lead">
              《葬火之后 · 灰湾编年史》是一部发生在原创世界观“葬火之后”中的中文互动小说。它不是把设定摊开给你看，而是让你走进一座正在熄灭的城，在有限的时间、有限的信息和有限的信任里，做出自己的决定。
            </p>

            <div className="rule" />

            <h2>怎么玩</h2>
            <p>
              选择一种出身，给自己起一个名字，然后进入灰湾。故事里的关键行动会用 D20 加属性进行检定。你能看到成功率，但看不到骰子的结果。失败不会让你读档重来，而是把你带到另一条路上。
            </p>
            <p>
              你的生命、补给、声望、与同伴的信任，以及你读过的档案，都会影响后续能做什么。游戏自动保存在本机浏览器中，也可以使用三个手动存档位。
            </p>

            <h2>关于世界</h2>
            <p>
              “葬火之后”最初是一套包含二十二个政权、地理志与文明录的世界设定。灰湾是东海岸的一座自由市，也是这个世界里最靠近旧世界伤口的地方之一。本作把镜头收窄到一座城、七分钟和几个人身上，试图回答一个更大的问题：当光只能照亮一部分人时，谁有资格决定照谁？
            </p>
            <p>
              世界观原作与灰湾设定来自本项目工作区中的《葬火之后》资料。文字、代码与视觉均为本作重新创作。故事中的人物、地点与制度均为虚构。
            </p>

            <h2>内容提示</h2>
            <p>{SITE.warning}</p>
            <p>
              本作不提供“正确答案”。如果你在某个选择前停了下来，那可能正是这个故事想让你停下来的地方。
            </p>

            <div className="about-credit">
              <Emblem type="flame" size={30} />
              <div>
                <strong>葬火之后 · 灰湾编年史</strong>
                <span>第一卷 · 灰潮四十七年</span>
              </div>
            </div>
          </div>

          <aside className="about-aside">
            <div className="about-card">
              <p className="eyebrow">CREDITS</p>
              <dl>
                <div>
                  <dt>世界观原作</dt>
                  <dd>《葬火之后》</dd>
                </div>
                <div>
                  <dt>文本 / 设计 / 前端</dt>
                  <dd>灰湾编年史制作组</dd>
                </div>
                <div>
                  <dt>技术</dt>
                  <dd>React · Vite · 纯静态部署</dd>
                </div>
                <div>
                  <dt>存档</dt>
                  <dd>浏览器 localStorage</dd>
                </div>
                <div>
                  <dt>版本</dt>
                  <dd>v1.0 · 2026</dd>
                </div>
              </dl>
            </div>

            <div className="about-card about-card--note">
              <p className="eyebrow">PROJECT NOTES</p>
              <p>没有服务器，没有账号，没有追踪。你的选择只留在这台设备上。</p>
              <p>如果你想继续写下去，灰湾还有很多没被点亮的地方。</p>
            </div>

            <a
              className="about-link"
              href="https://github.com/oycy5656-hue/after-the-pyre"
              target="_blank"
              rel="noreferrer"
            >
              <span>阅读完整世界观</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="about-link"
              href="https://github.com/oycy5656-hue/after-the-pyre-game"
              target="_blank"
              rel="noreferrer"
            >
              <span>查看本站源码</span>
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </section>
    </>
  )
}
