// SPDX-License-Identifier: MIT OR Apache-2.0
//
// German UI strings. Same keys and shape as en.ts; see the notes there.
// Address form: Sie, as in the app itself.
import type { UI } from "./en";

export default {
  nav: {
    main: "Hauptnavigation",
    downloads: "Downloads",
    openInBrowser: "Im Browser öffnen",
    blogs: "Blogs",
    help: "Hilfe",
    github: "LightPhotos auf GitHub",
    language: "Sprache",
    theme: "Design",
    themeLight: "Hell",
    themeNeutral: "Neutralgrau",
    themeDark: "Dunkel",
  },

  footer: {
    author: "Autor: Andrew Yao",
    feedback: "Feedback",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    licenses: "Lizenzen",
    version: "Version: {v}",
    build: "Build {v}",
  },

  docs: {
    pageTitle: "{title} — LightPhotos Hilfe",
    navTitle: "Dokumentation",
    help: "Hilfe",
    back: "Zurück",
    next: "Weiter",
    moreTopics: "Weitere Themen",
    shortcutsNote:
      "Tastaturkurzbefehle sind in der macOS-Schreibweise angegeben &ndash; unter Windows und Linux lesen Sie <kbd>Cmd</kbd> als <kbd>Ctrl</kbd>. Mit <kbd>?</kbd> zeigt die App die Liste so an, wie sie auf Ihrem Rechner gilt.",
    redirectTitle: "LightPhotos Hilfe",
    redirecting: "Die LightPhotos-Dokumentation wird geöffnet…",
    redirectLink: "Erste Schritte: Die App öffnen",
    groups: {
      gettingStarted: "Erste Schritte",
      reference: "Referenz",
    },
    topics: {
      "open-the-app": {
        title: "Die App öffnen",
        dek: "Zwei Wege hinein – ein Browser-Tab oder eine Desktop-App – und in beiden Fällen derselbe Editor über denselben Dateien.",
      },
      "pick-a-folder": {
        title: "Einen Ordner wählen",
        dek: "Richten Sie LightPhotos auf einen Ordner, der schon auf Ihrer Festplatte liegt. Einen Import, der Sie aufhält, gibt es nicht.",
      },
      catalogs: {
        title: "Kataloge",
        dek: "Führen Sie getrennte Listen von Ordnern, etwa für Familienfotos und Kundenaufträge, und wechseln Sie in der Kopfleiste zwischen ihnen.",
      },
      browse: {
        title: "Den Ordner durchsehen",
        dek: "Ein Raster aus Miniaturen, die Sie bewerten, filtern und auswählen können und die beim Hineinscrollen dekodiert werden.",
      },
      "select-a-photo": {
        title: "Ein Foto auswählen",
        dek: "Das Raster dient zum Entscheiden; die Lupenansicht zum Arbeiten an einem einzelnen Foto in voller Größe.",
      },
      "compare-a-stack": {
        title: "Fotos vergleichen",
        dek: "Fassen Sie eine Serie zu einem Stapel zusammen oder wählen Sie bis zu sechs Fotos aus und vergleichen Sie jede Aufnahme an derselben Stelle.",
      },
      adjust: {
        title: "Einstellungen anpassen",
        dek: "Tonwerte, Farbmischung und Color-Grading, Details, Effekte und Zuschnitt – alles jederzeit umkehrbar.",
      },
      masks: {
        title: "Masken",
        dek: "Nur einen Teil eines Fotos anpassen: mit einem Verlauf, einer Ellipse oder einem automatisch erkannten Motiv oder Himmel, dazu die Retusche für Flecken.",
      },
      presets: {
        title: "Vorgaben",
        dek: "Einen gesicherten Look mit einem Klick auf viele Fotos anwenden und Ihre Lightroom-Vorgaben direkt aus deren Ordnern nutzen.",
      },
      export: {
        title: "Export",
        dek: "Ihre Bearbeitungen in neue JPEG-, PNG-, TIFF-, WebP- oder AVIF-Dateien einrechnen und die Originale genau so lassen, wie sie waren.",
      },
      immich: {
        title: "Immich-Server",
        dek: "Fertige Fotos aus der Desktop-App auf jeden Immich-Server hochladen, den Sie selbst betreiben.",
      },
      shortcuts: {
        title: "Tastaturkurzbefehle",
        dek: "Jede Taste, auf die LightPhotos reagiert, nach Tätigkeit gruppiert.",
      },
      formats: {
        title: "Unterstützte Formate",
        dek: "Die Dateien, die LightPhotos auf jeder Plattform öffnet – auch das eine, das macOS von sich aus mitbringt –, die drei Arten von Dateien, die es daneben anlegt, und der Katalog, der Ihre Ordner auflistet.",
      },
    },
  },

  home: {
    title: "LightPhotos — eine kostenlose Open-Source-Alternative zu Lightroom für RAW-Fotos",
    desc: "RAW-Fotos schnell aussortieren, bewerten, bearbeiten und exportieren. Eine kostenlose Open-Source-Alternative zu Lightroom für macOS, Windows, Linux und den Browser (Chrome oder Edge am Desktop). Kein Abo, kein Konto, und Ihre Fotos und Bearbeitungen verlassen nie Ihren Rechner.",
    tagline: "RAW-Fotos schnell aussortieren und bearbeiten.",
    lede: "Eine kostenlose Open-Source-Alternative zu Lightroom für macOS, Windows, Linux und den Browser (Chrome oder Edge am Desktop). Ihre Fotos und Bearbeitungen verlassen nie Ihren Rechner.",
    download: "Herunterladen",
    downloadFor: "Für {os} herunterladen",
    openInBrowser: "Im Browser öffnen",
    github: "GitHub",
    demoOpen: "Demo größer abspielen",
    demoDialog: "LightPhotos-Demo",
    demoClose: "Schließen",
    demoDescription:
      "Ein Ordner mit Garten- und Wüstenfotos wird geöffnet und durchgesehen, ein Foto einer Brücke mit den Tonwertreglern entwickelt, ein Stapel aus vier Orchideenaufnahmen bei 100 Prozent verglichen, im Raster werden Sterne und Farbmarkierungen vergeben, und schließlich werden die Fotos mit vier Sternen und mehr exportiert",
    featuresAria: "Was LightPhotos kann",
    features: {
      noImports: {
        title: "Kein Import",
        text: "Öffnen Sie einen beliebigen Ordner auf Ihrer Festplatte. Kein Import, kein Kopieren. Bearbeitungen bleiben neben Ihren Fotos, und die Originale werden nie verändert.",
        link: "Wo Ihre Daten liegen",
      },
      fast: {
        title: "Schnell",
        text: "Rendert auf der GPU. Komplett in Rust geschrieben. Native RAW-Dekodierung in der macOS-Desktop-App.",
        link: "Warum Rust",
      },
      formats: {
        title: "Dateiformate",
        text: "Sony, Canon, Nikon, Fujifilm, Panasonic, Olympus, Pentax, Leica, DNGs von Smartphones, JPEG, TIFF und HEIC (Mac-App).",
        link: "Unterstützte Formate",
      },
      batch: {
        title: "Mehrere Fotos auf einmal",
        text: "Wenden Sie Vorgaben an, auch Ihre aus Lightroom, kopieren Sie Anpassungen, setzen Sie Sterne und Farbmarkierungen und markieren oder lehnen Sie viele Fotos auf einmal ab.",
        link: "Vorgaben",
      },
      compare: {
        title: "Einen Stapel vergleichen",
        text: "Stapeln Sie eine Serie und sehen Sie dann jede Aufnahme nebeneinander, auf dieselbe Stelle gezoomt. Behalten Sie die schärfste.",
        link: "Einen Stapel vergleichen",
      },
      export: {
        title: "Export & Immich",
        text: "Exportieren Sie fertige Fotos als JPEGs in einen anderen lokalen Ordner oder auf Ihren eigenen Immich-Server (nur Desktop).",
        link: "So funktioniert es",
      },
    },
    actionsAria: "Weiter entdecken",
    blogsCard: {
      title: "Blogs",
      text: "Die Geschichte hinter LightPhotos und seiner RAW-Engine.",
    },
    helpCard: {
      title: "Hilfe",
      text: "Anleitungen, unterstützte Formate, Tastaturkurzbefehle.",
    },
  },

  downloads: {
    title: "LightPhotos herunterladen",
    desc: "Laden Sie die LightPhotos-Desktop-App für macOS, Windows und Linux herunter. Native Builds für Apple Silicon, x86-64 und ARM64 – kostenlos, offline und unter 12 MB.",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "Down",
    headingLight: "loads",
    note: "Der Windows-Build ist noch nicht codesigniert, daher fragt SmartScreen einmal nach, ob Sie ihn wirklich öffnen wollten. Das dauert etwa zehn Sekunden, und die Schritte unter dem Build führen Sie hindurch.",
    gridAria: "Desktop-Builds",
    builds: {
      "macos-arm64": {
        label: "Für Apple Silicon herunterladen",
        steps: ["Öffnen Sie die .dmg und ziehen Sie LightPhotos in Ihren Ordner „Programme“."],
      },
      "macos-x86_64": {
        label: "Für Intel-Mac herunterladen",
        steps: ["Öffnen Sie die .dmg und ziehen Sie LightPhotos in Ihren Ordner „Programme“."],
      },
      "windows-x86_64": {
        label: "Für Windows herunterladen",
        steps: [
          "Entpacken Sie das Archiv an einen beliebigen Ort. Darin liegt eine einzelne lightphotos.exe, ganz ohne Installationsprogramm.",
          "SmartScreen warnt beim ersten Start vor einem unbekannten Herausgeber.",
          "Wählen Sie „Weitere Informationen“ und dann „Trotzdem ausführen“. Danach sehen Sie die Warnung nicht mehr.",
        ],
      },
      "linux-x86_64": {
        label: "Für Linux x86 herunterladen",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["Entpacken Sie das Tarball und starten Sie die Binärdatei darin. Nichts zu installieren, nichts zu konfigurieren."],
      },
      "linux-arm64": {
        label: "Für Linux ARM herunterladen",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["Entpacken Sie das Tarball und starten Sie die Binärdatei darin. Nichts zu installieren, nichts zu konfigurieren."],
      },
    },
    showOnlyMine: "Nur meine Plattform zeigen",
    anotherPlatform: "Sie suchen eine andere Plattform?",
    sharedTag: "Nichts passt?",
    shared: [
      'Ganz etwas anderes im Einsatz? Die <a href="/app.html">Web-App</a> ist derselbe Editor, in jedem Browser mit WebGPU',
      'Release Notes oder eine ältere Version gesucht? Jeder Build steht auf der <a href="https://github.com/andrewyao/lightphotos/releases">GitHub-Releases-Seite</a>',
      'Einen Fehler gefunden oder eine Idee? <a href="https://github.com/andrewyao/lightphotos/issues">Eröffnen Sie ein Issue auf GitHub</a>',
      "So oder so bleiben Ihre Fotos auf der Festplatte. Ihre Bearbeitungen werden in einer kleinen Datei in einem Unterordner namens .lightphotos gesichert; verschieben Sie einen Ordner also irgendwohin, wandern alle seine Bearbeitungen mit",
    ],
  },

  blogs: {
    pageTitle: "LightPhotos-Blogs",
    desc: "Hintergründe dazu, warum es LightPhotos gibt und wie es gebaut ist.",
    heading: "Blogs",
    sortAria: "Beiträge sortieren",
    newest: "Neueste zuerst",
    oldest: "Älteste zuerst",
    minRead: "{n} Min. Lesezeit",
    englishOnly: "Die Beiträge selbst sind auf Englisch verfasst.",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "Drei Wege, ein Shooting per KI auszusortieren",
        blurb: "Aussortieren ist der langweilige Teil, deshalb habe ich es auf drei Arten an KI abgegeben: mit dem Score der App, einem lokalen Modell und Claude Code, samt Vor- und Nachteilen und einer Anleitung zum Ausprobieren.",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "Ihr nächster Power-User kann den Bildschirm nicht sehen",
        blurb: "Barrierefreiheit ermöglicht Menschen mit Behinderungen die Nutzung der App, MCP ermöglicht sie einem Agenten für einen Power-User, und beide brauchen dieselbe Liste an Befehlen.",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "LightPhotos und RapidRAW auf dem Mac",
        blurb: "Zwei Rust-Apps, die Ordner direkt vor Ort lesen und RAW-Pixel beide in Fließkommazahlen halten, wobei die eine das nächste Foto in Fenstergröße vorbereitet und die andere jedes RAW in voller Größe vorhält.",
      },
      "two-raw-decoders": {
        title: "Zwei RAW-Dekoder im direkten Vergleich",
        blurb: "rawler und der eigene Dekoder von LightCraft im Vergleich: eine feste Pipeline gegen fünf Stufen, eine Gehäusetabelle gegen das DNG-Farbmodell.",
      },
      "raw-camera-support": {
        title: "Welche Kameras unterstützen LightPhotos und LightCraft?",
        blurb: "18 RAW-Dateien, die Kameraunterstützung und der Grund, warum die Verarbeitung in Vorschaugröße die Zeit verändert.",
      },
      "catalogs": {
        title: "Kataloge in einer ersten Version",
        blurb: "Benannte Ordnerlisten, zwischen denen Sie über die Kopfleiste wechseln, während Ihre Bearbeitungen weiterhin neben Ihren Fotos liegen.",
      },
      "lightroom-alternative": {
        title: "Eine kostenlose Open-Source-Alternative zu Lightroom",
        blurb: "LightPhotos und Lightroom im Vergleich: wo LightPhotos vorn liegt und was es noch nicht kann.",
      },
      "linux-raw-photo-editor": {
        title: "Ein schneller RAW-Editor für Linux",
        blurb: "Lightroom hat keine Linux-App, LightPhotos dagegen native ARM- und x86-Builds.",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Zwei Rust-Foto-Apps auf dem Mac",
        blurb: "Derselbe Vergleich auf dem Desktop, bei dem LightPhotos das ImageIO von Apple nutzt und LightCraft eigene Dekoder.",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "Zwei Rust-Foto-Apps im Browser",
        blurb: "LightPhotos und LightCraft im direkten Vergleich, mit denselben zwanzig RAW-Dateien.",
      },
      "exporting-to-your-own-immich-server": {
        title: "Export auf den eigenen Immich-Server",
        blurb: "Wie LightPhotos fertige Fotos auf den Immich-Server hochlädt, den Sie auswählen.",
      },
      "challenges-with-webassembly": {
        title: "Stolpersteine bei WebAssembly",
        blurb: "Was alles kaputtging, als die Rust-App in einen Browser-Tab umzog.",
      },
      "my-plan": {
        title: "Mein Plan und was nicht darin vorkommt",
        blurb: "Wohin sich LightPhotos entwickeln wird und was es nie werden soll.",
      },
      "measuring-a-gui-app": {
        title: "Eine GUI-App messen, ohne sich selbst zu belügen",
        blurb: "Ein wiederholbarer Weg, eine GUI-App zu messen, ganz ohne Raten.",
      },
      "never-load-the-whole-folder": {
        title: "Laden Sie nie den ganzen Ordner",
        blurb: "Warum der ersten Version eines Foto-Browsers der Speicher ausging.",
      },
      "six-queues-and-a-reserved-worker": {
        title: "Sechs Warteschlangen und ein reservierter Worker",
        blurb: "Wie das Dekodieren im Hintergrund schnell bleibt, auch wenn die App ausgelastet ist.",
      },
      "where-your-data-lives": {
        title: "Ihre Daten liegen dort, wo Sie schreiben dürfen",
        blurb: "Warum Fotos, Bearbeitungen und Metadaten in ganz normalen Ordnern bleiben.",
      },
      "what-imageio-gives-you-free": {
        title: "Was ImageIO gratis liefert und was der Abschied kostet",
        blurb: "Was ImageIO Ihnen bietet und was es kostet, die App portabel zu machen.",
      },
      "how-a-photo-gets-on-screen": {
        title: "Wie ein Foto auf den Bildschirm kommt",
        blurb: "Der Weg von der RAW-Datei zu den Pixeln auf Ihrem Display.",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "Rust lernen, während die Agenten den Code schreiben",
        blurb: "Ein praktischer Ansatz, Rust zu lernen, während Agenten den Code schreiben.",
      },
      "why-rust": {
        title: "Warum Rust",
        blurb: "Die Architekturentscheidung hinter LightPhotos.",
      },
      "why-i-started-lightphotos": {
        title: "Warum ich LightPhotos begonnen habe",
        blurb: "Die verlorene Fotobibliothek, aus der ein kleiner Foto-Editor wurde.",
      },
    },
  },

  pages: {
    privacy: {
      title: "Datenschutz — LightPhotos",
      desc: "Was LightPhotos auf dieser Website zählt, was es bewusst nicht erfasst und warum die Desktop-App überhaupt keine Netzwerkanfragen stellt.",
    },
    terms: {
      title: "Nutzungsbedingungen — LightPhotos",
      desc: "Die Bedingungen für die Nutzung der LightPhotos-Website, der Browser-App und der Desktop-App, in verständlicher Sprache.",
    },
  },
} satisfies UI;
