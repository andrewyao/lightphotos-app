// SPDX-License-Identifier: MIT OR Apache-2.0
//
// Korean UI strings. Same shape as ./en; see the notes there.
import type { UI } from "./en";

export default {
  nav: {
    main: "메인",
    downloads: "다운로드",
    openInBrowser: "브라우저에서 열기",
    blogs: "블로그",
    help: "도움말",
    github: "GitHub의 LightPhotos",
    language: "언어",
    theme: "테마",
    themeLight: "밝음",
    themeNeutral: "중간",
    themeDark: "어두움",
  },

  footer: {
    author: "제작: Andrew Yao",
    feedback: "의견 보내기",
    privacy: "개인정보",
    terms: "이용 약관",
    licenses: "라이선스",
    version: "버전: {v}",
    build: "빌드 {v}",
  },

  docs: {
    pageTitle: "{title} — LightPhotos 도움말",
    navTitle: "문서",
    help: "도움말",
    back: "이전",
    next: "다음",
    moreTopics: "다른 주제",
    shortcutsNote:
      "단축키는 macOS 기준으로 적었어요. Windows와 Linux에서는 <kbd>Cmd</kbd>를 <kbd>Ctrl</kbd>로 읽으세요. 앱에서 <kbd>?</kbd>를 누르면 내 컴퓨터에 맞는 목록을 볼 수 있어요.",
    redirectTitle: "LightPhotos 도움말",
    redirecting: "LightPhotos 문서를 여는 중…",
    redirectLink: "시작하기: 앱 열기",
    groups: {
      gettingStarted: "시작하기",
      reference: "참고",
    },
    topics: {
      "open-the-app": {
        title: "앱 열기",
        dek: "브라우저 탭이나 데스크톱 빌드, 두 가지 방법이 있어요. 어느 쪽이든 같은 파일을 같은 편집기로 다뤄요.",
      },
      "pick-a-folder": {
        title: "폴더 선택",
        dek: "이미 디스크에 있는 폴더를 LightPhotos에서 열기만 하면 돼요. 기다려야 하는 가져오기 단계는 없어요.",
      },
      catalogs: {
        title: "카탈로그",
        dek: "가족 사진, 고객 작업처럼 폴더 목록을 따로 관리하고, 헤더에서 바로 전환해요.",
      },
      browse: {
        title: "폴더 둘러보기",
        dek: "별점을 매기고, 필터링하고, 선택할 수 있는 썸네일 그리드예요. 스크롤하면 화면에 들어오는 만큼 디코딩해요.",
      },
      "select-a-photo": {
        title: "사진 선택",
        dek: "그리드에서는 고르고, 확대경에서는 사진 한 장을 원래 크기로 보며 작업해요.",
      },
      "compare-a-stack": {
        title: "사진 비교",
        dek: "연사를 스택 하나로 묶거나 사진을 최대 6장까지 선택해서, 모든 컷을 같은 위치에서 비교해요.",
      },
      adjust: {
        title: "설정 조정",
        dek: "톤, 색상 혼합과 그레이딩, 세부, 효과, 자르기까지 모두 되돌릴 수 있어요.",
      },
      masks: {
        title: "마스크",
        dek: "사진의 일부만 조정해요. 그레이디언트, 타원, 자동으로 찾은 피사체나 하늘을 쓸 수 있고, 잡티 제거도 있어요.",
      },
      presets: {
        title: "사전 설정",
        dek: "저장해 둔 룩을 여러 사진에 한 번에 적용하고, Lightroom 사전 설정도 폴더에서 바로 써요.",
      },
      export: {
        title: "내보내기",
        dek: "편집 내용을 새 JPEG, PNG, TIFF, WebP, AVIF 파일로 구워 내고, 원본은 그대로 둬요.",
      },
      immich: {
        title: "Immich 서버",
        dek: "데스크톱 앱에서 완성한 사진을 직접 운영하는 Immich 서버로 업로드해요.",
      },
      shortcuts: {
        title: "키보드 단축키",
        dek: "LightPhotos가 인식하는 모든 키를 작업별로 묶어 정리했어요.",
      },
      formats: {
        title: "지원 형식",
        dek: "플랫폼별로 LightPhotos가 여는 파일, macOS만 따로 지원하는 형식, 사진 옆에 만드는 세 종류의 파일, 폴더 목록을 담는 카탈로그를 정리했어요.",
      },
    },
  },

  home: {
    title: "LightPhotos — RAW 사진을 위한 무료 오픈 소스 Lightroom 대안",
    desc: "RAW 사진을 빠르게 선별하고, 별점을 매기고, 편집하고, 내보내세요. macOS, Windows, Linux, 브라우저(데스크톱 Chrome 또는 Edge)에서 쓸 수 있는 무료 오픈 소스 Lightroom 대안이에요. 구독도 계정도 필요 없고, 사진과 편집 내용은 컴퓨터 밖으로 나가지 않아요.",
    tagline: "RAW 사진을 빠르게 선별하고 편집하세요.",
    lede: "macOS, Windows, Linux, 브라우저(데스크톱 Chrome 또는 Edge)에서 쓸 수 있는 무료 오픈 소스 Lightroom 대안이에요. 사진과 편집 내용은 컴퓨터 밖으로 나가지 않아요.",
    download: "다운로드",
    downloadFor: "{os}용 다운로드",
    openInBrowser: "브라우저에서 열기",
    github: "GitHub",
    demoOpen: "데모를 크게 재생",
    demoDialog: "LightPhotos 데모",
    demoClose: "닫기",
    demoDescription:
      "정원과 사막 사진이 담긴 폴더를 열어 둘러보고, 톤 슬라이더로 다리 사진을 현상하고, 난초 사진 네 장의 스택을 100퍼센트로 비교하고, 그리드에서 별점과 색상 레이블을 지정한 다음, 별 4개 이상인 사진을 내보내는 모습",
    featuresAria: "LightPhotos의 기능",
    features: {
      noImports: {
        title: "가져오기 없음",
        text: "디스크에 있는 어떤 폴더든 바로 열어요. 가져오기도 복사도 없어요. 편집 내용은 사진 옆에 저장되고, 원본은 절대 수정되지 않아요.",
        link: "내 데이터가 있는 곳",
      },
      fast: {
        title: "빠른 속도",
        text: "GPU로 렌더링하고, 전부 Rust로 작성했어요. macOS 데스크톱에서는 네이티브 RAW 디코딩을 써요.",
        link: "Rust를 쓰는 이유",
      },
      formats: {
        title: "파일 형식",
        text: "Sony, Canon, Nikon, Fujifilm, Panasonic, Olympus, Pentax, Leica, 휴대폰 DNG, JPEG, TIFF, HEIC(Mac 앱)를 지원해요.",
        link: "지원 형식",
      },
      batch: {
        title: "일괄 편집",
        text: "Lightroom 사전 설정을 포함한 사전 설정 적용, 조정 복사, 별점과 레이블 지정, 여러 사진 한꺼번에 채택하거나 제외하기를 할 수 있어요.",
        link: "사전 설정",
      },
      compare: {
        title: "스택 비교",
        text: "연사를 스택으로 묶고 모든 컷을 같은 위치로 확대해 나란히 비교하세요. 가장 선명한 컷만 남기면 돼요.",
        link: "스택 비교",
      },
      export: {
        title: "내보내기 & Immich",
        text: "완성한 사진을 JPEG로 다른 로컬 폴더나 직접 운영하는 Immich 서버로 내보내요 (데스크톱 전용).",
        link: "작동 방식",
      },
    },
    actionsAria: "더 둘러보기",
    blogsCard: {
      title: "블로그",
      text: "LightPhotos와 RAW 엔진을 만들어 온 여정이에요.",
    },
    helpCard: {
      title: "도움말",
      text: "사용자 가이드, 지원 형식, 키보드 단축키.",
    },
  },

  downloads: {
    title: "LightPhotos 다운로드",
    desc: "macOS, Windows, Linux용 LightPhotos 데스크톱 앱을 다운로드하세요. Apple Silicon, x86-64, ARM64용 네이티브 빌드로, 무료이고 오프라인에서 동작하며 용량은 12 MB 미만이에요.",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "다운",
    headingLight: "로드",
    gridAria: "데스크톱 빌드",
    builds: {
      "macos-arm64": {
        label: "Apple Silicon용 다운로드",
        steps: [".dmg를 열고 LightPhotos를 응용 프로그램 폴더로 드래그하세요."],
      },
      "macos-x86_64": {
        label: "Intel Mac용 다운로드",
        steps: [".dmg를 열고 LightPhotos를 응용 프로그램 폴더로 드래그하세요."],
      },
      "windows-x86_64": {
        label: "Windows용 다운로드",
        steps: [
          "압축 파일을 원하는 곳에 풀어요. 안에는 lightphotos.exe 하나만 있고, 따로 설치할 필요는 없어요.",
          "처음 실행하면 SmartScreen이 확인되지 않은 게시자라고 경고해요.",
          "추가 정보를 선택한 다음 실행을 누르세요. 다시는 나타나지 않아요.",
        ],
      },
      "linux-x86_64": {
        label: "Linux x86용 다운로드",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["tarball의 압축을 풀고 안에 있는 실행 파일을 실행하세요. 설치할 것도, 설정할 것도 없어요."],
      },
      "linux-arm64": {
        label: "Linux ARM용 다운로드",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["tarball의 압축을 풀고 안에 있는 실행 파일을 실행하세요. 설치할 것도, 설정할 것도 없어요."],
      },
    },
    showOnlyMine: "내 플랫폼만 보기",
    anotherPlatform: "다른 플랫폼을 찾으세요?",
    sharedTag: "맞는 게 없나요?",
    shared: [
      '전혀 다른 환경인가요? <a href="/app.html">웹 앱</a>은 같은 편집기이고, WebGPU를 지원하는 어떤 브라우저에서든 쓸 수 있어요',
      '릴리스 노트나 이전 버전이 필요하세요? 모든 빌드는 <a href="https://github.com/andrewyao/lightphotos/releases">GitHub 릴리스 페이지</a>에 있어요',
      '버그를 찾았거나 아이디어가 있으세요? <a href="https://github.com/andrewyao/lightphotos/issues">GitHub에서 이슈를 열어 주세요</a>',
      "어느 쪽이든 사진은 디스크에 그대로 있어요. 편집 내용은 .lightphotos 하위 폴더 안의 작은 파일에 저장되니, 폴더를 다른 곳으로 옮기면 편집 내용도 함께 따라가요",
    ],
  },

  blogs: {
    pageTitle: "LightPhotos 블로그",
    desc: "LightPhotos가 왜 만들어졌고 어떻게 만들어졌는지 정리한 글이에요.",
    heading: "블로그",
    sortAria: "글 정렬",
    newest: "최신순",
    oldest: "오래된 순",
    minRead: "읽는 데 {n}분",
    englishOnly: "글은 영어로 쓰여 있어요.",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "AI에게 촬영분 선별을 맡기는 세 가지 방법",
        blurb: "선별은 지루한 작업이라 AI에게 세 가지 방식으로 맡겨 봤어요. 앱 점수, 로컬 모델, Claude Code의 장단점과 직접 써 보는 방법을 소개해요.",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "다음 파워 유저는 화면을 보지 못해요",
        blurb: "접근성은 장애가 있는 사람이 앱을 쓰게 해 주고, MCP는 에이전트가 파워 유저를 대신해 앱을 쓰게 해 줘요. 둘 다 같은 명령 목록이 필요해요.",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "Mac에서 만난 LightPhotos와 RapidRAW",
        blurb: "폴더를 그 자리에서 읽는 두 Rust 앱이에요. 둘 다 RAW 픽셀을 부동소수점으로 다루는데, 하나는 다음 사진을 창 크기로 미리 준비하고 다른 하나는 모든 RAW를 원본 크기로 유지해요.",
      },
      "two-raw-decoders": {
        title: "두 RAW 디코더를 나란히 비교해요",
        blurb: "rawler와 LightCraft 자체 디코더를 비교해요. 고정된 하나의 파이프라인 대 다섯 단계, 기종별 테이블 대 DNG 색상 모델이에요.",
      },
      "raw-camera-support": {
        title: "LightPhotos와 LightCraft는 어떤 카메라를 지원할까요?",
        blurb: "RAW 파일 18장으로 확인한 카메라 지원 현황과, 미리보기 크기로 처리하면 시간이 달라지는 이유예요.",
      },
      "catalogs": {
        title: "카탈로그, 첫 번째 버전",
        blurb: "헤더에서 바꿔 쓰는, 이름 붙인 폴더 목록이에요. 편집 내용은 여전히 사진 옆에 저장돼요.",
      },
      "lightroom-alternative": {
        title: "무료 오픈 소스 Lightroom 대안",
        blurb: "LightPhotos와 Lightroom을 나란히 놓고, LightPhotos가 앞서는 점과 아직 못 하는 일을 살펴봐요.",
      },
      "linux-raw-photo-editor": {
        title: "Linux에서 쓰는 빠른 RAW 사진 편집기",
        blurb: "Lightroom은 Linux 앱이 없지만, LightPhotos는 ARM과 x86 네이티브 빌드를 제공해요.",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Mac에서 만난 두 Rust 사진 앱",
        blurb: "같은 비교를 데스크톱에서 해 봤어요. LightPhotos는 Apple의 ImageIO를 쓰고, LightCraft는 자체 디코더를 써요.",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "브라우저에서 만난 두 Rust 사진 앱",
        blurb: "같은 RAW 파일 스무 장으로 LightPhotos와 LightCraft를 나란히 비교해요.",
      },
      "exporting-to-your-own-immich-server": {
        title: "내 Immich 서버로 내보내기",
        blurb: "LightPhotos가 완성한 사진을 직접 고른 Immich 서버로 업로드하는 방법이에요.",
      },
      "challenges-with-webassembly": {
        title: "WebAssembly와 씨름한 기록",
        blurb: "Rust 앱을 브라우저 탭으로 옮기자 무엇이 깨졌는지 정리했어요.",
      },
      "my-plan": {
        title: "나의 계획, 그리고 계획에 없는 것",
        blurb: "LightPhotos가 앞으로 나아갈 방향과, 끝내 되지 않을 모습이에요.",
      },
      "measuring-a-gui-app": {
        title: "스스로를 속이지 않고 GUI 앱 측정하기",
        blurb: "추측 없이 GUI 앱을 반복해서 측정하는 방법이에요.",
      },
      "never-load-the-whole-folder": {
        title: "폴더 전체를 한꺼번에 불러오지 마세요",
        blurb: "사진 브라우저의 첫 버전이 메모리 부족으로 멈춘 이유예요.",
      },
      "six-queues-and-a-reserved-worker": {
        title: "여섯 개의 큐와 전용 워커 하나",
        blurb: "앱이 바쁠 때도 백그라운드 디코딩을 빠르게 유지하는 방법이에요.",
      },
      "where-your-data-lives": {
        title: "데이터는 쓰기가 허용된 곳에 둬요",
        blurb: "사진, 편집 내용, 메타데이터가 평범한 폴더에 남는 이유예요.",
      },
      "what-imageio-gives-you-free": {
        title: "ImageIO가 공짜로 주는 것, 그리고 떠나는 데 드는 비용",
        blurb: "ImageIO가 제공하는 것과, 앱을 다른 플랫폼에서도 쓸 수 있게 만드는 데 드는 비용이에요.",
      },
      "how-a-photo-gets-on-screen": {
        title: "사진이 화면에 나타나기까지",
        blurb: "RAW 파일이 디스플레이의 픽셀이 되기까지의 여정이에요.",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "에이전트가 코드를 쓰는 동안 Rust 배우기",
        blurb: "에이전트가 코드를 쓰는 동안 Rust를 익히는 현실적인 방법이에요.",
      },
      "why-rust": {
        title: "왜 Rust인가",
        blurb: "LightPhotos 뒤에 있는 아키텍처 결정이에요.",
      },
      "why-i-started-lightphotos": {
        title: "내가 LightPhotos를 시작한 이유",
        blurb: "잃어버린 사진 라이브러리에서 작은 사진 편집기가 시작됐어요.",
      },
    },
  },

  pages: {
    privacy: {
      title: "개인정보 — LightPhotos",
      desc: "LightPhotos가 이 웹사이트에서 무엇을 집계하는지, 의도적으로 무엇을 집계하지 않는지, 그리고 데스크톱 앱이 네트워크 요청을 전혀 보내지 않는 이유를 설명해요.",
    },
    terms: {
      title: "이용 약관 — LightPhotos",
      desc: "LightPhotos 웹사이트, 브라우저 앱, 데스크톱 앱을 사용할 때의 약관을 쉬운 말로 적었어요.",
    },
  },
} satisfies UI;
