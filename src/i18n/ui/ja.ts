// SPDX-License-Identifier: MIT OR Apache-2.0
//
// Japanese UI strings. Same shape as ./en; see the notes there. Control names
// follow the app's own Japanese labels (src/i18n/glossary/ja.tsv).
import type { UI } from "./en";

export default {
  nav: {
    main: "メイン",
    downloads: "ダウンロード",
    openInBrowser: "ブラウザで開く",
    blogs: "ブログ",
    help: "ヘルプ",
    github: "GitHubのLightPhotos",
    language: "言語",
    theme: "テーマ",
    themeLight: "ライト",
    themeNeutral: "ニュートラルグレー",
    themeDark: "ダーク",
  },

  footer: {
    author: "作者：Andrew Yao",
    feedback: "フィードバック",
    privacy: "プライバシー",
    terms: "利用規約",
    licenses: "ライセンス",
    version: "バージョン：{v}",
    build: "ビルド {v}",
  },

  docs: {
    pageTitle: "{title} — LightPhotosヘルプ",
    navTitle: "ドキュメント",
    help: "ヘルプ",
    back: "戻る",
    next: "次へ",
    moreTopics: "ほかのトピック",
    shortcutsNote:
      "ショートカットはmacOSの表記で書かれています。WindowsとLinuxでは、<kbd>Cmd</kbd>を<kbd>Ctrl</kbd>に読み替えてください。お使いのマシンでの表記は、アプリ内で<kbd>?</kbd>を押すと確認できます。",
    redirectTitle: "LightPhotosヘルプ",
    redirecting: "LightPhotosのドキュメントを開いています…",
    redirectLink: "はじめに：アプリを開く",
    groups: {
      gettingStarted: "はじめに",
      reference: "リファレンス",
    },
    topics: {
      "open-the-app": {
        title: "アプリを開く",
        dek: "ブラウザのタブでもデスクトップ版でも入口は2つ。どちらでも、同じファイルを同じエディタで扱えます。",
      },
      "pick-a-folder": {
        title: "フォルダを選ぶ",
        dek: "すでにディスク上にあるフォルダをLightPhotosに指定するだけ。読み込みを待つ手順はありません。",
      },
      catalogs: {
        title: "カタログ",
        dek: "家族の写真や仕事用の写真など、フォルダのリストを分けて管理し、ヘッダから切り替えられます。",
      },
      browse: {
        title: "フォルダを見る",
        dek: "サムネールのグリッドで、レーティング、絞り込み、選択ができます。サムネールはスクロールして表示される際にデコードされます。",
      },
      "select-a-photo": {
        title: "写真を選ぶ",
        dek: "グリッドは選ぶための画面、ルーペは1枚の写真を等倍で仕上げるための画面です。",
      },
      "compare-a-stack": {
        title: "写真を比較する",
        dek: "連写を1つのスタックにまとめるか、最大6枚の写真を選んで、すべてのコマを同じ位置で見比べます。",
      },
      adjust: {
        title: "設定を調整する",
        dek: "トーン、カラーミキシングとグレーディング、ディテール、効果、切り抜き。どれも元に戻せます。",
      },
      masks: {
        title: "マスク",
        dek: "写真の一部だけを調整します。グラデーション、円形、自動で検出した被写体や空に加え、スポットにはスポット修正が使えます。",
      },
      presets: {
        title: "プリセット",
        dek: "保存したルックを、ワンクリックで多くの写真に適用できます。Lightroomのプリセットも、フォルダからそのまま使えます。",
      },
      export: {
        title: "書き出し",
        dek: "編集内容を反映した新しいJPEG、PNG、TIFF、WebP、AVIFファイルを書き出します。元のファイルはそのまま残ります。",
      },
      immich: {
        title: "Immichサーバ",
        dek: "仕上げた写真を、デスクトップアプリから自分で運用しているImmichサーバにアップロードします。",
      },
      shortcuts: {
        title: "キーボードショートカット",
        dek: "LightPhotosが受け付けるすべてのキーを、操作ごとにまとめました。",
      },
      formats: {
        title: "対応フォーマット",
        dek: "各プラットフォームでLightPhotosが開けるファイル（macOSだけが独自に開けるものを含む）、LightPhotosがそばに書き込む3種類のファイル、そしてフォルダを一覧にするカタログについて説明します。",
      },
    },
  },

  home: {
    title: "LightPhotos — RAW写真のための、無料のオープンソースLightroom代替",
    desc: "RAW写真の選別、レーティング、編集、書き出しをすばやく。macOS、Windows、Linux、そしてブラウザ（デスクトップ版のChromeまたはEdge）で使える、無料のオープンソースのLightroom代替です。サブスクリプションもアカウントも不要。写真と編集内容がコンピュータの外に出ることはありません。",
    tagline: "RAW写真の選別と編集を、すばやく。",
    lede: "macOS、Windows、Linux、そしてブラウザ（デスクトップ版のChromeまたはEdge）で使える、無料のオープンソースのLightroom代替。写真と編集内容がコンピュータの外に出ることはありません。",
    download: "ダウンロード",
    downloadFor: "{os}版をダウンロード",
    openInBrowser: "ブラウザで開く",
    github: "GitHub",
    demoOpen: "デモを大きく再生",
    demoDialog: "LightPhotosのデモ",
    demoClose: "閉じる",
    demoDescription:
      "庭と砂漠の写真が入ったフォルダを開いて閲覧し、橋の写真をトーンのスライダーで現像し、4枚の蘭の写真のスタックを100%で比較し、グリッドでレーティングとカラーラベルを付け、4スター以上の写真を書き出す様子",
    featuresAria: "LightPhotosでできること",
    features: {
      noImports: {
        title: "読み込み不要",
        text: "ディスク上のどのフォルダでも、そのまま開けます。読み込みもコピーもありません。編集内容は写真のそばに保存され、元のファイルが変更されることはありません。",
        link: "データの保存場所",
      },
      fast: {
        title: "高速",
        text: "GPUでレンダリング。すべてRustで書かれています。macOSのデスクトップ版ではネイティブのRAWデコードに対応。",
        link: "なぜRustなのか",
      },
      formats: {
        title: "対応ファイル形式",
        text: "Sony、Canon、Nikon、Fujifilm、Panasonic、Olympus、Pentax、Leica、スマートフォンのDNG、JPEG、TIFF、HEIC（Mac版）。",
        link: "対応フォーマット",
      },
      batch: {
        title: "一括編集",
        text: "Lightroomのものを含むプリセットの適用、調整のコピー、スターとラベルの設定、複数の写真の採用や除外を、まとめて行えます。",
        link: "プリセット",
      },
      compare: {
        title: "スタックを比較",
        text: "連写をスタックにまとめ、すべてのコマを同じ位置にズームして並べて表示。いちばんシャープな1枚を残せます。",
        link: "スタックを比較する",
      },
      export: {
        title: "書き出しとImmich",
        text: "仕上げた写真を、別のローカルフォルダまたは自分のImmichサーバに、JPEGとして書き出せます（デスクトップ版のみ）。",
        link: "しくみ",
      },
    },
    actionsAria: "さらに見る",
    blogsCard: {
      title: "ブログ",
      text: "LightPhotosとそのRAWエンジンを作り上げるまでの道のり。",
    },
    helpCard: {
      title: "ヘルプ",
      text: "ユーザガイド、対応フォーマット、キーボードショートカット。",
    },
  },

  downloads: {
    title: "LightPhotosをダウンロード",
    desc: "macOS、Windows、Linux向けのLightPhotosデスクトップアプリをダウンロード。Apple Silicon、x86-64、ARM64向けのネイティブビルドで、無料、オフライン対応、サイズは12 MB未満。",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "ダウン",
    headingLight: "ロード",
    gridAria: "デスクトップ版のビルド",
    builds: {
      "macos-arm64": {
        label: "Apple Silicon版をダウンロード",
        steps: [".dmgを開き、LightPhotosを「アプリケーション」フォルダにドラッグします。"],
      },
      "macos-x86_64": {
        label: "Intel Mac版をダウンロード",
        steps: [".dmgを開き、LightPhotosを「アプリケーション」フォルダにドラッグします。"],
      },
      "windows-x86_64": {
        label: "Windows版をダウンロード",
        steps: [
          "アーカイブを好きな場所に解凍します。中には lightphotos.exe が1つあるだけで、インストーラはありません。",
          "初回起動時、SmartScreenが未確認の発行元について警告します。",
          "「詳細情報」を選び、「実行」をクリックします。次回以降は表示されません。",
        ],
      },
      "linux-x86_64": {
        label: "Linux x86版をダウンロード",
        note: "Ubuntu 24.04以降、Debian 13、Fedora 40以降",
        steps: ["tarballを展開し、中のバイナリを実行します。インストールも設定も不要です。"],
      },
      "linux-arm64": {
        label: "Linux ARM版をダウンロード",
        note: "Ubuntu 24.04以降、Debian 13、Fedora 40以降",
        steps: ["tarballを展開し、中のバイナリを実行します。インストールも設定も不要です。"],
      },
    },
    showOnlyMine: "お使いのプラットフォームのみ表示",
    anotherPlatform: "ほかのプラットフォームをお探しですか？",
    sharedTag: "合うものが見つかりませんか？",
    shared: [
      'まったく別の環境ですか？<a href="/app.html">Webアプリ</a>は同じエディタで、WebGPUに対応したブラウザならどれでも使えます',
      'リリースノートや過去のバージョンが必要ですか？すべてのビルドが<a href="https://github.com/andrewyao/lightphotos/releases">GitHubのリリースページ</a>にあります',
      '不具合の報告やアイデアがありますか？<a href="https://github.com/andrewyao/lightphotos/issues">GitHubでissueを作成</a>してください',
      "どの場合でも、写真はディスク上に残ります。編集内容は .lightphotos サブフォルダ内の小さなファイルに保存されるので、フォルダをほかの場所に移動すれば、そのフォルダの編集内容もすべて一緒に移動します",
    ],
  },

  blogs: {
    pageTitle: "LightPhotosのブログ",
    desc: "LightPhotosが生まれた理由と、そのしくみについての記事です。",
    heading: "ブログ",
    sortAria: "記事を並べ替え",
    newest: "新しい順",
    oldest: "古い順",
    minRead: "読了まで約{n}分",
    englishOnly: "記事は英語で書かれています。",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "AIに撮影分の選別を任せる3つの方法",
        blurb: "選別は地味な作業です。アプリのスコア、ローカルモデル、Claude Codeの3つの方法でAIに任せてみました。それぞれの長所と短所、試し方を紹介します。",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "次のパワーユーザは画面を見ていないかもしれない",
        blurb: "アクセシビリティは障がいのある人がアプリを使えるようにし、MCPはエージェントがパワーユーザの代わりにアプリを使えるようにします。どちらも同じコマンド一覧を必要とします。",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "MacでのLightPhotosとRapidRAW",
        blurb: "フォルダをそのまま読み込む2つのRustアプリは、どちらもRAWのピクセルを浮動小数点で保持しますが、一方は次の写真をウィンドウサイズで準備し、もう一方はすべてのRAWをフルサイズで保持します。",
      },
      "two-raw-decoders": {
        title: "2つのRAWデコーダを徹底比較",
        blurb: "rawlerとLightCraft独自のデコーダを比較します。固定の1本のパイプラインと5段階のステージ、機種テーブルとDNGのカラーモデルという対比です。",
      },
      "raw-camera-support": {
        title: "LightPhotosとLightCraftが対応するカメラは？",
        blurb: "18枚のRAWファイルで確かめたカメラの対応状況と、プレビューサイズで処理すると所要時間が変わる理由を紹介します。",
      },
      "catalogs": {
        title: "カタログ、最初のバージョン",
        blurb: "フォルダをまとめた名前付きのリストで、ヘッダーから切り替えられます。編集内容はこれまでどおり写真のそばに保存されます。",
      },
      "lightroom-alternative": {
        title: "Lightroomに代わる、無料のオープンソースの選択肢",
        blurb: "LightPhotosとLightroomを並べて比較し、LightPhotosが優れている点と、まだできないことを紹介します。",
      },
      "linux-raw-photo-editor": {
        title: "Linux向けの高速なRAW現像ソフト",
        blurb: "LightroomにはLinux版がありませんが、LightPhotosにはARMとx86のネイティブビルドがあります。",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Macで動く2つのRust製フォトアプリ",
        blurb: "デスクトップでも同じ比較をしました。LightPhotosはAppleのImageIOを使い、LightCraftは独自のデコーダを使います。",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "ブラウザで動く2つのRust製フォトアプリ",
        blurb: "LightPhotosとLightCraftを、同じ20枚のRAWファイルで並べて比較します。",
      },
      "exporting-to-your-own-immich-server": {
        title: "自分のImmichサーバに書き出す",
        blurb: "LightPhotosが、仕上げた写真をあなたの選んだImmichサーバにアップロードするしくみを紹介します。",
      },
      "challenges-with-webassembly": {
        title: "WebAssemblyでつまずいたこと",
        blurb: "RustアプリをブラウザのタブでWebAssemblyとして動かしたときに、何が壊れたのかを振り返ります。",
      },
      "my-plan": {
        title: "今後の計画と、やらないこと",
        blurb: "LightPhotosがこれからどこへ向かうのか、そして決してそうならないものについて。",
      },
      "measuring-a-gui-app": {
        title: "自分をごまかさずにGUIアプリを計測する",
        blurb: "推測に頼らず、何度でも再現できるGUIアプリの計測方法を紹介します。",
      },
      "never-load-the-whole-folder": {
        title: "フォルダ全体を読み込まない",
        blurb: "フォトブラウザの最初のバージョンがメモリ不足になった理由を振り返ります。",
      },
      "six-queues-and-a-reserved-worker": {
        title: "6つのキューと、専用に確保したワーカー",
        blurb: "アプリが忙しいときでも、バックグラウンドのデコードを高速に保つしくみを紹介します。",
      },
      "where-your-data-lives": {
        title: "データは、書き込みが許される場所に置く",
        blurb: "写真も編集内容もメタデータも、ふつうのフォルダに置いておく理由を紹介します。",
      },
      "what-imageio-gives-you-free": {
        title: "ImageIOが無料でくれるものと、手放すときの代償",
        blurb: "ImageIOが提供してくれるものと、アプリを他のプラットフォームに移植できるようにするための代償を紹介します。",
      },
      "how-a-photo-gets-on-screen": {
        title: "写真が画面に映るまで",
        blurb: "RAWファイルがディスプレイ上のピクセルになるまでの道のりをたどります。",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "エージェントにコードを書かせながらRustを学ぶ",
        blurb: "エージェントがコードを書いている間に、Rustを学ぶための実践的な進め方を紹介します。",
      },
      "why-rust": {
        title: "なぜRustなのか",
        blurb: "LightPhotosの土台となったアーキテクチャ上の決断について。",
      },
      "why-i-started-lightphotos": {
        title: "LightPhotosを始めた理由",
        blurb: "失われた写真ライブラリが、小さな現像ソフトを作るきっかけになった話です。",
      },
    },
  },

  pages: {
    privacy: {
      title: "プライバシー — LightPhotos",
      desc: "LightPhotosがこのウェブサイトで集計していること、意図的に集計していないこと、そしてデスクトップアプリがネットワークへのリクエストをいっさい行わない理由について。",
    },
    terms: {
      title: "利用規約 — LightPhotos",
      desc: "LightPhotosのウェブサイト、ブラウザ版アプリ、デスクトップアプリをご利用いただく際の規約を、平易な言葉でまとめました。",
    },
  },
} satisfies UI;
