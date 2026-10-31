// SPDX-License-Identifier: MIT OR Apache-2.0
//
// Traditional Chinese (Taiwan) UI strings. Same shape as ./en; where the text
// names a control in the app, the app's own zh-Hant label is used
// (src/i18n/glossary/zh-TW.tsv).
import type { UI } from "./en";

export default {
  nav: {
    main: "首頁",
    downloads: "下載",
    openInBrowser: "在瀏覽器中開啟",
    blogs: "部落格",
    help: "說明",
    github: "LightPhotos 的 GitHub",
    language: "語言",
    theme: "主題",
    themeLight: "淺色",
    themeNeutral: "中灰",
    themeDark: "深色",
  },

  footer: {
    author: "作者：Andrew Yao",
    feedback: "意見回饋",
    privacy: "隱私權",
    terms: "使用條款",
    licenses: "授權條款",
    version: "版本：{v}",
    build: "建置 {v}",
  },

  docs: {
    pageTitle: "{title} — LightPhotos 說明",
    navTitle: "說明文件",
    help: "說明",
    back: "上一頁",
    next: "下一頁",
    moreTopics: "更多主題",
    shortcutsNote:
      "快速鍵以 macOS 的寫法標示——在 Windows 和 Linux 上，請把 <kbd>Cmd</kbd> 當作 <kbd>Ctrl</kbd>。在應用程式中按 <kbd>?</kbd>，就能看到符合你這台電腦的清單。",
    redirectTitle: "LightPhotos 說明",
    redirecting: "正在開啟 LightPhotos 說明文件…",
    redirectLink: "開始使用：開啟應用程式",
    groups: {
      gettingStarted: "開始使用",
      reference: "參考資料",
    },
    topics: {
      "open-the-app": {
        title: "開啟應用程式",
        dek: "兩種進入方式——瀏覽器分頁或桌面版——不論哪一種，都是同一個編輯器處理同一批檔案。",
      },
      "pick-a-folder": {
        title: "選擇資料夾",
        dek: "讓 LightPhotos 直接指向磁碟上現有的資料夾，不需要經過任何匯入步驟。",
      },
      catalogs: {
        title: "目錄",
        dek: "分開管理不同的資料夾清單，例如家人照片和客戶案件，並從頂端列切換。",
      },
      browse: {
        title: "瀏覽資料夾",
        dek: "縮圖網格，可以評等、篩選和選取，縮圖會在捲動到畫面中時才解碼。",
      },
      "select-a-photo": {
        title: "選取照片",
        dek: "網格用來決定取捨；放大鏡檢視則用來以完整尺寸處理單張照片。",
      },
      "compare-a-stack": {
        title: "比較照片",
        dek: "把連拍堆疊成一個堆疊，或選取最多 6 張照片，在同一位置比較每一張。",
      },
      adjust: {
        title: "調整設定",
        dek: "影調、色彩混合與分級、細部、效果和裁切——每一項都能還原。",
      },
      masks: {
        title: "遮色片",
        dek: "只調整照片的一部分：漸層、橢圓，或自動找出的主體或天空，另有「修補」可處理斑點。",
      },
      presets: {
        title: "預設集",
        dek: "一鍵將儲存的外觀套用到多張照片，並直接從資料夾使用你的 Lightroom 預設集。",
      },
      export: {
        title: "匯出",
        dek: "將編輯結果輸出成全新的 JPEG、PNG、TIFF、WebP 或 AVIF 檔案，原始檔案維持原狀。",
      },
      immich: {
        title: "Immich 伺服器",
        dek: "從桌面版將完成的照片上傳到任何你自己架設的 Immich 伺服器。",
      },
      shortcuts: {
        title: "鍵盤快速鍵",
        dek: "LightPhotos 會回應的每一個按鍵，依你正在做的事分組。",
      },
      formats: {
        title: "支援的格式",
        dek: "LightPhotos 在各平台上能開啟的檔案——包括只有 macOS 本身支援的那一種——它會寫在旁邊的三種檔案，以及列出你資料夾的目錄。",
      },
    },
  },

  home: {
    title: "LightPhotos：免費、開源的 RAW 照片 Lightroom 替代方案",
    desc: "快速篩選、評等、編輯和匯出 RAW 照片。免費、開源的 Lightroom 替代方案，支援 macOS、Windows、Linux 和瀏覽器（桌面版 Chrome 或 Edge）。不需訂閱、不需帳號，你的照片和編輯內容絕不會離開你的電腦。",
    tagline: "快速篩選和編輯 RAW 照片。",
    lede: "免費、開源的 Lightroom 替代方案，支援 macOS、Windows、Linux 和瀏覽器（桌面版 Chrome 或 Edge）。你的照片和編輯內容絕不會離開你的電腦。",
    download: "下載",
    downloadFor: "下載 {os} 版",
    openInBrowser: "在瀏覽器中開啟",
    github: "GitHub",
    demoOpen: "放大播放示範",
    demoDialog: "LightPhotos 示範",
    demoClose: "關閉",
    demoDescription:
      "開啟一個裝有花園和沙漠照片的資料夾並瀏覽，用影調滑桿修改一張橋的照片，以 100% 比較四張蘭花照片組成的堆疊，在網格中評等並加上色彩標籤，然後匯出四星以上的照片",
    featuresAria: "LightPhotos 能做什麼",
    features: {
      noImports: {
        title: "免匯入",
        text: "開啟磁碟上的任何資料夾。不必匯入，也不必複製。編輯內容會存放在照片旁邊，原始檔案絕不會被修改。",
        link: "資料存放在哪裡",
      },
      fast: {
        title: "快速",
        text: "以 GPU 繪製，全部用 Rust 撰寫。macOS 桌面版使用原生 RAW 解碼。",
        link: "為什麼選 Rust",
      },
      formats: {
        title: "檔案格式",
        text: "Sony、Canon、Nikon、Fujifilm、Panasonic、Olympus、Pentax、Leica、手機 DNG、JPEG、TIFF 和 HEIC（Mac 版）。",
        link: "支援的格式",
      },
      batch: {
        title: "批次編輯",
        text: "套用預設集（包括你的 Lightroom 預設集）、拷貝調整、設定星級和標籤，並一次留用或排除多張照片。",
        link: "預設集",
      },
      compare: {
        title: "比較堆疊",
        text: "把連拍堆疊起來，再並排檢視每一張，縮放到同一位置，留下最銳利的那張。",
        link: "比較堆疊",
      },
      export: {
        title: "匯出與 Immich",
        text: "將完成的照片以 JPEG 匯出到另一個本機資料夾，或你自己的 Immich 伺服器（僅限桌面版）。",
        link: "運作方式",
      },
    },
    actionsAria: "繼續探索",
    blogsCard: {
      title: "部落格",
      text: "打造 LightPhotos 及其 RAW 引擎的歷程。",
    },
    helpCard: {
      title: "說明",
      text: "使用指南、支援的格式、鍵盤快速鍵。",
    },
  },

  downloads: {
    title: "下載 LightPhotos",
    desc: "下載適用於 macOS、Windows 和 Linux 的 LightPhotos 桌面版。提供 Apple Silicon、x86-64 和 ARM64 原生版本——免費、可離線使用，小於 12 MB。",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "下",
    headingLight: "載",
    note: "Windows 版尚未經過程式碼簽署，所以第一次開啟時，SmartScreen 會詢問你是不是真的要執行。大約只要十秒，各版本下方的步驟會帶你操作。",
    gridAria: "桌面版本",
    builds: {
      "macos-arm64": {
        label: "下載 Apple Silicon 版",
        steps: ["開啟 .dmg，將 LightPhotos 拖曳到「應用程式」資料夾。"],
      },
      "macos-x86_64": {
        label: "下載 Intel Mac 版",
        steps: ["開啟 .dmg，將 LightPhotos 拖曳到「應用程式」資料夾。"],
      },
      "windows-x86_64": {
        label: "下載 Windows 版",
        steps: [
          "將壓縮檔解壓縮到任何位置。裡面只有一個 lightphotos.exe，不需要安裝程式。",
          "第一次執行時，SmartScreen 會警告發行者無法辨識。",
          "選擇「其他資訊」，再選擇「仍要執行」。之後就不會再出現。",
        ],
      },
      "linux-x86_64": {
        label: "下載 Linux x86 版",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["解開 tarball，執行裡面的執行檔。不需要安裝，也不需要任何設定。"],
      },
      "linux-arm64": {
        label: "下載 Linux ARM 版",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["解開 tarball，執行裡面的執行檔。不需要安裝，也不需要任何設定。"],
      },
    },
    showOnlyMine: "只顯示我的平台",
    anotherPlatform: "需要其他平台的版本嗎？",
    sharedTag: "這裡沒有適合的版本？",
    shared: [
      '使用的是完全不同的系統？<a href="/app.html">網頁版</a>是同一個編輯器，任何支援 WebGPU 的瀏覽器都能使用',
      '想看版本資訊或舊版本？所有版本都在 <a href="https://github.com/andrewyao/lightphotos/releases">GitHub 發行頁面</a>',
      '發現錯誤或有好點子？<a href="https://github.com/andrewyao/lightphotos/issues">到 GitHub 提出 issue</a>',
      "不論哪種方式，你的照片都留在磁碟上。你的編輯內容會存成 .lightphotos 子資料夾內的小檔案，所以把資料夾搬到別處時，它所有的編輯內容都會跟著走",
    ],
  },

  blogs: {
    pageTitle: "LightPhotos 部落格",
    desc: "談 LightPhotos 為什麼誕生，以及它是如何打造的。",
    heading: "部落格",
    sortAria: "排序文章",
    newest: "最新的在前",
    oldest: "最舊的在前",
    minRead: "閱讀約需 {n} 分鐘",
    englishOnly: "文章本身以英文撰寫。",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "讓 AI 幫你篩選一場拍攝的三種方法",
        blurb: "篩選是最無聊的部分，所以我用三種方式交給 AI：應用程式的分數、本機模型和 Claude Code，並說明各自的優缺點與試用方式。",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "你的下一位進階使用者，看不到螢幕",
        blurb: "無障礙功能讓身心障礙者也能使用應用程式，MCP 則讓代理程式替進階使用者操作它，而兩者需要的是同一份指令清單。",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "Mac 上的 LightPhotos 與 RapidRAW",
        blurb: "兩款直接讀取資料夾的 Rust 應用程式，都以浮點數保存 RAW 像素；一個會依視窗大小預先準備下一張照片，另一個則讓每張 RAW 維持完整尺寸。",
      },
      "two-raw-decoders": {
        title: "兩種 RAW 解碼器並排比較",
        blurb: "rawler 與 LightCraft 自己的解碼器：一條固定的處理流程對上五個階段，機身對照表對上 DNG 色彩模型。",
      },
      "raw-camera-support": {
        title: "LightPhotos 與 LightCraft 支援哪些相機？",
        blurb: "18 個 RAW 檔案、相機支援狀況，以及以預覽尺寸處理為何會改變耗時。",
      },
      "catalogs": {
        title: "目錄功能的第一版",
        blurb: "可從頂端列切換的具名資料夾清單，你的編輯內容仍然存放在照片旁邊。",
      },
      "lightroom-alternative": {
        title: "免費、開源的 Lightroom 替代方案",
        blurb: "LightPhotos 與 Lightroom 並排比較：LightPhotos 勝出的地方，以及它目前還做不到的事。",
      },
      "linux-raw-photo-editor": {
        title: "適用於 Linux 的快速 RAW 照片編輯器",
        blurb: "Lightroom 沒有 Linux 版應用程式，LightPhotos 則提供原生的 ARM 與 x86 版本。",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Mac 上的兩款 Rust 照片應用程式",
        blurb: "同樣的比較搬到桌面版：LightPhotos 使用 Apple 的 ImageIO，LightCraft 則使用自己的解碼器。",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "瀏覽器中的兩款 Rust 照片應用程式",
        blurb: "用同樣的二十個 RAW 檔案，並排比較 LightPhotos 與 LightCraft。",
      },
      "exporting-to-your-own-immich-server": {
        title: "匯出到你自己的 Immich 伺服器",
        blurb: "LightPhotos 如何把完成的照片上傳到你所選擇的 Immich 伺服器。",
      },
      "challenges-with-webassembly": {
        title: "WebAssembly 的難題",
        blurb: "Rust 應用程式搬進瀏覽器分頁時，有哪些地方壞掉了。",
      },
      "my-plan": {
        title: "我的計畫，以及不在計畫裡的事",
        blurb: "LightPhotos 未來的方向，以及它永遠不會變成的樣子。",
      },
      "measuring-a-gui-app": {
        title: "量測 GUI 應用程式，而不自欺欺人",
        blurb: "一套可重複的 GUI 應用程式量測方法，不靠猜測。",
      },
      "never-load-the-whole-folder": {
        title: "絕不載入整個資料夾",
        blurb: "為什麼照片瀏覽器的第一版會耗盡記憶體。",
      },
      "six-queues-and-a-reserved-worker": {
        title: "六個佇列和一個保留的工作執行緒",
        blurb: "應用程式忙碌時，背景解碼如何依然保持快速。",
      },
      "where-your-data-lives": {
        title: "你的資料，放在你有權限寫入的地方",
        blurb: "為什麼照片、編輯內容和中繼資料都留在一般的資料夾裡。",
      },
      "what-imageio-gives-you-free": {
        title: "ImageIO 免費提供的東西，以及離開它的代價",
        blurb: "ImageIO 提供了什麼，以及讓應用程式可以跨平台所要付出的代價。",
      },
      "how-a-photo-gets-on-screen": {
        title: "一張照片如何顯示在螢幕上",
        blurb: "從 RAW 檔案到顯示器上像素的完整路徑。",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "讓代理程式寫程式，我邊學 Rust",
        blurb: "在代理程式撰寫程式碼的同時，實際可行的 Rust 學習方式。",
      },
      "why-rust": {
        title: "為什麼選 Rust",
        blurb: "LightPhotos 背後的架構決策。",
      },
      "why-i-started-lightphotos": {
        title: "我為什麼開始做 LightPhotos",
        blurb: "一個遺失的照片圖庫，催生了一款小型照片編輯器。",
      },
    },
  },

  pages: {
    privacy: {
      title: "隱私權 — LightPhotos",
      desc: "LightPhotos 在這個網站上統計什麼、刻意不統計什麼，以及桌面版應用程式為什麼完全不發出任何網路請求。",
    },
    terms: {
      title: "使用條款 — LightPhotos",
      desc: "使用 LightPhotos 網站、瀏覽器版和桌面版的條款，以淺顯易懂的文字說明。",
    },
  },
} satisfies UI;
