import Emblem from './Emblem.jsx'

export default function SiteFooter({ go }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <Emblem type="flame" size={34} />
            <div>
              <strong>葬火之后</strong>
              <span>灰湾编年史</span>
            </div>
          </div>
          <p>
            神明烧尽了天空。
            <br />
            四十七年后，我们在灰里点火。
          </p>
          <div className="site-footer__seal">灰潮 047</div>
        </div>

        <div className="site-footer__col">
          <p className="site-footer__heading">阅读</p>
          <button onClick={() => go('play')}>开始游戏</button>
          <button onClick={() => go('world')}>世界地图</button>
          <button onClick={() => go('archive')}>灰湾档案</button>
        </div>

        <div className="site-footer__col">
          <p className="site-footer__heading">项目</p>
          <button onClick={() => go('about')}>关于本作</button>
          <a href="https://github.com/oycy5656-hue/after-the-pyre" target="_blank" rel="noreferrer">
            世界观百科
          </a>
          <a href="https://github.com/oycy5656-hue/after-the-pyre-game" target="_blank" rel="noreferrer">
            GitHub 仓库
          </a>
        </div>

        <div className="site-footer__col site-footer__col--note">
          <p className="site-footer__heading">提示</p>
          <p>本作包含暴力、死亡、饥荒与宗教隐喻。建议十六岁以上阅读。</p>
          <p>故事、人物与灰湾均为虚构。任何与现实相似的姓名、地点或制度，纯属巧合。</p>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© 2026 葬火之后 · 灰湾编年史</span>
        <span>一个关于余烬、选择与明天的故事</span>
      </div>
    </footer>
  )
}
