export const STORY = {
  id: 'grey-bay',
  title: '灰湾编年史',
  subtitle: '葬火之后 · 第一卷',
  start: 'prologue',
  acts: [
    {
      n: 'I',
      title: '入湾',
      subtitle: '灯灭的第七秒',
      desc: '你走进一座正在熄灭的城。六方势力都在等一把钥匙，而钥匙在你手里。',
      from: 1,
      to: 11,
    },
    {
      n: 'II',
      title: '地底',
      subtitle: '太阳的尸骸',
      desc: '第七层没有神，只有一台需要人血的机器，和一个被藏了四十七年的真相。',
      from: 12,
      to: 21,
    },
    {
      n: 'III',
      title: '点灯',
      subtitle: '谁有权看见明天',
      desc: '七分钟。一座城。一个不该由任何人独自做出的决定。',
      from: 22,
      to: 29,
    },
  ],
  nodes: {
    prologue: {
      act: 1,
      chapter: '序章',
      location: '灰湾外 · 三号公路',
      title: '灰落在肩上',
      text: [
        '灰是温的。',
        '它落在你的肩头，像一层不肯冷却的炉灰。三号公路断了七处，你走了四天，只看见一辆翻倒的巴士、一群啄食轮胎的乌鸦，以及远处那圈灯。',
        '灰湾的灯。传说里，那里还有电，有热水，有一扇在夜里会发亮的门。',
        '你摸了摸胸口。那封信还在。信封上没有名字，只有一行被雨泡开的字：交给第七层。别让他们点灯。',
        '无线电在背包里响了一声。一个女孩的声音，夹着电流：“如果你还能听见——往灯下走。不要走大路。”',
        '信号断了。',
      ],
      onEnter: { codex: ['grey-bay', 'pyre'] },
      choices: [
        {
          text: '沿着灯走下去',
          hint: '进入灰湾',
          to: 'gate',
        },
        {
          text: '先拆开那封没有署名的信',
          hint: '读取信中的内容',
          to: 'letter',
        },
      ],
    },

    letter: {
      act: 1,
      chapter: '序章',
      location: '灰湾外 · 三号公路',
      title: '没有署名的信',
      text: [
        '信纸很旧，折痕却新。字迹瘦而稳，像写字的人握笔很用力。',
        '“给我素未谋面的继承人：如果你读到这封信，说明第七层已经醒了。不要相信任何一个自称代表灰湾的人。不要让他们点灯。灯亮的时候，站在灯下的人会被看见。”',
        '“如果你一定要下去，去找沈砚。告诉他，姐姐欠他的茶，下辈子还。”',
        '落款处没有名字，只有一枚被压扁的日冕印章。你把信折好，放进内袋。远处的灯又暗了一格。',
      ],
      onEnter: { items: ['无署名的信'], codex: ['seventh-floor'] },
      choices: [{ text: '收好信，继续走向灰湾', to: 'gate' }],
    },

    gate: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '名字、来路、找谁',
      text: [
        '三号闸门比你想象得小。两扇旧船坞的铁门，焊着钢筋，门楣上挂一盏风灯。灯罩裂了，火苗却稳。',
        '门后站着一个女人，灰披风，左眼上方有一道旧疤。她没举枪，只把手按在腰间的短铳上。',
        '“名字。来路。找谁。”',
        '她身后，闸门上的扩音器正沙沙作响。你听见一个反复播放的女声：“第七分钟。请回到地下。”',
        '可现在是白天。',
      ],
      choices: [
        {
          text: '报上真名，说你来第七层',
          hint: '交涉检定 · DC 12',
          check: { attr: 'charm', dc: 12, success: 'gate_pass', fail: 'gate_shake' },
        },
        {
          text: '把信递过去',
          hint: '需要：无署名的信',
          require: { item: '无署名的信' },
          to: 'gate_letter',
        },
        {
          text: '观察她的站姿和闸门的缝隙',
          hint: '智识检定 · DC 13',
          check: { attr: 'wits', dc: 13, success: 'gate_slip', fail: 'gate_caught' },
        },
        {
          text: '递上一包压缩饼干',
          hint: '消耗 1 补给',
          cost: { supply: 1 },
          to: 'gate_bribe',
        },
      ],
    },

    gate_pass: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '灰雀',
      text: [
        '女人听完，盯了你很久。她的名字叫灰雀，黑水的人，替三街守门，一周换三包烟。',
        '“第七层十年没开过。上一个说要下去的人，回来的时候少了半张脸。”她把一枚磨得发亮的铜牌塞进你手里，“拿着。黑水不救陌生人，但认牌子。”',
        '闸门开了一条缝。灰湾的味道涌进来：潮湿的水泥、煮烂的菜叶、枪油，还有一点很淡的灯油味。',
      ],
      onEnter: { items: ['黑水铜牌'], rep: 1, codex: ['blackwater'] },
      choices: [{ text: '走进灰湾', to: 'market' }],
    },

    gate_shake: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '她读过那封信',
      text: [
        '灰雀没有笑。她伸手：“信。”',
        '你犹豫了一秒。就这一秒，她已经把信从你内袋里抽走了。她读得很快，读到“沈砚”两个字时，拇指停了一下。',
        '“这封信的墨水还没干。”她把信折好，放进自己的口袋，“谁让你来的？”',
        '你说不知道。她看了你一会儿，侧身让开：“进去吧。别去旧市政厅。今晚别去。”',
      ],
      onEnter: { flags: { letter_lost: true }, codex: ['seventh-floor'] },
      choices: [{ text: '走进灰湾', to: 'market' }],
    },

    gate_slip: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '一条不该存在的缝',
      text: [
        '你注意到闸门右侧的排水管口。铁栅栏锈断了两根，缝隙刚好够一个人侧身过去。',
        '灰雀在打哈欠。你等她转头，贴着墙根滑了进去。',
        '闸门后是一条堆满废弃轮胎的窄巷。你落地时踩到一枚铁钉，鞋底发出一声轻响。没人追来。',
        '你捡起一根还算直的锈铁丝，把它塞进袖口。',
      ],
      onEnter: { items: ['锈铁丝'], flags: { unseen: true } },
      choices: [{ text: '从窄巷进入市场', to: 'market' }],
    },

    gate_caught: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '她不喜欢聪明人',
      text: [
        '你刚挪动半步，灰雀的短铳已经抬起来，枪口稳稳对着你的膝盖。',
        '“排水管。每个新来的都看那条管子。”她走过来，搜了你的包，拿走了半包饼干，“第一次进城的税。”',
        '她把你推进闸门，又补了一句：“下次走正门。我不一定有空打你的腿。”',
      ],
      onEnter: { hp: -1, flags: { gate_shaken: true } },
      choices: [{ text: '一瘸一拐地走进市场', to: 'market' }],
    },

    gate_letter: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '她认识这个字迹',
      text: [
        '灰雀看到信纸上的日冕印章，脸色变了。她没有读内容，只把信翻到背面，用拇指摩挲那行被雨泡开的字。',
        '“沈昭的字。”她说，“这东西不该还在外面。”',
        '她把信还给你，没有收走。“进去吧。要是你见到沈砚，告诉他，灰雀还欠他一瓶酒。”',
        '闸门开了。她没再看你。',
      ],
      onEnter: { rep: 1, flags: { gate_friendly: true }, codex: ['shen-zhao'] },
      choices: [{ text: '走进灰湾', to: 'market' }],
    },

    gate_bribe: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三号闸门',
      title: '饼干比名字管用',
      text: [
        '灰雀接过饼干，捏了捏，撕开闻了一下。',
        '“北风领的。你从北边来。”她咬了一口，侧身让开，“进去吧。别惹事。灰湾的规矩很简单：欠债还钱，杀人偿命，别碰灯。”',
        '她没问你的名字。',
      ],
      onEnter: { rep: -1, flags: { bribed: true } },
      choices: [{ text: '走进灰湾', to: 'market' }],
    },

    market: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三街市场',
      title: '什么都能换的地方',
      text: [
        '三街市场建在高架桥的阴影里。塑料布、旧广告牌和防水帆布搭成一片歪歪扭扭的屋顶，底下卖的东西从子弹到腌菜都有。',
        '一台老式广播挂在路灯上，反复播着那句话。没人抬头。',
        '你看见一个穿白袍的永昼庭信徒，正把灯油分给小孩；一个黑水佣兵靠在桥墩上数旧纸币；一个瘦小的男孩从人群里挤过，手伸向你的背包。',
        '更远处，旧市政厅的钟楼没有响。它停在七点零七分，已经停了四十七年。',
      ],
      choices: [
        {
          text: '抓住那只手',
          hint: '机敏检定 · DC 12',
          check: { attr: 'agility', dc: 12, success: 'chase_boy', fail: 'chase_fail' },
        },
        {
          text: '先去桥墩下的酒馆打听消息',
          hint: '黑水佣兵常在那里',
          to: 'tavern',
        },
        {
          text: '跟上白袍信徒的队伍',
          hint: '永昼庭在发灯油',
          to: 'procession',
        },
        {
          text: '直接去旧市政厅',
          hint: '你等不及了',
          to: 'hall_early',
        },
      ],
    },

    chase_boy: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三街市场',
      title: '半个太阳',
      text: [
        '你抓住那只手腕。男孩挣了两下，忽然不动了。',
        '他十一二岁，脸上全是灰，右手戴着一只剪掉手指的旧手套。手套滑落时，你看见他掌心有一块烧伤，形状像半个太阳。',
        '“你也听见了，对不对？”他盯着你，声音压得很低，“第七层在叫人。每天晚上都叫。”',
        '他从怀里摸出半枚铜制日晷，塞进你手里。“我叫阿烬。你要是下去，带上我。我妹妹还在下面。”',
      ],
      onEnter: {
        items: ['半枚日晷'],
        flags: { aji: true },
        codex: ['aji', 'ash-children'],
      },
      choices: [{ text: '收下日晷，问他第七层的事', to: 'blackout' }],
    },

    chase_fail: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三街市场',
      title: '他跑得比你快',
      text: [
        '男孩像一条泥鳅，从你指缝里滑出去，撞翻了一筐腌菜，消失在帆布棚后面。',
        '你的背包被划开一道口子，少了一包压缩饼干。',
        '地上留下一枚铜制的东西，被踩了半脚。你捡起来，是半枚日晷，晷针停在第七格。',
      ],
      onEnter: {
        supply: -1,
        items: ['半枚日晷'],
        flags: { aji_elusive: true },
        codex: ['ash-children'],
      },
      choices: [{ text: '把日晷收进内袋', to: 'blackout' }],
    },

    tavern: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 桥墩酒馆',
      title: '黑水不养闲人',
      text: [
        '酒馆没有名字，门口挂着一块被子弹打穿的车牌。里面很暗，空气里全是劣质酒和枪油的味道。',
        '一个黑水佣兵把一杯浑浊的液体推到你面前。“新来的。你要么有货，要么有消息。两样都没有，就喝完走人。”',
        '你提到第七层。他的手停了一下。',
        '“那地方不归黑水管。”他压低声音，“但鸟先生会想知道，谁在打听它。”',
      ],
      choices: [
        {
          text: '把信里的内容卖给他',
          hint: '获得 2 补给，声望 -1',
          effects: { supply: 2, rep: -1, flags: { sold_info: true } },
          to: 'blackout',
        },
        {
          text: '用半包烟换第七层的地图',
          hint: '消耗 1 补给，获得情报',
          cost: { supply: 1 },
          effects: { flags: { blackwater_info: true }, codex: ['blackwater', 'seventh-floor'] },
          to: 'blackout',
        },
      ],
    },

    procession: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 三街市场',
      title: '永昼之后',
      text: [
        '白袍队伍走得很慢。最前面的女人没有坐轿，也没有戴冠，只提着一盏罩着铁纱的灯。',
        '她比你想象中年轻，也比你想象中疲惫。白袍袖口磨破了，手腕上有一道很旧的割伤。',
        '她看见你胸口的信，脚步停了。',
        '“那封信是我母亲的。”她说，“我叫塞拉菲娜。你从哪儿得来的？”',
        '周围的人跪了下去。她没有看他们。',
      ],
      onEnter: {
        items: ['日冕徽章'],
        rep: 1,
        flags: { sera_noticed: true },
        codex: ['sera', 'long-day'],
      },
      choices: [
        {
          text: '告诉她实话：你不知道，信是别人交给你的',
          hint: '她似乎更需要一个答案，而不是一个信徒',
          effects: { flags: { sera_honest: true } },
          to: 'blackout',
        },
        {
          text: '反问她：你母亲是谁？',
          hint: '智识检定 · DC 12',
          check: { attr: 'wits', dc: 12, success: 'blackout', fail: 'blackout' },
          effects: { flags: { sera_curious: true } },
        },
      ],
    },

    hall_early: {
      act: 1,
      chapter: '第一章',
      location: '灰湾 · 旧市政厅',
      title: '三街的规矩',
      text: [
        '旧市政厅门口堆着沙袋和铁丝网。一个穿旧军装的男人正在检查哨位，动作很慢，但每个角落都看得很仔细。',
        '他叫卓正。三街的人说，他查哨从来不迟到。',
        '“旧市政厅今天不接待。”他挡在你面前，“除非你有钥匙，或者有比钥匙更硬的理由。”',
        '你摸了摸胸口。他看见了你的动作，但没有伸手。',
      ],
      onEnter: { items: ['三街通行证'], flags: { zhuo_noticed: true }, codex: ['three-streets', 'zhuo'] },
      choices: [
        {
          text: '把信给他看',
          hint: '需要：无署名的信',
          require: { item: '无署名的信' },
          effects: { flags: { zhuo_letter: true }, rep: 1 },
          to: 'blackout',
        },
        {
          text: '收起信，只说来找工作',
          hint: '不想让更多人知道',
          to: 'blackout',
        },
      ],
    },

    blackout: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 三街',
      title: '第七秒',
      text: [
        '灯灭了。',
        '不是一盏一盏地灭，是整个灰湾同时闭上眼。广播停了。风也停了。',
        '三秒后，脚下传来一声闷响，像有什么巨大的东西在地底翻了个身。',
        '旧市政厅方向，一束苍白的光从地缝里升起来。人群开始跑。有人喊：“第七层开了！”',
        '你的口袋在发烫。那半枚日晷——或者那封信——像一块刚出炉的铁。',
      ],
      onEnter: { flags: { blackout: true } },
      choices: [
        {
          text: '逆着人流，冲向旧市政厅',
          hint: '你必须赶在别人之前',
          to: 'hall',
        },
        {
          text: '先掀开压住孩子的摊子',
          hint: '你会慢一步',
          effects: { hp: -1, rep: 2, flags: { saved_child: true } },
          to: 'rescue',
        },
        {
          text: '抓住一个跑过的信徒，问发生了什么',
          hint: '也许有人知道内情',
          to: 'grab_follower',
        },
      ],
    },

    rescue: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 三街市场',
      title: '慢一步的人',
      text: [
        '帆布棚塌了半边。一个女孩被压在货架下面，膝盖流着血，怀里还抱着一袋菌菇。',
        '你把她拖出来。她咬着牙没哭，只说：“我哥叫阿烬。你要是看见他，别告诉他我哭了。”',
        '远处，旧市政厅的光越来越亮。人群已经跑远了。',
      ],
      onEnter: { flags: { saved_aji_sister: true }, codex: ['ash-children'] },
      choices: [{ text: '把女孩交给旁边的摊贩，追向市政厅', to: 'hall' }],
    },

    grab_follower: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 三街',
      title: '赎罪',
      text: [
        '你抓住一个白袍信徒的袖子。他挣扎了一下，看见你胸口的日冕徽章，忽然安静了。',
        '“第七分钟是赎罪。”他说，眼睛亮得吓人，“神第一次睁眼的时候，我们没能接住。这一次，灯会一直亮。一直亮。”',
        '“谁告诉你的？”',
        '“灯告诉我们的。”',
        '他挣脱你的手，跑向市政厅。',
      ],
      onEnter: { codex: ['seventh-minute', 'long-day'], flags: { cult_warning: true } },
      choices: [{ text: '追上去', to: 'hall' }],
    },

    hall: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '六盏灯',
      text: [
        '旧市政厅的大厅里挤满了人，却没有一个人说话。',
        '六盏灯围成一圈，照着一扇本该焊死的铁门。门上的七个封印，已经碎了六个。',
        '塞拉菲娜站在最前面。她身后是白袍信徒和两排持枪的守备队。',
        '卓正靠在柱子上，手按枪套。鸟先生坐在台阶上，像一只真的鸟那样歪着头。祁鸢最后一个到，靴子上全是泥。她身后的高架桥上，碾骨号的汽笛低低地响了一声。',
        '门缝里透出的光，照在每个人脸上。那光不像电，也不像火。它像太阳。',
        '塞拉菲娜转过身，看着你：“钥匙在你那里，对吗？”',
      ],
      choices: [
        { text: '走向塞拉菲娜', hint: '永昼庭的女王', to: 'sera_route' },
        { text: '走向卓正', hint: '三街的守夜人', to: 'zhuo_route' },
        { text: '走向鸟先生', hint: '黑水的生意人', to: 'niao_route' },
        { text: '走向祁鸢', hint: '铁潮的车板主', to: 'qi_route' },
        { text: '后退一步，独自走向铁门', hint: '谁也不信', to: 'solo_route' },
      ],
    },

    sera_route: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '她不需要一个神',
      text: [
        '塞拉菲娜握住你的手。她的手很凉，掌心有薄茧，是长期提灯磨出来的。',
        '“我母亲也说过同样的话。”她看着铁门，“她说，灯不是给人跪的。”',
        '信徒们在她身后低声念经。她闭了一下眼睛，像在忍耐什么。',
        '“你下去之后，会看见一些东西。”她说，“如果你看见她还活着——别信她。她已经不是人了。”',
      ],
      onEnter: { flags: { companion: 'sera', sera_route: true }, trust: 1, codex: ['sera'] },
      choices: [
        {
          text: '告诉她：你不需要一个人扛',
          hint: '交涉检定 · DC 12',
          check: { attr: 'charm', dc: 12, success: 'sera_bond', fail: 'sera_distance' },
        },
        {
          text: '问她：你相信自己是神吗？',
          hint: '她也许从没被这样问过',
          to: 'sera_doubt',
        },
      ],
    },

    sera_bond: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '灯绳',
      text: [
        '她愣了一下。那层被信徒供了十几年的壳，忽然裂开一条缝。',
        '“没有人对我说过这句话。”她笑了一下，很轻，像怕被谁听见，“他们只会说，女王，灯油不够了。女王，三街又和黑水打起来了。女王，你得想办法。”',
        '她从手腕上解下一根编得很细的灯绳，系在你手上。“带着。下面很黑。灯绳能引路，也能……让我知道你还在。”',
      ],
      onEnter: { items: ['她的灯绳'], flags: { sera_bond: true }, trust: 1, rep: 1 },
      choices: [{ text: '握紧灯绳，走向铁门', to: 'descent' }],
    },

    sera_distance: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '她习惯了',
      text: [
        '她把手抽回去，笑容恢复成信徒熟悉的样子。',
        '“没关系。”她说，“大家都这么说。”',
        '她转身吩咐守备队守住门口。你看见她提灯的手在抖，但灯很稳。',
      ],
      onEnter: { flags: { sera_distance: true }, trust: 0 },
      choices: [{ text: '走向铁门', to: 'descent' }],
    },

    sera_doubt: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '一个很安静的问题',
      text: [
        '塞拉菲娜看了你很久。信徒们还在念经，没有人听见你们的对话。',
        '“不相信。”她说，“但我需要他们相信。你明白吗？如果我先说这盏灯只是台旧机器，明天就会有人把灯油偷去换子弹。”',
        '她把一枚小小的日冕别针别在你衣领上。“下去吧。看见什么，回来告诉我。别告诉他们。”',
      ],
      onEnter: { items: ['日冕别针'], flags: { sera_confession: true }, trust: 1, codex: ['sera'] },
      choices: [{ text: '走向铁门', to: 'descent' }],
    },

    zhuo_route: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '一张写满名字的纸',
      text: [
        '卓正没有握手。他递给你一张折了四折的纸，上面密密麻麻写满了名字。',
        '“三街这几年没回来的人。”他说，“我不喜欢写这个。但总得有人写。”',
        '他把另一封信塞进你口袋：“下去之后再看。要是你上不来，就别看了。”',
        '“你不怕我把钥匙给别人？”',
        '“怕。”他说，“但我更怕你什么都不知道就下去。”',
      ],
      onEnter: { flags: { companion: 'zhuo', zhuo_route: true }, trust: 1, codex: ['zhuo', 'three-streets'] },
      choices: [
        {
          text: '当着他的面拆开信',
          hint: '也许是不该看的东西',
          to: 'zhuo_open',
        },
        {
          text: '把信收好，等下去再看',
          hint: '他既然说了，就等一等',
          to: 'zhuo_sealed',
        },
      ],
    },

    zhuo_open: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '三街的备用方案',
      text: [
        '信里是一道命令：如果第七层失控，三街的工兵会炸毁旧市政厅的地基，把整座避难所埋掉。',
        '卓正看着你读完，没有解释。',
        '“三街有一千四百人。”他说，“如果只能选一个，我选他们。”',
        '他把一枚黄铜引信放进你手里。“拿着。你要是觉得上面没救了，就点火。别让灯把整座城烧了。”',
      ],
      onEnter: { items: ['三街炸药引信'], flags: { zhuo_plan: true }, trust: 1, codex: ['three-streets'] },
      choices: [{ text: '收好引信，走向铁门', to: 'descent' }],
    },

    zhuo_sealed: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '不看也行',
      text: [
        '你把信放进口袋。卓正明显松了一口气。',
        '“有时候不知道，反而能走得更远。”他说。',
        '他给守备队打了个手势。铁门前的路让开了。',
      ],
      onEnter: { flags: { zhuo_trust: true }, trust: 1 },
      choices: [{ text: '走向铁门', to: 'descent' }],
    },

    niao_route: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '一份口头的合同',
      text: [
        '鸟先生没有站起来。他拍了拍身边的台阶，示意你坐。',
        '“我不关心灯。”他说，“我关心灯下面的东西。核心有一个调节器，巴掌大，能控制整座城的电。你把它带上来，我送你出灰湾。车、船、路，你挑。”',
        '“要是我不答应？”',
        '“那你就得自己走上去。”他笑了一下，围巾下面的脸看不清，“上面现在很热闹。”',
      ],
      onEnter: { flags: { companion: 'niao', niao_route: true }, trust: 1, codex: ['niao', 'blackwater'] },
      choices: [
        {
          text: '接受他的预付款',
          hint: '获得 2 补给，声望 -1',
          effects: { supply: 2, rep: -1, flags: { niao_contract: true } },
          to: 'descent',
        },
        {
          text: '拒绝：我不替人卖一座城',
          hint: '声望 +1，保留自由',
          effects: { rep: 1, flags: { free_agent: true } },
          to: 'niao_refuse',
        },
      ],
    },

    niao_refuse: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '不卖的价钱',
      text: [
        '鸟先生沉默了一会儿，忽然笑出声。',
        '“有意思。”他站起来，拍了拍裤子上的灰，“灰湾已经很久没人说过这种话了。大部分人都先问价钱。”',
        '他递给你一枚黑水哨。“拿着。下面要是遇上黑水的人，吹一声。他们不会帮你，但也不会打你。”',
      ],
      onEnter: { items: ['黑水哨'], rep: 1, flags: { free_agent: true }, trust: 1 },
      choices: [{ text: '走向铁门', to: 'descent' }],
    },

    qi_route: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '车不等人',
      text: [
        '祁鸢没有寒暄。她抓住你的手腕，把你拉到窗边。',
        '“看见那列火车没有？七节车厢，每节都能独立供电。你要是把核心带上来，我能把它拆成七份，让整座城跑起来。”',
        '“你只是想把它偷走。”',
        '“对。”她一点也不心虚，“但我偷走之后，灰湾至少还能亮。你呢？你打算把它交给谁？那个女王？那个委员？还是那个连脸都不肯露的鸟先生？”',
        '她松开手。“你自己想。”',
      ],
      onEnter: { flags: { companion: 'qi', qi_route: true }, trust: 1, codex: ['qi', 'iron-tide'] },
      choices: [
        {
          text: '帮她修好那节接触不良的电池车',
          hint: '武艺检定 · DC 12',
          check: { attr: 'force', dc: 12, success: 'qi_repair', fail: 'qi_fail' },
        },
        {
          text: '先看她的行车图，再决定信不信她',
          hint: '智识检定 · DC 12',
          check: { attr: 'wits', dc: 12, success: 'qi_map', fail: 'qi_fail' },
        },
      ],
    },

    qi_repair: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 铁潮车阵',
      title: '一把扳手的交情',
      text: [
        '电池车的接点锈死了。你用祁鸢的扳手撬开外壳，清掉铜绿，重新压紧接线。车灯闪了两下，亮了。',
        '祁鸢看着灯，嘴角动了一下，算笑。“你以前修过车？”',
        '“修过更烂的东西。”',
        '她把扳手塞进你手里。“拿着。下面用得上。”',
      ],
      onEnter: { items: ['铁潮扳手'], flags: { qi_bond: true }, trust: 1, rep: 1 },
      choices: [{ text: '走向铁门', to: 'descent' }],
    },

    qi_map: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 铁潮车阵',
      title: '七条退路',
      text: [
        '行车图上画着七条从灰湾出去的路线，每一条都标了塌方、辐射和黑水哨站。最下面一行小字：车不等人。',
        '“你早就准备走了。”你说。',
        '“我每天都准备走。”祁鸢把图卷起来，“但我也每天都留下来。这两件事不矛盾。”',
        '她撕下地图的一角给你。“旧港下面有条维修隧道，直通第七层。别告诉别人。”',
      ],
      onEnter: { items: ['旧港维修图'], flags: { qi_bond: true, secret_route: true }, trust: 1, codex: ['grey-bay'] },
      choices: [{ text: '收好地图，走向铁门', to: 'descent' }],
    },

    qi_fail: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 铁潮车阵',
      title: '她没时间等你',
      text: [
        '你鼓捣了半天，电池车还是没亮。祁鸢把你推开，自己钻到车底，三分钟后车灯亮了。',
        '“下次别碰我的车。”她说，但没有真的生气。',
        '她跳下车，拍了拍手上的油。“走吧。下面见。”',
      ],
      onEnter: { trust: 0 },
      choices: [{ text: '走向铁门', to: 'descent' }],
    },

    solo_route: {
      act: 1,
      chapter: '第二章',
      location: '灰湾 · 旧市政厅',
      title: '一个人',
      text: [
        '你后退一步，绕过所有人，走向铁门。',
        '没人拦你。塞拉菲娜张了张嘴，卓正把手从枪套上拿开，鸟先生似乎笑了一下，祁鸢挑了挑眉。',
        '门缝里的光落在你脸上。你听见自己的心跳，比广播里的女声更响。',
        '“我很快回来。”你说。没有人回答。',
      ],
      onEnter: { flags: { solo: true }, agility: 1, items: ['半枚日晷'], codex: ['seventh-floor'] },
      choices: [{ text: '推开铁门', to: 'descent' }],
    },

    descent: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 第七层入口',
      title: '七道封印',
      text: [
        '楼梯向下延伸，像一根被折断的脊椎。应急灯每隔十几米才亮一盏，光里全是浮尘。',
        '第七层的门就在楼梯尽头。门是旧世界的合金，表面覆着一层已经钙化的灰。七道封印碎了六道，最后一道还在发出很低的嗡鸣。',
        '门中央嵌着一只铜制日晷。晷针停在第七格，和你手里的半枚一模一样。',
        '门后传来一种声音。不是机械，也不是风。像很远的地方，有人在哼一首歌。',
      ],
      onEnter: { codex: ['nine-shelters', 'seventh-floor'] },
      choices: [
        {
          text: '先读门上的刻字',
          hint: '智识检定 · DC 12',
          check: { attr: 'wits', dc: 12, success: 'seal_read', fail: 'seal_force' },
        },
        {
          text: '用蛮力撬开最后一道封印',
          hint: '武艺检定 · DC 13',
          check: { attr: 'force', dc: 13, success: 'seal_force', fail: 'seal_force' },
        },
        {
          text: '让同伴先走',
          hint: '需要同伴',
          require: { flag: 'companion' },
          effects: { trust: 1, flags: { companion_first: true } },
          to: 'stairwell',
        },
        {
          text: '直接推门',
          hint: '你已经没有耐心了',
          to: 'stairwell',
        },
      ],
    },

    seal_read: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 第七层入口',
      title: '不要在第七分钟点灯',
      text: [
        '刻字很浅，被灰填满了。你用袖子擦了很久，才读出来。',
        '“第七层封存命令：任何人不得在第七分钟接入核心。核心需要导体，不需要神。若听见歌声，不要回答。”',
        '下面还有一行更小的字，像是后来有人用指甲刻的：“妈妈，我听见了。”',
        '你把手从门上移开。歌声停了。',
      ],
      onEnter: { flags: { read_seals: true }, codex: ['seventh-minute', 'conductor'] },
      choices: [{ text: '推开门，走进第七层', to: 'stairwell' }],
    },

    seal_force: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 第七层入口',
      title: '最后一道封印',
      text: [
        '你把撬棍插进门缝，用力压下去。合金发出刺耳的呻吟，最后一道封印裂开，碎屑落了一地。',
        '门开了一条缝。光从里面涌出来，照得你睁不开眼。',
        '你的手掌被震裂了，血顺着手腕滴到日晷上。晷针动了一下。',
      ],
      onEnter: { hp: -1, flags: { forced_door: true } },
      choices: [{ text: '侧身挤进去', to: 'stairwell' }],
    },

    stairwell: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 下行通道',
      title: '水线',
      text: [
        '门后不是房间，是一条向下的维修通道。水漫到膝盖，水面上漂着一层灰白色的膜。',
        '墙上的水位线一路向上，最后停在离天花板不到半米的地方。有人用红漆在最高处写了一个数字：47。',
        '通道尽头有两条路：一条直接穿过积水，另一条钻进修配间的窄门。',
        '你的同伴在你身后停下，等你决定。',
      ],
      choices: [
        {
          text: '涉水过去',
          hint: '武艺检定 · DC 12',
          check: { attr: 'force', dc: 12, success: 'flood_cross', fail: 'flood_fail' },
        },
        {
          text: '钻进修配间，找另一条路',
          hint: '智识检定 · DC 13',
          check: { attr: 'wits', dc: 13, success: 'maintenance', fail: 'flood_fail' },
        },
        {
          text: '让同伴带路',
          hint: '需要同伴',
          require: { flag: 'companion' },
          effects: { trust: 1 },
          to: 'mushroom',
        },
      ],
    },

    flood_cross: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 下行通道',
      title: '水下有东西',
      text: [
        '水比想象中冷。你走到一半，脚踝被什么东西缠住了。',
        '你低头，看见一截旧电缆，上面挂着一只防水的配给箱。你把它拽上来，箱子没锁，里面是几包密封完好的压缩粮。',
        '你回头看了一眼。水面很静，灰膜重新合拢，像什么都没发生过。',
      ],
      onEnter: { supply: 1, codex: ['ration'] },
      choices: [{ text: '继续向下', to: 'mushroom' }],
    },

    flood_fail: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 下行通道',
      title: '呛了一口',
      text: [
        '水下的电缆比你想象中多。你被绊倒，整个人栽进水里，呛了一大口。',
        '水有铁锈味，还有一点甜。你爬起来，咳了很久，肺里像塞了一把碎玻璃。',
        '同伴把你拉上岸。你听见通道深处传来一声轻响，像有人关上了一扇门。',
      ],
      onEnter: { hp: -1 },
      choices: [{ text: '咳着继续向下', to: 'mushroom' }],
    },

    maintenance: {
      act: 2,
      chapter: '第三章',
      location: '第九避难所 · 修配间',
      title: '管线图',
      text: [
        '修配间里全是拆到一半的旧机器。墙上钉着一张管线图，标着第七层的冷却回路和三个紧急出口。',
        '你撕下图纸，发现背面有人写了一行字：“如果你走到这里，说明门已经开了。去菌圃找沈砚。别碰红色的阀门。”',
        '你从工具架上拿了一把还能用的绝缘钳。',
      ],
      onEnter: { items: ['绝缘钳', '第七层管线图'], codex: ['nine-shelters'] },
      choices: [{ text: '从修配间的侧门出去', to: 'mushroom' }],
    },

    mushroom: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 菌圃层',
      title: '茶是假的，故事是真的',
      text: [
        '菌圃层比上面暖和。成排的铁架上长着发蓝的菌伞，灯光一明一暗，像一片潮湿的星空。',
        '一个老人坐在架子下面，眼睛蒙着灰布。他面前摆着三只杯子。',
        '“你迟到了七年。”他说，“坐吧。茶是假的，故事是真的。”',
        '他叫沈砚。第九避难所最后一个还在编档案的人。',
      ],
      onEnter: { codex: ['shen-yan', 'ash-tide'] },
      choices: [
        { text: '听他说完葬火那天的事', hint: '这可能是你唯一一次听到真话', to: 'truth' },
        { text: '先问第七层怎么走', hint: '你没有时间', to: 'truth_short' },
        {
          text: '问他认不认识信上的字迹',
          hint: '需要：无署名的信',
          require: { item: '无署名的信' },
          to: 'truth_letter',
        },
        { text: '去墙角看看那堆旧枪', hint: '也许还能用', to: 'side_armory' },
        { text: '跟管道里的孩子走', hint: '他们知道一些大人不知道的事', to: 'side_kids' },
        { text: '帮角落里那个发烧的女人', hint: '她快不行了', to: 'side_clinic' },
      ],
    },

    truth: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 菌圃层',
      title: '天空是怎么烧起来的',
      text: [
        '沈砚把杯子推到你面前。茶是温的，有菌菇的土味。',
        '“旧世界造了十二个太阳，想烧穿灰层。”他说，“第七号在灰湾。点火那天，滤网失效，平流层被点着了。天上烧了九天，落下来的灰埋了半个世界。”',
        '“官方的说法是意外。”',
        '“官方还说是灰潮杀了四千人。”沈砚笑了一下，笑得很轻，“第七分钟那天，灯亮了。上面的人以为地表恢复了，全往闸门跑。闸门没开。踩死的，挤死的，掉进排水渠的。四千人。不是灰杀的，是人杀的。”',
        '“谁下令不开门？”',
        '“六方共管。”他说，“那时候还没有六方。只有三个人。其中一个是我姐姐。”',
      ],
      onEnter: { flags: { truth: true }, codex: ['pyre-truth', 'seventh-minute'] },
      choices: [
        {
          text: '问他：沈昭是谁？',
          hint: '信上的名字',
          to: 'truth_shenzhao',
        },
        {
          text: '问：还有多少人知道这些？',
          hint: '也许不该问',
          to: 'truth_keep',
        },
      ],
    },

    truth_letter: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 菌圃层',
      title: '姐姐的字',
      text: [
        '沈砚摸到信纸，指尖在字迹上停了很久。',
        '“她的字。她写字的时候，最后一笔总是往上挑。”他把信贴在胸口，像在听什么。',
        '“我姐姐叫沈昭。第七号核心的最后一任导体。她接入核心那年，塞拉菲娜四岁。”',
        '他从抽屉里摸出一本防水笔记，递给你。“她留下的。上面有第七层的全部结构图，还有一句我没看懂的话。”',
        '笔记最后一页写着：“不要给我找神。给我找一个人。”',
      ],
      onEnter: {
        items: ['沈昭的笔记'],
        flags: { shenzhao: true },
        codex: ['shen-zhao', 'conductor'],
      },
      choices: [{ text: '坐下来，听他把话说完', to: 'truth' }],
    },

    truth_shenzhao: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 菌圃层',
      title: '她不是神',
      text: [
        '“我姐姐是第七号核心的总工程师。”沈砚说，“也是最后一任导体。她把自己接进去，稳住了灰湾四十七年的灯。”',
        '“塞拉菲娜知道吗？”',
        '“她知道她母亲在第七层。她不知道母亲已经不算活着了。”',
        '沈砚把一杯冷茶倒在地上。“你要是见到她，别叫她英雄。她最恨这个词。”',
      ],
      onEnter: { flags: { shenzhao: true }, codex: ['shen-zhao', 'sera'] },
      choices: [{ text: '把茶喝完，去配给站', to: 'ration' }],
    },

    truth_keep: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 菌圃层',
      title: '知道的人越少越好',
      text: [
        '“现在活着的，只剩我、塞拉菲娜，还有鸟先生。”沈砚说，“鸟先生知道一半。他以为核心是台发电机。让他继续这么以为。”',
        '“为什么不告诉所有人？”',
        '“因为真相不能当饭吃。”他把杯子收走，“而且，知道真相的人，通常会想用它做点什么。”',
      ],
      onEnter: { flags: { truth_partial: true }, codex: ['pyre-truth'] },
      choices: [{ text: '去配给站', to: 'ration' }],
    },

    truth_short: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 菌圃层',
      title: '别碰日晷',
      text: [
        '沈砚没有留你。他指了个方向：“往下三层，走冷却管旁边的梯子。门认血，不认钥匙。”',
        '“还有呢？”',
        '“别让任何人碰日晷。”他顿了顿，“尤其是那个自称女王的小姑娘。她母亲就是这么没的。”',
        '你走出菌圃时，听见他在身后说：“你要是上来了，替我给灰雀带瓶酒。”',
      ],
      onEnter: { flags: { warned: true }, codex: ['seventh-floor'] },
      choices: [{ text: '去配给站', to: 'ration' }],
    },

    side_armory: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 旧军械间',
      title: '三发子弹',
      text: [
        '墙角堆着几个被撬开的枪箱。大部分枪已经锈死，只有一把旧式左轮还能转。',
        '你擦掉枪膛里的灰，发现弹巢里还剩三发子弹。',
        '沈砚在外面说：“拿吧。但别用它对着自己人。下面的人已经够少了。”',
      ],
      onEnter: { items: ['旧式左轮'], flags: { armed: true }, codex: ['ration'] },
      choices: [{ text: '把枪别在腰后，去配给站', to: 'ration' }],
    },

    side_kids: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 通风管',
      title: '灰孩的秘密',
      text: [
        '管道里挤着四个孩子，最大的不过十二岁。他们看见你，不躲，也不说话。',
        '阿烬从最里面钻出来。他看见你手里的半枚日晷，眼睛亮了。',
        '“你拿到了。”他摸出另外半枚，拼在一起。日晷合拢，晷针转了一圈，停在第七格。',
        '“这是我妈留下的。”他说，“她说，等两半合上的时候，第七层就会开门。”',
      ],
      onEnter: { items: ['完整日晷'], flags: { full_sundial: true, aji: true }, rep: 1, codex: ['aji'] },
      choices: [{ text: '把日晷收好，去配给站', to: 'ration' }],
    },

    side_clinic: {
      act: 2,
      chapter: '第四章',
      location: '第九避难所 · 临时诊所',
      title: '林素',
      text: [
        '女人躺在两张拼起来的桌子上，胸口盖着一块湿布。她的呼吸很浅，眼睛却一直睁着。',
        '“你是要下去的人？”她问。你点头。',
        '“我叫林素。”她说，“我女儿在三街。她叫林小满。你要是上去了，告诉她，我没有把她卖掉。我是真的走不动了。”',
        '你握住她的手。她的手很烫。',
      ],
      onEnter: { flags: { promise: true }, rep: 1, codex: ['names'] },
      choices: [{ text: '答应她，去配给站', to: 'ration' }],
    },

    ration: {
      act: 2,
      chapter: '第五章',
      location: '第九避难所 · 配给站',
      title: '只够三天',
      text: [
        '配给站的门只开了一条缝。里面是最后一批压缩粮，外面是三百多张脸。',
        '管配给的老人把册子摊在桌上：“按人头，只够三天。你要我怎么发？”',
        '你身后，有人开始砸门。',
        '你的同伴靠在墙边，没有说话。',
      ],
      choices: [
        {
          text: '把门打开，先让孩子进来',
          hint: '声望 +3，消耗 2 补给',
          effects: { rep: 3, supply: -2, flags: { fed_people: true } },
          to: 'barracks',
        },
        {
          text: '按册子发，谁也不能多拿',
          hint: '智识检定 · DC 13',
          check: { attr: 'wits', dc: 13, success: 'ration_order', fail: 'ration_fail' },
        },
        {
          text: '封存粮食，留给第七层',
          hint: '补给 +2，声望 -2',
          effects: { supply: 2, rep: -2, flags: { hoarded: true } },
          to: 'barracks',
        },
        {
          text: '让同伴来决定',
          hint: '需要同伴',
          require: { flag: 'companion' },
          effects: { trust: 1, rep: 1 },
          to: 'barracks',
        },
      ],
    },

    ration_order: {
      act: 2,
      chapter: '第五章',
      location: '第九避难所 · 配给站',
      title: '一行一行地发',
      text: [
        '你把册子翻到第一页，让所有人排成一列。有人骂，有人哭，但队伍慢慢动了。',
        '发到第七十个人的时候，你发现册子上有一个重复的名字。老人低下头：“我孙子的。他上个月没了，我没划掉。”',
        '你划掉那个名字，把份额给了队尾的女人。没有人说话。',
      ],
      onEnter: { rep: 2, flags: { order: true } },
      choices: [{ text: '发完最后一份，去旧校场', to: 'barracks' }],
    },

    ration_fail: {
      act: 2,
      chapter: '第五章',
      location: '第九避难所 · 配给站',
      title: '门被砸开了',
      text: [
        '你刚念到第三页，人群就涌了上来。有人抢走了册子，有人掀翻了桌子。',
        '混乱中，你被推倒在地，后脑撞上货架。等你爬起来，粮袋已经空了。',
        '老人坐在角落里，手里还攥着半张配给单。他没有看你。',
      ],
      onEnter: { hp: -1, rep: -1, flags: { riot: true } },
      choices: [{ text: '捂着后脑，去旧校场', to: 'barracks' }],
    },

    barracks: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 旧校场',
      title: '二十五支枪',
      text: [
        '旧校场被太阳避难所的人占了。二十五支枪，一排整齐的睡袋，一口正在冒热气的锅。',
        '带队的女人自称“副官”。她说：“伟大同志要那把钥匙。你可以自己交，也可以让我们拿。”',
        '她身后，枪口没有抬起来，但也没有放下。',
        '你看见校场角落堆着几箱炸药。引线还是新的。',
      ],
      onEnter: { codex: ['sun-shelter'] },
      choices: [
        {
          text: '谈判：灯亮之后，三街和避难所平分电力',
          hint: '交涉检定 · DC 14',
          check: { attr: 'charm', dc: 14, success: 'sun_alliance', fail: 'barracks_fight' },
        },
        {
          text: '撒谎：钥匙已经给了永昼庭',
          hint: '智识检定 · DC 13',
          check: { attr: 'wits', dc: 13, success: 'sun_bluff', fail: 'barracks_fight' },
        },
        {
          text: '拔出武器，先发制人',
          hint: '武艺检定 · DC 14',
          check: { attr: 'force', dc: 14, success: 'sun_beaten', fail: 'barracks_fight' },
        },
        {
          text: '退回管道，绕路',
          hint: '机敏检定 · DC 13',
          check: { attr: 'agility', dc: 13, success: 'bypass', fail: 'captured' },
        },
      ],
    },

    sun_alliance: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 旧校场',
      title: '一张配给章',
      text: [
        '副官听完，没有立刻回答。她转身走进帐篷，过了很久才出来。',
        '“伟大同志说，可以谈。”她把一枚太阳纹配给章别在你胸前，“但你要记住，谈判不是信任。你欠我们一次。”',
        '校场让开一条路。锅里的汤还在冒热气。',
      ],
      onEnter: { items: ['太阳配给章'], flags: { sun_ally: true }, rep: 1, codex: ['sun-shelter'] },
      choices: [{ text: '穿过校场，走向第七层', to: 'core_door' }],
    },

    sun_bluff: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 旧校场',
      title: '一个太顺的谎',
      text: [
        '副官盯着你看了十秒。你听见她身后的枪机轻轻响了一下。',
        '“永昼庭的人昨天还在找我们要粮。”她说，“他们要是拿到了钥匙，第一件事就是来缴我们的枪。”',
        '她抬手，让开路。“滚。别让我再看见你。”',
        '你走过去的时候，后背全是冷汗。',
      ],
      onEnter: { flags: { sun_suspicious: true }, rep: -1 },
      choices: [{ text: '快步离开', to: 'core_door' }],
    },

    sun_beaten: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 旧校场',
      title: '校场上的血',
      text: [
        '你比副官快了一步。枪响的时候，你已经滚到货箱后面。',
        '三分钟后，校场安静下来。太阳避难所的人退了，留下两具尸体和一口打翻的锅。',
        '副官靠在墙上，捂着肩膀，看着你。“你会后悔的。”她说，“不是为今天。是为以后。”',
        '你没有杀她。你从她身边走过去。',
      ],
      onEnter: { hp: -1, rep: -2, flags: { sun_enemy: true } },
      choices: [{ text: '走向第七层', to: 'core_door' }],
    },

    barracks_fight: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 旧校场',
      title: '枪声',
      text: [
        '第一枪打在你脚边的铁板上。你没有选择，只能还击。',
        '校场里全是回声。你不知道过了多久，直到副官喊停。',
        '“走！”她指着通道，“带着你的钥匙走！但别再从这条路过！”',
        '你捂着肋下的伤口，退进通道。',
      ],
      onEnter: { hp: -2, rep: -1, flags: { sun_enemy: true } },
      choices: [{ text: '捂着伤口，走向第七层', to: 'core_door' }],
    },

    bypass: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 维修管',
      title: '从上面绕过去',
      text: [
        '你退回管道，从旧校场的上方绕了过去。脚下的铁皮很薄，你能听见下面的人在说话，但没人抬头。',
        '管道尽头是一扇锁着的检修门。你用绝缘钳剪断锁舌，门后就是第七层的冷却管廊。',
      ],
      onEnter: { codex: ['seventh-floor'] },
      choices: [{ text: '钻进冷却管廊', to: 'core_door' }],
    },

    captured: {
      act: 2,
      chapter: '第六章',
      location: '第九避难所 · 旧校场',
      title: '被缴了械',
      text: [
        '你刚翻上管道，脚踝就被一只手抓住。',
        '太阳避难所的人把你拖下来，缴了你的包。副官翻开你的口袋，找到日晷，看了很久。',
        '“带他下去。”她说，“伟大同志要亲眼看看那扇门。”',
        '他们押着你走向第七层。你至少还活着。',
      ],
      onEnter: { supply: -2, flags: { sun_captor: true }, rep: -1 },
      choices: [{ text: '被押着走向第七层', to: 'core_door' }],
    },

    core_door: {
      act: 2,
      chapter: '第七章',
      location: '第七层 · 日晷门',
      title: '门认血',
      text: [
        '第七层的门没有把手。门上嵌着一只铜制日晷，晷针停在第七格。',
        '沈砚说，这扇门认血。不是随便谁的血——是发过誓的人的血。',
        '你听见门后有人在哼歌。这次更近了。',
      ],
      choices: [
        {
          text: '割开手掌，按在日晷上',
          hint: '失去 2 生命',
          effects: { hp: -2, flags: { blood_key: true } },
          to: 'core',
        },
        {
          text: '让同伴来',
          hint: '需要同伴。信任 -1',
          require: { flag: 'companion' },
          effects: { trust: -1, flags: { companion_wounded: true } },
          to: 'core',
        },
        {
          text: '用阿烬的日晷',
          hint: '需要：半枚日晷或完整日晷',
          require: { anyFlags: ['aji', 'full_sundial'] },
          effects: { flags: { sundial_key: true } },
          to: 'core',
        },
        {
          text: '找门的机械旁路',
          hint: '智识检定 · DC 15',
          check: { attr: 'wits', dc: 15, success: 'core', fail: 'core_burn' },
        },
      ],
    },

    core: {
      act: 2,
      chapter: '第七章',
      location: '第七层 · 核心室',
      title: '太阳的尸骸',
      text: [
        '门后是一座教堂。',
        '不，比教堂更大。穹顶高得看不见顶，四壁全是旧世界的电缆和冷却管，像一棵倒挂的巨树。树根的中心悬着一颗黑色的球体，球体表面裂开无数细缝，缝里透出白金色的光。',
        '那就是太阳。它没有你想象中那么亮，反而像一颗正在冷却的心。',
        '一个女人的声音从四面八方传来：“你来了。”',
        '她不是活人。她是一段被接进核心的意识投影，穿着旧世界的工程师制服，脸和塞拉菲娜有七分像。',
        '“我叫沈昭。”她说，“第七号核心的最后一任导体。你手里那封信，是我写的。”',
      ],
      onEnter: {
        codex: ['helios', 'conductor', 'shen-zhao', 'seventh-floor'],
        flags: { met_shenzhao: true, truth: true },
      },
      choices: [
        {
          text: '问她：有没有不牺牲人的办法？',
          hint: '你想知道所有的路',
          to: 'core_options',
        },
        {
          text: '看向同伴：你早就知道？',
          hint: '需要同伴',
          require: { flag: 'companion' },
          to: 'core_companion',
        },
        {
          text: '伸手触碰那团光',
          hint: '武艺检定 · DC 14',
          check: { attr: 'force', dc: 14, success: 'core_vision', fail: 'core_burn' },
        },
        {
          text: '什么也不碰，先听完',
          hint: '你还需要时间',
          to: 'betrayal',
        },
      ],
    },

    core_options: {
      act: 2,
      chapter: '第七章',
      location: '第七层 · 核心室',
      title: '三条路',
      text: [
        '沈昭的投影抬起手，空中浮现出三组旧图纸。',
        '“第一条路：找一个导体，把核心重新点亮。灰湾会重新拥有白昼。导体会在几年里慢慢消失。”',
        '“第二条路：把核心拆成十二份，分给十二个街区。每个街区都能亮，但没有一个街区能独自重启旧世界。”',
        '“第三条路：把核心封死。灯会灭，灰湾会退回黑暗，但没有人能再用它点一场火。”',
        '“还有第四条。”她说，“但那条路需要很多人。多到你现在还没有。”',
        '投影闪了一下。你听见远处传来脚步声。',
      ],
      onEnter: { codex: ['three-ways', 'old-network'], flags: { options: true } },
      choices: [{ text: '记住这三条路，转身面对来人', to: 'betrayal' }],
    },

    core_companion: {
      act: 2,
      chapter: '第七章',
      location: '第七层 · 核心室',
      title: '每个人都有自己的账',
      text: [
        '你的同伴没有立刻回答。ta看着那颗黑色的太阳，脸上有一种你从没见过的表情。',
        '“我早就知道一部分。”ta说，“但知道和看见，不一样。”',
        '“你想要它吗？”',
        '“我想要……”',
        'ta停住了。你听见ta的呼吸，和核心的低鸣混在一起。',
        '“我想要我的人活过这个月。”ta说，“至于下个月，我不敢想。”',
      ],
      onEnter: { codex: ['conductor'] },
      choices: [
        {
          text: '告诉ta：你不需要一个人做这个决定',
          hint: '信任 +1',
          effects: { trust: 1 },
          to: 'betrayal',
        },
        {
          text: '告诉ta：那你最好现在就开始想',
          hint: '信任 -1',
          effects: { trust: -1 },
          to: 'betrayal',
        },
      ],
    },

    core_vision: {
      act: 2,
      chapter: '第七章',
      location: '第七层 · 核心室',
      title: '余烬之视',
      text: [
        '你的手指碰到球体。没有灼痛，只有一阵强烈的眩晕。',
        '你看见了旧世界：白色的城市，玻璃塔，一条穿过云层的轨道。你看见一个四岁的小女孩站在观测台上，仰头看着天空。',
        '然后天空烧了起来。',
        '你看见沈昭把女孩推进电梯，看见她转身走向核心，看见她把自己的神经一根一根接进去。你听见她说的最后一句话：“别让她下来。”',
        '你松开手，跪在地上。你的眼睛开始发烫。从现在起，你能看见热量、电流，和别人的心跳。',
      ],
      onEnter: {
        items: ['余烬之视'],
        flags: { saw_truth: true, vision: true },
        codex: ['vision', 'shen-zhao'],
        hp: -1,
      },
      choices: [{ text: '站起来，面对来人', to: 'betrayal' }],
    },

    core_burn: {
      act: 2,
      chapter: '第七章',
      location: '第七层 · 核心室',
      title: '你不够格',
      text: [
        '你的手刚靠近球体，光就变成了白色。一股看不见的力量把你掀翻在地。',
        '你的袖口烧着了，皮肤上留下一道像树枝一样的焦痕。',
        '沈昭的投影低头看着你：“对不起。你不是导体。”',
        '远处，脚步声越来越近。',
      ],
      onEnter: { hp: -2, flags: { burned: true } },
      choices: [{ text: '爬起来，面对来人', to: 'betrayal' }],
    },

    betrayal: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '六枚印章',
      text: [
        '枪声。子弹擦过日晷，打碎了沈昭的投影。',
        '通道口涌进一群人。不是太阳避难所，也不是黑水——是你们自己的队伍。',
        '领队的人举着一张盖了六枚印章的纸：“灰湾安全委员会决议：第七层的一切资产，由六方共管。”',
        '你看向同伴。同伴没有看你。',
        '墙上的日晷一格一格地暗下去。七分钟。',
      ],
      choices: [
        {
          text: '把钥匙交给同伴，相信ta',
          hint: '需要信任 3',
          require: { trustMin: 3 },
          to: 'stand_together',
        },
        {
          text: '把钥匙交给同伴。你已经没有别的选择。',
          hint: '信任不足 3。ta会怎么做？',
          require: { trustMax: 2 },
          to: 'betrayed',
        },
        {
          text: '把钥匙藏进袖口，趁乱冲上楼梯',
          hint: '机敏检定 · DC 14',
          check: { attr: 'agility', dc: 14, success: 'escape_alone', fail: 'caught' },
        },
        {
          text: '启动消防闸门，把追兵关在外面',
          hint: '武艺检定 · DC 15',
          check: { attr: 'force', dc: 15, success: 'seal_pursuers', fail: 'wounded_escape' },
        },
        {
          text: '把钥匙扔给他们，自己先活下来',
          hint: '你会失去它',
          effects: { flags: { key_lost: true }, rep: -1 },
          to: 'caught',
        },
      ],
    },

    stand_together: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '站在你这边',
      text: [
        '你的同伴接过钥匙，转身挡在你前面。',
        '“决议上写的是六方共管。”ta对领队说，“不是六方分赃。你们要拿，先问过第七层的人。”',
        '领队没有动。通道里安静了几秒。',
        '然后，你的同伴把钥匙扔回给你。“走。”ta说，“我断后。”',
      ],
      onEnter: { flags: { companion_ally: true }, rep: 1, trust: 1 },
      choices: [{ text: '带着钥匙冲上楼梯', to: 'surface' }],
    },

    betrayed: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '一只没有伸出的手',
      text: [
        '你的同伴接过钥匙，后退一步，把它交给了领队。',
        '“对不起。”ta说。你没有听见后半句。',
        '领队的人把你按在地上。你听见核心发出一声低鸣，像有什么东西在笑。',
        '他们把你拖进维修通道。门关上前，你看见你的同伴站在原地，没有追上来。',
      ],
      onEnter: { hp: -2, flags: { betrayed: true }, rep: -1 },
      choices: [{ text: '从维修通道爬回地面', to: 'surface' }],
    },

    escape_alone: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '一个人跑',
      text: [
        '你比所有人都快。楼梯在脚下震动，子弹打在铁扶手上，溅出一串火星。',
        '你冲出第七层时，身后传来一声巨响。消防闸门落下来，把追兵隔在下面。',
        '你靠在墙上喘气。钥匙还在你手里。',
      ],
      onEnter: { flags: { alone: true }, agility: 1 },
      choices: [{ text: '向上，回到地面', to: 'surface' }],
    },

    caught: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '醒在灰里',
      text: [
        '你不记得自己是怎么被打倒的。醒来时，你躺在旧市政厅门口的台阶上，脸上全是灰。',
        '钥匙不在了。周围的人都在往同一个方向跑。',
        '你抬起头。灰湾所有的灯都亮着，亮得刺眼。',
      ],
      onEnter: { flags: { key_lost: true }, hp: -1 },
      choices: [{ text: '爬起来，看向钟楼', to: 'surface' }],
    },

    seal_pursuers: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '把门放下',
      text: [
        '你砸开消防闸门的控制盒，拉下红色的手柄。',
        '闸门从天花板落下来，砸碎了通道口的铁架。有人在外面喊你的名字。你没有回头。',
        '核心室安静下来，只剩日晷的滴答声。你带着钥匙走向维修梯。',
      ],
      onEnter: { flags: { sealed_them: true }, rep: -1, hp: -1 },
      choices: [{ text: '爬向地面', to: 'surface' }],
    },

    wounded_escape: {
      act: 2,
      chapter: '第八章',
      location: '第七层 · 核心室',
      title: '血在身后',
      text: [
        '闸门卡住了。你用力扳动杠杆，肩膀被子弹擦过，血顺着手臂流进袖口。',
        '闸门终于落下。你从维修梯往上爬，每一级都留下一个暗红的印子。',
        '钥匙还在。你还活着。',
      ],
      onEnter: { hp: -2, flags: { wounded: true } },
      choices: [{ text: '爬向地面', to: 'surface' }],
    },

    surface: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 地面',
      title: '所有的灯都亮了',
      text: [
        '灰湾的天空是一种旧伤口的颜色。',
        '灰潮已经压到外城区。所有的灯都亮着——每一盏路灯、每一扇窗、每一块已经死掉的招牌。核心正在醒来。',
        '人们从地下涌出来，有人哭，有人笑，有人跪在地上。广播里那个女声消失了，取而代之的是电流的尖啸。',
        '你看见海关钟楼还站着。如果还有人能听见你，只可能是那里。',
        '但在此之前，你得决定先救哪一边。',
      ],
      choices: [
        {
          text: '去三街市场。那里人最多。',
          hint: '武艺检定 · DC 13',
          check: { attr: 'force', dc: 13, success: 'save_market', fail: 'save_market_fail' },
        },
        {
          text: '去北风农庄。粮食烧了，整座城都撑不过冬天。',
          hint: '智识检定 · DC 13',
          check: { attr: 'wits', dc: 13, success: 'save_farm', fail: 'save_farm_fail' },
        },
        {
          text: '去永昼庭的灯网。没有电，塔也开不了。',
          hint: '智识检定 · DC 14',
          check: { attr: 'wits', dc: 14, success: 'save_grid', fail: 'save_grid_fail' },
        },
        {
          text: '去灰湾港。那里还有船。',
          hint: '机敏检定 · DC 13',
          check: { attr: 'agility', dc: 13, success: 'save_port', fail: 'save_port_fail' },
        },
      ],
    },

    save_market: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 三街市场',
      title: '三十个人',
      text: [
        '市场已经烧穿了半边。你冲进去，把被困在帆布棚下的人一个一个拖出来。',
        '第三十个是个老太太，怀里抱着一只装菌菇的篮子。她不肯走，说那是她孙子一周的口粮。',
        '你把篮子接过来，背起她往外跑。身后的棚子塌了。',
      ],
      onEnter: { rep: 2, flags: { saved_market: true } },
      choices: [{ text: '把人交给三街的急救队，转向钟楼', to: 'tower' }],
    },

    save_market_fail: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 三街市场',
      title: '你只救出十一个',
      text: [
        '火比你想得快。你冲进去两次，第二次被热浪掀了出来。',
        '你只救出十一个人。还有很多人没能出来。',
        '你跪在地上咳，肺里全是烟。有人拍了拍你的肩，把你拉起来。',
      ],
      onEnter: { hp: -1, rep: 1, flags: { saved_market: true } },
      choices: [{ text: '爬起来，转向钟楼', to: 'tower' }],
    },

    save_farm: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 北风农庄',
      title: '最后一季',
      text: [
        '灰已经埋到温室的腰。你带着农庄的人挖开排水渠，把水引进田里，压住即将复燃的灰。',
        '商爵士站在田埂上，手里拿着一把旧剑，脸上全是泥。',
        '“能保住多少？”你问。',
        '“三成。”他说，“够了。够撑到下一季。”',
      ],
      onEnter: { supply: 3, flags: { saved_farm: true }, codex: ['northwind'] },
      choices: [{ text: '扛起一袋种子，转向钟楼', to: 'tower' }],
    },

    save_farm_fail: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 北风农庄',
      title: '灰落进土里',
      text: [
        '你来晚了。温室塌了，田里全是灰。商爵士蹲在地上，用手捧起一把土，又慢慢松开。',
        '“明年吧。”他说。声音很平静，像在说一件已经发生的事。',
        '你帮他们把还能用的种子抢出来，装上车。',
      ],
      onEnter: { supply: -1, flags: { saved_farm: true } },
      choices: [{ text: '推着种子车，转向钟楼', to: 'tower' }],
    },

    save_grid: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 灯网控制站',
      title: '把电留住',
      text: [
        '灯网控制站里全是烧焦的继电器。你按照管线图，切断过载的支路，把剩下的电引向钟楼。',
        '塞拉菲娜站在门口，提着她那盏铁纱灯。她没有进来，只看着你。',
        '“钟楼能用了。”你说。',
        '她点头。“那就去吧。”',
      ],
      onEnter: { flags: { grid: true }, rep: 1, codex: ['long-day'] },
      choices: [{ text: '沿着电缆，跑向钟楼', to: 'tower' }],
    },

    save_grid_fail: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 灯网控制站',
      title: '电在你手里烧断了',
      text: [
        '你剪错了线。整座控制站爆出一团蓝光，你的手被电弧灼伤。',
        '灯网没有全灭，但钟楼那条线断了。你只能从备用电池重新接一条。',
        '时间不多了。',
      ],
      onEnter: { hp: -1, flags: { grid: true } },
      choices: [{ text: '抱着备用电池，跑向钟楼', to: 'tower' }],
    },

    save_port: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 灰湾港',
      title: '退路',
      text: [
        '港区的起重机正在倒塌。你冲进控制室，把还能用的船闸打开，让三艘旧渡船驶出泊位。',
        '黑水的人已经把码头清空。鸟先生站在集装箱上，看见你，抬了抬下巴。',
        '“船能走。”他说，“但只能走一趟。你上不上？”',
      ],
      onEnter: { flags: { escape_route: true }, items: ['船票'], codex: ['blackwater'] },
      choices: [
        { text: '不上。我还有事要做。', to: 'tower' },
        { text: '让船先走，把位置留给别人', effects: { rep: 1, flags: { boat_saved: true } }, to: 'tower' },
      ],
    },

    save_port_fail: {
      act: 3,
      chapter: '第九章',
      location: '灰湾 · 灰湾港',
      title: '船闸卡死了',
      text: [
        '船闸的液压管爆了。你眼睁睁看着三艘渡船挤在港口，一艘接一艘地撞上防波堤。',
        '你只救下一条小艇。鸟先生的人把它推下水，载走了七个孩子。',
        '你转身跑向钟楼。',
      ],
      onEnter: { hp: -1, flags: { escape_route: true } },
      choices: [{ text: '跑向钟楼', to: 'tower' }],
    },

    tower: {
      act: 3,
      chapter: '第十章',
      location: '灰湾 · 海关钟楼',
      title: '七分钟',
      text: [
        '钟楼顶上的风有盐味，也有烧焦的塑料味。',
        '下面，灰湾像一张由光和暗组成的电路图。上面，灰层正在变薄。四十七年来，你第一次看见星星。',
        '核心的钥匙在你手里发烫。发射机坏了，但备用电池还有一格电。',
        '你有七分钟，也许更少。',
        '塞拉菲娜、卓正、鸟先生、祁鸢陆续爬上塔顶。没有人说话。他们都在等你。',
      ],
      choices: [
        {
          text: '把自己接进日晷。让灰湾亮下去。',
          hint: '以身为芯',
          to: 'ending_longlight',
        },
        {
          text: '把钥匙交给塞拉菲娜。让永昼庭守住这盏灯。',
          hint: '需要：永昼庭的信任，声望 3',
          require: { anyFlags: ['sera_bond', 'sera_route'], rep: 3 },
          to: 'ending_newday',
        },
        {
          text: '把核心拆成十二份，交给十二个街区。',
          hint: '需要：在配给站赢得人心',
          require: { flag: 'fed_people' },
          to: 'ending_sharefire',
        },
        {
          text: '封死第七层，带人离开灰湾。',
          hint: '灯会灭，但没有人能再点它',
          to: 'ending_grey',
        },
        {
          text: '把核心装上碾骨号，离开这里。',
          hint: '需要：铁潮或黑水的门路',
          require: { anyFlags: ['qi_bond', 'niao_contract'] },
          to: 'ending_raven',
        },
        {
          text: '接通旧世界网络，把真相广播出去。',
          hint: '需要：真相、沈昭的名字、足够的档案',
          require: { flags: ['truth', 'shenzhao'], codex: 9 },
          to: 'ending_seed',
        },
        {
          text: '什么也不做。你已经太累了。',
          hint: '灯会自己熄灭',
          to: 'ending_dark',
        },
      ],
    },

    ending_longlight: {
      act: 3,
      chapter: '结局',
      location: '第七层 · 核心室',
      title: '长明',
      ending: 'longlight',
      text: [],
      choices: [],
    },

    ending_newday: {
      act: 3,
      chapter: '结局',
      location: '灰湾 · 钟楼',
      title: '新昼',
      ending: 'newday',
      text: [],
      choices: [],
    },

    ending_sharefire: {
      act: 3,
      chapter: '结局',
      location: '灰湾 · 十二街区',
      title: '分火',
      ending: 'sharefire',
      text: [],
      choices: [],
    },

    ending_grey: {
      act: 3,
      chapter: '结局',
      location: '灰湾 · 三号闸门',
      title: '归灰',
      ending: 'grey',
      text: [],
      choices: [],
    },

    ending_raven: {
      act: 3,
      chapter: '结局',
      location: '碾骨号 · 车顶',
      title: '渡鸦',
      ending: 'raven',
      text: [],
      choices: [],
    },

    ending_seed: {
      act: 3,
      chapter: '结局',
      location: '灰湾 · 海关钟楼',
      title: '火种',
      ending: 'seed',
      text: [],
      choices: [],
    },

    ending_dark: {
      act: 3,
      chapter: '结局',
      location: '灰湾 · 钟楼',
      title: '无灯',
      ending: 'dark',
      text: [],
      choices: [],
    },
  },
}

export const ENDINGS = {
  longlight: {
    code: 'E-01',
    title: '长明',
    english: 'THE LONG LIGHT',
    tone: '牺牲',
    quote: '灯亮着。只是没有人再看见你。',
    body: [
      '你让塞拉菲娜把灯绳系在日晷上，然后把手按进核心。',
      '光从你的指缝里涌出来，顺着电缆爬满整座灰湾。你听见城市在响：灯罩炸裂，继电器闭合，水泵重新转动，四万个人同时抬头。',
      '你没有死。确切地说，你没有完全死。你变成了灯网的一部分，能感觉到每一条电线，每一盏灯，每一个在灯下抬头的人。',
      '一年后，灰湾有了新的白昼。孩子们在广场上画你的样子，画得不太像。塞拉菲娜每天傍晚都会来钟楼坐一会儿，不祈祷，只说话。',
      '你听得见。你一直听得见。',
    ],
    aftermath: '灰湾的灯亮了。你成为灯芯，意识散在城市电网里。塞拉菲娜守着你，也守着这座终于有白昼的城。',
  },
  newday: {
    code: 'E-02',
    title: '新昼',
    english: 'A NEW DAY',
    tone: '秩序',
    quote: '灯有了主人。主人有了神。',
    body: [
      '你把钥匙交给塞拉菲娜。她接过去的时候，手没有抖。',
      '永昼庭用三个月接管了灯网。配给、巡逻、布道、审判，一切都有了秩序。灰湾的灯没有再灭过，灰湾的黑暗也被重新分配：信徒的街区整夜亮着，怀疑者的街区每天只供三小时电。',
      '塞拉菲娜成了真正的女王。她不再提母亲，也不再提那个在市政厅问她“你相信自己是神吗”的人。',
      '你被授予“引路人”的称号，住进灯堂。每天有人向你鞠躬。你渐渐分不清，他们是在敬你，还是在敬你身后那盏灯。',
      '有一年冬天，你听见她在空无一人的灯堂里哭。第二天，她照常布道。',
    ],
    aftermath: '灰湾活了下来，代价是灯成了权力的名字。塞拉菲娜成为真正的永昼之后，你被供奉为引路人。',
  },
  sharefire: {
    code: 'E-03',
    title: '分火',
    english: 'SHARED FIRE',
    tone: '希望',
    quote: '没有人拥有太阳。每个人都有灯。',
    body: [
      '你花了三天把核心拆成十二份。每一份只有拳头大，装进旧电池壳里，由十二个街区各派两个人来领。',
      '分配那天，三街市场挤满了人。没有人打架。不是因为大家突然变好了，而是因为每个人都知道，抢走别人那份，自己的灯也亮不了多久。',
      '灰湾有了十二盏灯。它们会闪，会坏，会因为阴天和争吵同时熄灭。但每次熄灭，都有人爬上去修。',
      '半年后，十二街区选出了第一个联合议会。卓正当选那天，说的话很短：“先守住街口。现在，街口变多了。”',
      '你在钟楼顶上看着这一切。灯不算亮，但足够看清彼此的脸。',
    ],
    aftermath: '核心被拆成十二份，灰湾进入脆弱的共治时代。灯不亮，但也不再只属于一个人。',
  },
  grey: {
    code: 'E-04',
    title: '归灰',
    english: 'RETURN TO ASH',
    tone: '余烬',
    quote: '灯灭了。人还在。',
    body: [
      '你带着三街的工兵回到第七层，把最后一道封印重新焊死。核心在门后叫了整整一夜，然后安静下来。',
      '灰湾的灯一盏一盏地灭。人们从地下搬出来，在城外搭起棚子。北风领打开了种子库，黑水让出了三条出城的路，铁潮的碾骨号第一次在灰湾停了超过十天。',
      '没有灯，日子很难。冬天死了很多人。但也再没有人在夜里被灯下的影子吓醒。',
      '一年后，灰湾成了一座半空的城。三街市场还在，只是晚上不开门。孩子们学会了在黑暗里认路。',
      '你有时会想起那颗黑色的太阳。它还在下面，睡着。你希望它一直睡下去。',
    ],
    aftermath: '核心被永久封存。灰湾退回黑暗，人口减半，但没有人再能点燃那盏灯。',
  },
  raven: {
    code: 'E-05',
    title: '渡鸦',
    english: 'THE RAVEN',
    tone: '自由',
    quote: '你救了一座城。或者只是救了自己。',
    body: [
      '你把核心装上碾骨号。祁鸢的人用三天把它拆成七份，塞进七节车厢。',
      '发车那天，灰湾的灯正在一盏一盏地灭。站台上没有人送行。塞拉菲娜站在远处，没有走过来。',
      '碾骨号沿着东海岸往北开了两个月。你们用核心的电力换水、换粮、换路。车上的灯一直亮着，像一座会移动的城。',
      '你有时会梦见灰湾。梦见三街市场的广播，梦见沈砚的茶，梦见钟楼顶上那七分钟。',
      '祁鸢说，车不能停。你点点头。你们都清楚，有些东西一旦停下来，就会追上你。',
    ],
    aftermath: '核心被铁潮带走。灰湾失去主电源，你随碾骨号离开，成为移动城的一员。',
  },
  seed: {
    code: 'E-06',
    title: '火种',
    english: 'THE SEED',
    tone: '真相',
    quote: '不是只有灰湾在等。',
    body: [
      '你把核心接上钟楼的发射机，把沈昭的档案、第七分钟的真相、赫利俄斯的全部记录，编成一段循环广播。',
      '信号通过核心放大，越过灰湾，越过东海岸，越过你们以为已经没有人的荒原。',
      '第一天，没有回应。第二天，也没有。第三天凌晨，接收器亮了。',
      '一个陌生的声音，带着很重的杂音：“这里是旧历第九实验场。你们那边……还有太阳吗？”',
      '你握着话筒，听见自己的声音在发抖：“有。但这次，我们想先问一句：你们打算怎么用？”',
      '接下来的十分钟里，又有四个信号接进来。十二座城市，至少还有五座活着。',
      '灰湾的灯仍然亮着。但这一次，灯下的人不再只有你们。',
    ],
    aftermath: '真相被广播出去，五个旧实验场回应了灰湾。十二枚核心的命运第一次被放在桌面上谈。',
  },
  dark: {
    code: 'E-07',
    title: '无灯',
    english: 'NO LIGHT',
    tone: '终局',
    quote: '灰是温的。',
    body: [
      '你坐在钟楼顶上，看着核心的最后一格光暗下去。',
      '没有爆炸，没有戏剧性的崩塌。只是灯一盏一盏地灭，像有人从城市边缘开始，耐心地吹灭一排蜡烛。',
      '你听见楼下有人在喊你的名字。你没有回答。',
      '灰落在你的肩上，还是温的。',
      '你想起那封信上的话：别让他们点灯。你做到了。或者，你只是没能做到别的。',
    ],
    aftermath: '核心熄灭。灰湾陷入永夜。你活了下来，但没有人知道明天会不会再来。',
  },
}

export const ENDING_ORDER = ['longlight', 'newday', 'sharefire', 'grey', 'raven', 'seed', 'dark']
