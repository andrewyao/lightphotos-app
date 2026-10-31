// SPDX-License-Identifier: MIT OR Apache-2.0
//
// Simplified Chinese UI strings. Shape and placeholders match ./en. Names of
// controls use the app's own Simplified Chinese labels
// (src/i18n/glossary/zh-CN.tsv).
import type { UI } from "./en";

export default {
  nav: {
    main: "主页",
    downloads: "下载",
    openInBrowser: "在浏览器中打开",
    blogs: "博客",
    help: "帮助",
    github: "GitHub 上的 LightPhotos",
    language: "语言",
    theme: "主题",
    themeLight: "浅色",
    themeNeutral: "中灰",
    themeDark: "深色",
  },

  footer: {
    author: "作者：Andrew Yao",
    feedback: "反馈",
    privacy: "隐私",
    terms: "条款",
    licenses: "许可证",
    version: "版本：{v}",
    build: "构建 {v}",
  },

  docs: {
    pageTitle: "{title} — LightPhotos 帮助",
    navTitle: "文档",
    help: "帮助",
    back: "上一页",
    next: "下一页",
    moreTopics: "更多主题",
    shortcutsNote:
      "快捷键按 macOS 的写法给出——在 Windows 和 Linux 上，请把 <kbd>Cmd</kbd> 读作 <kbd>Ctrl</kbd>。在应用内按 <kbd>?</kbd>，可以看到适合你自己电脑的快捷键列表。",
    redirectTitle: "LightPhotos 帮助",
    redirecting: "正在打开 LightPhotos 文档…",
    redirectLink: "入门：打开应用",
    groups: {
      gettingStarted: "入门",
      reference: "参考",
    },
    topics: {
      "open-the-app": {
        title: "打开应用",
        dek: "两种入口：浏览器标签页或桌面版。无论哪种，都是同一个编辑器，处理的也是同一批文件。",
      },
      "pick-a-folder": {
        title: "选择文件夹",
        dek: "让 LightPhotos 指向磁盘上已有的文件夹即可，不需要等待导入。",
      },
      catalogs: {
        title: "目录",
        dek: "把文件夹分成不同的列表，例如家庭照片和客户作品，并在标题栏中随时切换。",
      },
      browse: {
        title: "浏览文件夹",
        dek: "缩略图网格，可以评分、筛选和选择，缩略图在滚动到视野内时才解码。",
      },
      "select-a-photo": {
        title: "选择照片",
        dek: "网格用来做取舍，单张视图用来以完整尺寸处理一张照片。",
      },
      "compare-a-stack": {
        title: "比较照片",
        dek: "把一组连拍堆叠起来，或选择最多六张照片，在同一位置比较每一帧。",
      },
      adjust: {
        title: "调整设置",
        dek: "影调、混色与颜色分级、细节、效果和裁剪，每一项都可以还原。",
      },
      masks: {
        title: "蒙版",
        dek: "只调整照片的一部分：渐变、椭圆，或自动找出的主体和天空，另外还有用来去除斑点的修补。",
      },
      presets: {
        title: "预设",
        dek: "一键把保存好的风格用到许多照片上，并且可以直接从文件夹使用你的 Lightroom 预设。",
      },
      export: {
        title: "导出",
        dek: "把你的编辑写入全新的 JPEG、PNG、TIFF、WebP 或 AVIF 文件，原始文件保持原样。",
      },
      immich: {
        title: "Immich 服务器",
        dek: "从桌面版把完成的照片上传到任何你自己托管的 Immich 服务器。",
      },
      shortcuts: {
        title: "键盘快捷键",
        dek: "LightPhotos 响应的每一个按键，按你正在做的事情分组。",
      },
      formats: {
        title: "支持的格式",
        dek: "LightPhotos 在各个平台上能打开的文件（包括 macOS 独有的那一种）、它写在照片旁边的三类文件，以及列出你文件夹的目录。",
      },
    },
  },

  home: {
    title: "LightPhotos——免费、开源的 RAW 照片 Lightroom 替代品",
    desc: "快速筛选、评分、编辑和导出 RAW 照片。免费、开源的 Lightroom 替代品，支持 macOS、Windows、Linux 和浏览器（桌面版 Chrome 或 Edge）。无需订阅，无需账户，你的照片和编辑绝不会离开你的电脑。",
    tagline: "快速筛选和编辑 RAW 照片。",
    lede: "免费、开源的 Lightroom 替代品，支持 macOS、Windows、Linux 和浏览器（桌面版 Chrome 或 Edge）。你的照片和编辑绝不会离开你的电脑。",
    download: "下载",
    downloadFor: "下载 {os} 版",
    openInBrowser: "在浏览器中打开",
    github: "GitHub",
    demoOpen: "放大播放演示",
    demoDialog: "LightPhotos 演示",
    demoClose: "关闭",
    demoDescription:
      "打开一个装有花园和沙漠照片的文件夹，浏览照片，用影调滑块调整一张桥的照片，以 100% 比较四张兰花照片组成的堆叠，在网格中评分并添加颜色标签，然后导出四星及以上的照片",
    featuresAria: "LightPhotos 能做什么",
    features: {
      noImports: {
        title: "无需导入",
        text: "直接打开磁盘上的任何文件夹。不用导入，不用复制。编辑保存在照片旁边，原始文件绝不会被修改。",
        link: "数据存放在哪里",
      },
      fast: {
        title: "快速",
        text: "在 GPU 上渲染。完全用 Rust 编写。在 macOS 桌面版上使用原生 RAW 解码。",
        link: "为什么选 Rust",
      },
      formats: {
        title: "文件格式",
        text: "Sony、Canon、Nikon、Fujifilm、Panasonic、Olympus、Pentax、Leica、手机 DNG、JPEG、TIFF 和 HEIC（Mac 版）。",
        link: "支持的格式",
      },
      batch: {
        title: "批量编辑",
        text: "应用预设（包括你的 Lightroom 预设）、拷贝调整、设置星级和标签，并一次性选出或拒绝许多照片。",
        link: "预设",
      },
      compare: {
        title: "比较堆叠",
        text: "把一组连拍堆叠起来，然后并排查看每一帧，并缩放到同一位置。留下最清晰的一张。",
        link: "比较照片",
      },
      export: {
        title: "导出与 Immich",
        text: "把完成的照片导出为 JPEG，放到另一个本地文件夹，或你自己的 Immich 服务器（仅限桌面版）。",
        link: "工作原理",
      },
    },
    actionsAria: "继续探索",
    blogsCard: {
      title: "博客",
      text: "构建 LightPhotos 及其 RAW 引擎的历程。",
    },
    helpCard: {
      title: "帮助",
      text: "用户指南、支持的格式、键盘快捷键。",
    },
  },

  downloads: {
    title: "下载 LightPhotos",
    desc: "下载适用于 macOS、Windows 和 Linux 的 LightPhotos 桌面版。为 Apple Silicon、x86-64 和 ARM64 提供原生构建，免费、可离线使用，体积不到 12 MB。",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "下",
    headingLight: "载",
    note: "Windows 版尚未经过代码签名，所以 SmartScreen 会询问一次你是否真的要打开它。大约十秒就能完成，构建下方的步骤会带你走一遍。",
    gridAria: "桌面版构建",
    builds: {
      "macos-arm64": {
        label: "下载 Apple Silicon 版",
        steps: ["打开 .dmg，把 LightPhotos 拖到“应用程序”文件夹。"],
      },
      "macos-x86_64": {
        label: "下载 Intel Mac 版",
        steps: ["打开 .dmg，把 LightPhotos 拖到“应用程序”文件夹。"],
      },
      "windows-x86_64": {
        label: "下载 Windows 版",
        steps: [
          "把压缩包解压到任意位置。里面只有一个 lightphotos.exe，不用经过安装程序。",
          "第一次运行时，SmartScreen 会提示发布者未被识别。",
          "选择“更多信息”，再选择“仍要运行”。以后不会再看到这个提示。",
        ],
      },
      "linux-x86_64": {
        label: "下载 Linux x86 版",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["解压 tarball，运行里面的可执行文件。无需安装，无需配置。"],
      },
      "linux-arm64": {
        label: "下载 Linux ARM 版",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["解压 tarball，运行里面的可执行文件。无需安装，无需配置。"],
      },
    },
    showOnlyMine: "只显示我的平台",
    anotherPlatform: "找其他平台？",
    sharedTag: "这里没有合适的？",
    shared: [
      '用的是完全不同的系统？<a href="/app.html">网页版</a>是同一个编辑器，任何支持 WebGPU 的浏览器都能用',
      '想看发布说明或下载旧版本？所有构建都在 <a href="https://github.com/andrewyao/lightphotos/releases">GitHub 发布页</a>',
      '发现了错误，或有好点子？<a href="https://github.com/andrewyao/lightphotos/issues">在 GitHub 上提交 issue</a>',
      "无论哪种方式，你的照片都留在磁盘上。你的编辑保存在 .lightphotos 子文件夹里的一个小文件中，所以把文件夹搬到别处，它的所有编辑也会一起带走",
    ],
  },

  blogs: {
    pageTitle: "LightPhotos 博客",
    desc: "讲讲 LightPhotos 为什么存在，以及它是怎么做出来的。",
    heading: "博客",
    sortAria: "文章排序",
    newest: "最新在前",
    oldest: "最早在前",
    minRead: "阅读约 {n} 分钟",
    englishOnly: "文章本身以英文撰写。",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "让 AI 筛选照片的三种方式",
        blurb: "筛选是最枯燥的环节，我用三种方式把它交给了 AI：应用自带的评分、本地模型和 Claude Code，各有优缺点，也都附上了试用方法。",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "你的下一位高级用户看不到屏幕",
        blurb: "无障碍功能让残障人士也能使用应用，MCP 则让智能体替高级用户操作应用，两者需要的是同一份命令清单。",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "Mac 上的 LightPhotos 与 RapidRAW",
        blurb: "两款 Rust 应用都就地读取文件夹，也都以浮点数保存 RAW 像素，区别在于一个按窗口大小预先准备下一张照片，另一个让每张 RAW 都保持完整尺寸。",
      },
      "two-raw-decoders": {
        title: "两种 RAW 解码器的正面比较",
        blurb: "rawler 与 LightCraft 自己的解码器：一边是固定的流水线，一边是五个阶段；一边是机型对照表，一边是 DNG 色彩模型。",
      },
      "raw-camera-support": {
        title: "LightPhotos 和 LightCraft 支持哪些相机？",
        blurb: "18 个 RAW 文件、各款相机的支持情况，以及为什么按预览尺寸处理会改变耗时。",
      },
      "catalogs": {
        title: "目录的第一个版本",
        blurb: "给文件夹起名并组成列表，在页眉里随时切换，而你的编辑仍然保存在照片旁边。",
      },
      "lightroom-alternative": {
        title: "免费、开源的 Lightroom 替代品",
        blurb: "把 LightPhotos 和 Lightroom 放在一起比较：LightPhotos 强在哪里，又有哪些功能还没做。",
      },
      "linux-raw-photo-editor": {
        title: "Linux 上的快速 RAW 照片编辑器",
        blurb: "Lightroom 没有 Linux 版，而 LightPhotos 提供原生的 ARM 和 x86 构建。",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Mac 上的两款 Rust 照片应用",
        blurb: "同样的比较，这次放在桌面端：LightPhotos 使用 Apple 的 ImageIO，LightCraft 则用自己的解码器。",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "浏览器里的两款 Rust 照片应用",
        blurb: "LightPhotos 和 LightCraft 并排对比，用的是同样的二十个 RAW 文件。",
      },
      "exporting-to-your-own-immich-server": {
        title: "导出到你自己的 Immich 服务器",
        blurb: "LightPhotos 如何把修好的照片上传到你选定的 Immich 服务器。",
      },
      "challenges-with-webassembly": {
        title: "WebAssembly 踩过的坑",
        blurb: "Rust 应用搬进浏览器标签页之后，都有哪些东西出了问题。",
      },
      "my-plan": {
        title: "我的计划，以及不在计划之内的事",
        blurb: "LightPhotos 接下来会走向哪里，又永远不会变成什么样。",
      },
      "measuring-a-gui-app": {
        title: "如何不自欺欺人地测量 GUI 应用",
        blurb: "一种可重复的 GUI 应用测量方法，不靠猜测。",
      },
      "never-load-the-whole-folder": {
        title: "永远不要一次加载整个文件夹",
        blurb: "照片浏览器的第一个版本为什么会耗尽内存。",
      },
      "six-queues-and-a-reserved-worker": {
        title: "六条队列和一个专用工作线程",
        blurb: "应用繁忙时，后台解码是怎样保持快速的。",
      },
      "where-your-data-lives": {
        title: "你的数据，放在你有权写入的地方",
        blurb: "为什么照片、编辑和元数据都保存在普通文件夹里。",
      },
      "what-imageio-gives-you-free": {
        title: "ImageIO 白送你什么，离开它又要付出什么",
        blurb: "ImageIO 为你提供了什么，以及让应用可移植需要付出怎样的代价。",
      },
      "how-a-photo-gets-on-screen": {
        title: "一张照片是怎样显示到屏幕上的",
        blurb: "从 RAW 文件到显示器上的像素，中间走过的路径。",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "智能体写代码，我来学 Rust",
        blurb: "一套实用的方法，让你在智能体写代码的同时学会 Rust。",
      },
      "why-rust": {
        title: "为什么选择 Rust",
        blurb: "LightPhotos 背后的架构决策。",
      },
      "why-i-started-lightphotos": {
        title: "我为什么做 LightPhotos",
        blurb: "一个丢失的照片库，催生了一款小小的照片编辑器。",
      },
    },
  },

  pages: {
    privacy: {
      title: "隐私 — LightPhotos",
      desc: "LightPhotos 在本网站上统计什么，刻意不统计什么，以及为什么桌面版完全不发出任何网络请求。",
    },
    terms: {
      title: "条款 — LightPhotos",
      desc: "使用 LightPhotos 网站、浏览器版和桌面版的条款，用平实的语言写成。",
    },
  },
} satisfies UI;
