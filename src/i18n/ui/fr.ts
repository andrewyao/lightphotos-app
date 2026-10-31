// SPDX-License-Identifier: MIT OR Apache-2.0
//
// French UI strings. Same keys and shape as ./en; see the notes there.
// Control names follow the app's own French labels (src/i18n/glossary/fr.tsv).
import type { UI } from "./en";

export default {
  nav: {
    main: "Principal",
    downloads: "Téléchargements",
    openInBrowser: "Ouvrir dans le navigateur",
    blogs: "Blogs",
    help: "Aide",
    github: "LightPhotos sur GitHub",
    language: "Langue",
    theme: "Thème",
    themeLight: "Clair",
    themeNeutral: "Gris neutre",
    themeDark: "Sombre",
  },

  footer: {
    author: "Auteur : Andrew Yao",
    feedback: "Commentaires",
    privacy: "Confidentialité",
    terms: "Conditions",
    licenses: "Licences",
    version: "Version : {v}",
    build: "Build {v}",
  },

  docs: {
    pageTitle: "{title} — Aide LightPhotos",
    navTitle: "Documentation",
    help: "Aide",
    back: "Précédent",
    next: "Suivant",
    moreTopics: "Autres sujets",
    shortcutsNote:
      "Les raccourcis sont écrits à la manière de macOS&nbsp;: sous Windows et Linux, lisez <kbd>Cmd</kbd> comme <kbd>Ctrl</kbd>. Appuyez sur <kbd>?</kbd> dans l’app pour voir la liste telle que votre machine l’affiche.",
    redirectTitle: "Aide LightPhotos",
    redirecting: "Ouverture de la documentation LightPhotos…",
    redirectLink: "Premiers pas : ouvrir l’app",
    groups: {
      gettingStarted: "Premiers pas",
      reference: "Référence",
    },
    topics: {
      "open-the-app": {
        title: "Ouvrir l’app",
        dek: "Deux façons d’entrer, un onglet de navigateur ou une version de bureau, et le même éditeur sur les mêmes fichiers dans les deux cas.",
      },
      "pick-a-folder": {
        title: "Choisir un dossier",
        dek: "Pointez LightPhotos vers un dossier déjà présent sur votre disque. Aucune étape d’import à attendre.",
      },
      catalogs: {
        title: "Catalogues",
        dek: "Gardez des listes de dossiers séparées, par exemple les photos de famille et le travail pour des clients, et passez de l’une à l’autre depuis l’en-tête.",
      },
      browse: {
        title: "Parcourir le dossier",
        dek: "Une grille de vignettes que vous pouvez noter, filtrer et sélectionner, décodées au fur et à mesure qu’elles défilent à l’écran.",
      },
      "select-a-photo": {
        title: "Sélectionner une photo",
        dek: "La grille sert à trier ; la Loupe sert à travailler une photo en taille réelle.",
      },
      "compare-a-stack": {
        title: "Comparer des photos",
        dek: "Regroupez une rafale en une pile, ou sélectionnez jusqu’à six photos, et comparez chaque image au même endroit.",
      },
      adjust: {
        title: "Régler les ajustements",
        dek: "Tons, mixage et étalonnage des couleurs, détail, effets et recadrage : tout est réversible.",
      },
      masks: {
        title: "Masques",
        dek: "Ajustez une partie d’une photo : un dégradé, une ellipse, ou un sujet ou un ciel détecté pour vous, plus la Retouche pour les taches.",
      },
      presets: {
        title: "Préréglages",
        dek: "Appliquez un rendu enregistré à de nombreuses photos en un clic, et utilisez vos préréglages Lightroom directement depuis leurs dossiers.",
      },
      export: {
        title: "Exporter",
        dek: "Intégrez vos retouches dans de nouveaux fichiers JPEG, PNG, TIFF, WebP ou AVIF, en laissant les originaux exactement comme ils étaient.",
      },
      immich: {
        title: "Serveur Immich",
        dek: "Envoyez vos photos terminées depuis l’app de bureau vers n’importe quel serveur Immich que vous hébergez vous-même.",
      },
      shortcuts: {
        title: "Raccourcis clavier",
        dek: "Toutes les touches que LightPhotos écoute, regroupées selon ce que vous faites.",
      },
      formats: {
        title: "Formats pris en charge",
        dek: "Les fichiers que LightPhotos ouvre sur chaque plateforme, y compris celui que macOS gère seul, les trois sortes de fichiers qu’il écrit à côté, et le catalogue qui liste vos dossiers.",
      },
    },
  },

  home: {
    title: "LightPhotos — une alternative libre et gratuite à Lightroom pour les photos RAW",
    desc: "Triez, notez, retouchez et exportez vos photos RAW rapidement. Une alternative libre et gratuite à Lightroom pour macOS, Windows, Linux et le navigateur (Chrome ou Edge sur ordinateur). Sans abonnement, sans compte, et vos photos et vos retouches ne quittent jamais votre ordinateur.",
    tagline: "Triez et retouchez vos photos RAW rapidement.",
    lede: "Une alternative libre et gratuite à Lightroom pour macOS, Windows, Linux et le navigateur (Chrome ou Edge sur ordinateur). Vos photos et vos retouches ne quittent jamais votre ordinateur.",
    download: "Télécharger",
    downloadFor: "Télécharger pour {os}",
    openInBrowser: "Ouvrir dans le navigateur",
    github: "GitHub",
    demoOpen: "Voir la démo en plus grand",
    demoDialog: "Démo de LightPhotos",
    demoClose: "Fermer",
    demoDescription:
      "Ouverture d’un dossier de photos de jardin et de désert, parcours des photos, développement d’une photo de pont avec les curseurs de tons, comparaison d’une pile de quatre photos d’orchidée à 100 %, notation et étiquettes de couleur dans la grille, puis export des photos notées quatre étoiles et plus",
    featuresAria: "Ce que fait LightPhotos",
    features: {
      noImports: {
        title: "Sans import",
        text: "Ouvrez n’importe quel dossier de votre disque. Ni import ni copie. Les retouches restent à côté de vos photos, et les originaux ne sont jamais modifiés.",
        link: "Où sont vos données",
      },
      fast: {
        title: "Rapide",
        text: "Rendu sur le GPU. Écrit entièrement en Rust. Décodage RAW natif dans l’app de bureau macOS.",
        link: "Pourquoi Rust",
      },
      formats: {
        title: "Formats de fichier",
        text: "Sony, Canon, Nikon, Fujifilm, Panasonic, Olympus, Pentax, Leica, DNG de téléphone, JPEG, TIFF et HEIC (app Mac).",
        link: "Formats pris en charge",
      },
      batch: {
        title: "Retouches par lot",
        text: "Appliquez des préréglages, y compris les vôtres venus de Lightroom, copiez des ajustements, attribuez étoiles et étiquettes, et retenez ou rejetez de nombreuses photos d’un coup.",
        link: "Préréglages",
      },
      compare: {
        title: "Comparer une pile",
        text: "Mettez une rafale en pile, puis voyez chaque image côte à côte, zoomée au même endroit. Gardez la plus nette.",
        link: "Comparer une pile",
      },
      export: {
        title: "Export et Immich",
        text: "Exportez vos photos terminées en JPEG vers un autre dossier local, ou vers votre propre serveur Immich (bureau uniquement).",
        link: "Comment ça marche",
      },
    },
    actionsAria: "Continuer à explorer",
    blogsCard: {
      title: "Blogs",
      text: "Le récit de la création de LightPhotos et de son moteur RAW.",
    },
    helpCard: {
      title: "Aide",
      text: "Guides d’utilisation, formats pris en charge, raccourcis clavier.",
    },
  },

  downloads: {
    title: "Télécharger LightPhotos",
    desc: "Téléchargez l’app de bureau LightPhotos pour macOS, Windows et Linux. Versions natives pour Apple Silicon, x86-64 et ARM64, gratuites, hors ligne et de moins de 12 Mo.",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "Télé",
    headingLight: "chargements",
    note: "La version Windows n’est pas encore signée numériquement, donc SmartScreen demande une fois si vous voulez vraiment l’ouvrir. Cela prend une dizaine de secondes, et les étapes sous la version vous guident.",
    gridAria: "Versions de bureau",
    builds: {
      "macos-arm64": {
        label: "Télécharger pour Apple Silicon",
        steps: ["Ouvrez le .dmg et faites glisser LightPhotos dans votre dossier Applications."],
      },
      "macos-x86_64": {
        label: "Télécharger pour Mac Intel",
        steps: ["Ouvrez le .dmg et faites glisser LightPhotos dans votre dossier Applications."],
      },
      "windows-x86_64": {
        label: "Télécharger pour Windows",
        steps: [
          "Décompressez l’archive où vous voulez. Elle contient un seul lightphotos.exe, sans installateur à parcourir.",
          "SmartScreen signale un éditeur non reconnu la première fois que vous le lancez.",
          "Choisissez Informations complémentaires, puis Exécuter quand même. Vous ne le reverrez plus.",
        ],
      },
      "linux-x86_64": {
        label: "Télécharger pour Linux x86",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["Extrayez l’archive tar et lancez le binaire qu’elle contient. Rien à installer, rien à configurer."],
      },
      "linux-arm64": {
        label: "Télécharger pour Linux ARM",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["Extrayez l’archive tar et lancez le binaire qu’elle contient. Rien à installer, rien à configurer."],
      },
    },
    showOnlyMine: "Afficher seulement ma plateforme",
    anotherPlatform: "Vous cherchez une autre plateforme ?",
    sharedTag: "Rien ne convient ?",
    shared: [
      'Sur autre chose ? L’<a href="/app.html">app web</a> est le même éditeur, dans n’importe quel navigateur avec WebGPU',
      'Besoin des notes de version ou d’une version plus ancienne ? Chaque version est sur la <a href="https://github.com/andrewyao/lightphotos/releases">page des versions GitHub</a>',
      'Un bug ou une idée ? <a href="https://github.com/andrewyao/lightphotos/issues">Ouvrez un ticket sur GitHub</a>',
      "Dans tous les cas, vos photos restent sur le disque. Vos retouches sont enregistrées dans un petit fichier, dans un sous-dossier .lightphotos : si vous déplacez un dossier ailleurs, toutes ses retouches le suivent",
    ],
  },

  blogs: {
    pageTitle: "Blogs LightPhotos",
    desc: "Des articles sur les raisons d’être de LightPhotos et sur la façon dont il est construit.",
    heading: "Blogs",
    sortAria: "Trier les articles",
    newest: "Plus récents d’abord",
    oldest: "Plus anciens d’abord",
    minRead: "{n} min de lecture",
    englishOnly: "Les articles eux-mêmes sont rédigés en anglais.",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "Trois façons de confier le tri d’une séance à l’IA",
        blurb: "Le tri est la partie ingrate. Je l’ai confié à l’IA de trois façons : le score de l’app, un modèle local et Claude Code, avec les avantages, les limites et la marche à suivre pour chacune.",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "Votre prochain utilisateur expert ne voit pas l’écran",
        blurb: "L’accessibilité permet aux personnes en situation de handicap d’utiliser l’app, et MCP permet à un agent de l’utiliser pour un utilisateur expert, avec la même liste de commandes pour les deux.",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "LightPhotos et RapidRAW sur Mac",
        blurb: "Deux apps Rust qui lisent les dossiers sur place et gardent les pixels RAW en virgule flottante, l’une préparant la photo suivante à la taille de la fenêtre, l’autre gardant chaque RAW en taille réelle.",
      },
      "two-raw-decoders": {
        title: "Deux décodeurs RAW face à face",
        blurb: "rawler contre le décodeur maison de LightCraft : un pipeline fixe contre cinq étapes, une table de boîtiers contre le modèle colorimétrique DNG.",
      },
      "raw-camera-support": {
        title: "Quels appareils LightPhotos et LightCraft prennent-ils en charge ?",
        blurb: "18 fichiers RAW, la prise en charge des appareils, et pourquoi traiter à la taille de l’aperçu change le temps de calcul.",
      },
      "catalogs": {
        title: "Les Catalogues, une première version",
        blurb: "Des listes de dossiers nommées, entre lesquelles on passe depuis l’en-tête, avec vos retouches toujours stockées à côté de vos photos.",
      },
      "lightroom-alternative": {
        title: "Une alternative libre et gratuite à Lightroom",
        blurb: "LightPhotos et Lightroom face à face : là où LightPhotos l’emporte, et ce qu’il ne sait pas encore faire.",
      },
      "linux-raw-photo-editor": {
        title: "Un éditeur de photos RAW rapide pour Linux",
        blurb: "Lightroom n’a pas d’app Linux, alors que LightPhotos propose des versions natives pour ARM et x86.",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Deux apps photo en Rust sur Mac",
        blurb: "La même comparaison sur le bureau : LightPhotos s’appuie sur ImageIO d’Apple, tandis que LightCraft utilise ses propres décodeurs.",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "Deux apps photo en Rust dans le navigateur",
        blurb: "LightPhotos et LightCraft face à face, avec les mêmes vingt fichiers RAW.",
      },
      "exporting-to-your-own-immich-server": {
        title: "Exporter vers votre propre serveur Immich",
        blurb: "Comment LightPhotos envoie les photos terminées vers le serveur Immich de votre choix.",
      },
      "challenges-with-webassembly": {
        title: "Les défis de WebAssembly",
        blurb: "Ce qui a cassé quand l’app Rust a déménagé dans un onglet de navigateur.",
      },
      "my-plan": {
        title: "Mon plan, et ce qui n’y figure pas",
        blurb: "Où va LightPhotos, et ce qu’il ne deviendra jamais.",
      },
      "measuring-a-gui-app": {
        title: "Mesurer une app graphique sans se raconter d’histoires",
        blurb: "Une méthode reproductible pour mesurer une app graphique, sans approximations.",
      },
      "never-load-the-whole-folder": {
        title: "Ne chargez jamais tout le dossier",
        blurb: "Pourquoi la première version d’un navigateur de photos a manqué de mémoire.",
      },
      "six-queues-and-a-reserved-worker": {
        title: "Six files d’attente et un worker réservé",
        blurb: "Comment le décodage en arrière-plan reste rapide quand l’app est occupée.",
      },
      "where-your-data-lives": {
        title: "Vos données vivent là où vous avez le droit d’écrire",
        blurb: "Pourquoi les photos, les retouches et les métadonnées restent dans des dossiers ordinaires.",
      },
      "what-imageio-gives-you-free": {
        title: "Ce qu’ImageIO offre gratuitement, et ce que coûte son abandon",
        blurb: "Ce qu’ImageIO vous apporte, et ce qu’il en coûte de rendre l’app portable.",
      },
      "how-a-photo-gets-on-screen": {
        title: "Comment une photo arrive à l’écran",
        blurb: "Le trajet d’un fichier RAW jusqu’aux pixels de votre écran.",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "Apprendre Rust pendant que les agents l’écrivent",
        blurb: "Une méthode concrète pour apprendre Rust pendant que des agents écrivent le code.",
      },
      "why-rust": {
        title: "Pourquoi Rust",
        blurb: "La décision d’architecture derrière LightPhotos.",
      },
      "why-i-started-lightphotos": {
        title: "Pourquoi j’ai lancé LightPhotos",
        blurb: "La photothèque perdue d’où est né un petit éditeur de photos.",
      },
    },
  },

  pages: {
    privacy: {
      title: "Confidentialité — LightPhotos",
      desc: "Ce que LightPhotos compte sur ce site web, ce qu’il ne compte volontairement pas, et pourquoi l’app de bureau n’effectue aucune requête réseau.",
    },
    terms: {
      title: "Conditions — LightPhotos",
      desc: "Les conditions d’utilisation du site web, de l’app web et de l’app de bureau LightPhotos, en langage simple.",
    },
  },
} satisfies UI;
