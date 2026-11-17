# 葬火之后 · 灰湾编年史

一部发生在原创世界观「葬火之后」中的中文多结局文字游戏。

神明烧尽了天空。四十七年后，灰湾的灯开始熄灭。你带着一封没有署名的信走进这座城，在六股势力、一座将熄的城与一个不该被唤醒的太阳之间，决定谁有权看见明天。

## 线上地址

https://oycy5656-hue.github.io/after-the-pyre-game/

## 内容

- **四种出身**：避难所书记、车队护卫、灰湾拾荒者、守灯人
- **D20 检定**：武艺、智识、机敏、交涉；失败会进入另一条路，而不是简单的“重来”
- **三幕主线**：入湾、地底、点灯，约 89 个叙事节点
- **七种结局**：牺牲、秩序、分火、归灰、自由、真相与终局
- **六方势力**：永昼庭、太阳避难所、旧城三街、北风领、黑水佣兵、铁潮
- **灰湾地图**：八个地点，可交互查看档案
- **灰湾档案**：28 条世界、势力、人物、地点与术语条目，含剧透开关
- **本机存档**：自动存档、三个手动档位、结局记录；不收集任何数据

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5177/after-the-pyre-game/
npm run build    # 产物在 dist/
npm run preview  # 预览生产构建
```

要求 Node.js 20+。

## 结构

```text
src/
├─ App.jsx                 hash 路由与应用外壳
├─ styles.css              全站视觉系统与响应式样式
├─ components/
│  ├─ SiteHeader.jsx
│  ├─ SiteFooter.jsx
│  ├─ Emblem.jsx           势力纹章
│  ├─ MapGreyBay.jsx       灰湾互动地图
│  ├─ DiceModal.jsx        D20 检定
│  ├─ CodexModal.jsx       游戏内档案
│  ├─ EmberCanvas.jsx      余烬粒子
│  └─ Reveal.jsx           滚动显现
├─ pages/
│  ├─ Home.jsx
│  ├─ World.jsx
│  ├─ Archive.jsx
│  ├─ Play.jsx
│  └─ About.jsx
├─ game/
│  ├─ engine.js            状态、检定、条件与效果
│  └─ storage.js           localStorage 存档
└─ data/
   ├─ world.js             势力、地点、年表、出身
   ├─ codex.js             档案
   └─ story.js             三幕主线、分支与结局
```

## 发布

站点是纯静态构建，`vite.config.js` 中的 `base` 为 `/after-the-pyre-game/`，对应 GitHub Pages 的项目路径。

将 `dist/` 的内容发布到 `gh-pages` 分支，并在仓库 Settings → Pages 中将 Source 设为 `gh-pages` / `/` 即可。

如果以后绑定自定义域名，需要把 `base` 改成 `/`，重新构建，并添加 `CNAME` 文件。

## 说明

- 故事、人物与灰湾均为虚构。内容包含暴力、死亡、饥荒与宗教隐喻，建议十六岁以上阅读。
- 世界观原作来自「葬火之后」设定集；本作的文字、代码与视觉为重新创作。
- 游戏状态只保存在浏览器 `localStorage` 中，没有后端，也没有账号系统。
