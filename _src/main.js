// ===================== Utilities =====================
const textEncoder = new TextEncoder(); // UTF-8 bytes
const ICON_BY_CODE = new Map(); // DQVC code (hex int) -> icon index
const KEY = 'XENLONPROJECTKEY';
const MOD = 0xC2A030D4n;
const POW32MOD = (1n << 32n) % MOD;
const MARKER = Uint8Array.from([0xDE,0xED,0xBE,0xEF]);


// lang.js
// 多言語辞書（テーマの各オプションも含む）
const translations = {
    ja: {
    title: "DQVCアイテムリスト生成",
    items: "アイテム",
    selected: "選択済み",
    noItem: "まだアイテムが選択されていません。",
    dropTitle: "ここに .bin ファイルをドロップ",
    dropHint: "Drop a .bin file here to load",
    loadBtn: "読み込み",
    downloadBtn: "ダウンロード",
    themeLabel: "テーマ",
    langLabel: "言語",
    searchPlaceholder: "検索 / Search",
    themeDark: "ダーク",
    themeLight: "ライト",
    themeBlue: "ブルー",
    themeGold: "ゴールド",
    themePink: "ピンク",
    themeOrange: "ダーク+",
    themeDeepDark: "ディープダーク",
    themeDarkColorblind: "ダーク色弱（オレンジ）",
    themeDarkTritanopia: "ダーク トリタノピア（赤）",
    themeLightGray: "ライト＋（グレー）",
    themelightGrayPlus: "ライト＋＋（グレー）",
    themeLightCool: "ライト＋（クールブルー）",
    themeLightSepia: "セピア（紙風）",
    themeLightGreen: "ライト＋（グリーン）",
    themeLightHighContrast: "ライト（高コントラスト）",
    priceLabel: "価格",
    minLabel: "最小",
    maxLabel: "最大",
    bulkTitle: "一括個数指定",
    bulkApply: "一括適用",
    presetTitle: "固定リストを適用",
    presetLabel: "リスト",
    presetApply: "適用",
    presetPlaceholder: "リストを選択",
    filterSelected: "検索で選択済みも絞り込む",
    deleteMatched: "検索でマッチしたものを削除",
    deleteUnmatched: "検索でマッチしなかったものを削除",
    deleteAll: "すべて削除",
    confirmDelete: "下記のアイテムを削除します。よろしいですか",
    noResults: "該当するアイテムがありません。",
    infoTitle: "このツールについて",
    infoIntro1: "このウェブサイトは、カスタムWFCサーバーでそのまま使用できるDQVCショップ用のdlcデータを生成するツールです。",
    infoIntro2: "DQVCは、1個のアイテムでも有効とみなされます。6個以上の場合、乱数によって数、品ぞろえが決定されます。",
    infoCollapsible: "このメッセージは折りたたむことができます。",
    usageTitle: "使用法",
    step1: "送りたいアイテムを選択する",
    step2: "「ダウンロード」をクリックする",
    step3: "次にzipファイルを展開し、カスタムWFCサーバーの所定のフォルダに配置します。",
    pathJpn: "jpn: /dlc/YDQJ",
    pathUsa: "usa: /dlc/YDQE",
    pathOther: "それ以外: /dlc/YDQP",
    step4a: "WFCサーバーを起動します。使用するサーバーによっては、ローカルIPアドレスの指定などが必要な場合があります。",
    step4b: "パソコンをdsと同じネットワークに接続します。(オープンのネットワークの場合、他のアプリを閉じること)",
    step4c: "「パソコンのipアドレス」を確認します。",
    step4d: "dqixのWi-Fi設定を開き、接続し、詳細設定を開き、dns自動取得を「しない」、プライマリdnsを「パソコンのipアドレス」を入力します。",
    step4e: "dqixから接続します。",
    step5: "エンジョイ！",
    notesTitle: "注意事項",
    note1: "このジェネレーターは個人や私的な使用で、楽しむことを目的としています。",
    note2: "商業利用は許可の上で行われるものとします。",
    note3: "任意のDQVCショップデータを書き込んだロムを売買、転売、売却するのはやめましょう。",
    note4: "商業利用が確認された場合、ツールの公開を停止する場合があります。",
    note5: "この著作物は、複数の著作権者のコンテンツ（許可あり）を含みます。  ",
    note6: "このツールのソースコードのダウンロードや保存は禁じますが、正規ページ経由での実行目的は許可します。",
    note7: "Wayback Machine などのウェブアーカイブに保存する行為は、不特定多数がアクセス可能となるため、著作権法上の私的複製の範囲を超えるためご遠慮ください。",
    contactLabel: "連絡先:",
    versionPrefix: "DQVC カスタム リスト ジェネレーター by DaisukeDaisuke",
},
    en: {
    title: "DQVC Item List Generator",
    items: "Items",
    selected: "Selected",
    noItem: "No items selected yet.",
    dropTitle: "Drop .bin file here",
    dropHint: "Drop a .bin file here to load",
    loadBtn: "Load",
    downloadBtn: "Download",
    themeLabel: "Theme",
    langLabel: "Language",
    searchPlaceholder: "Search",
    themeDark: "Dark",
    themeLight: "Light",
    themeBlue: "Blue",
    themeGold: "Gold",
    themePink: "Pink",
    themeOrange: "Dark+",
    themeDeepDark: "Deep Dark",
    themeDarkColorblind: "Dark Colorblind (Orange)",
    themeDarkTritanopia: "Dark Tritanopia (Red)",
    themeLightGray: "Light+ (Gray)",
    themelightGrayPlus: "Light++ (Gray)",
    themeLightCool: "Light+ (Cool Blue)",
    themeLightSepia: "Sepia (Paper-like)",
    themeLightGreen: "Light+ (Green)",
    themeLightHighContrast: "Light (High Contrast)",
    priceLabel: "Price",
    minLabel: "Min",
    maxLabel: "Max",
    bulkTitle: "Bulk set",
    bulkApply: "Apply to all",
    presetTitle: "Apply fixed list",
    presetLabel: "List",
    presetApply: "Apply",
    presetPlaceholder: "Select a list",
    filterSelected: "Filter selected by search",
    deleteMatched: "Delete items matching the search",
    deleteUnmatched: "Delete items not matching the search",
    deleteAll: "Delete all",
    confirmDelete: "The following items will be removed. Continue?",
    noResults: "No matching items.",
    infoTitle: "About this tool",
    infoIntro1: "This website generates dlc data for DQVC shop that you can use as-is on a custom WFC server.",
    infoIntro2: "DQVC is considered valid even with a single item. When there are 6 or more, the number and lineup are decided randomly.",
    infoCollapsible: "You can collapse this message.",
    usageTitle: "Usage",
    step1: "Select items you want to send",
    step2: "Click Download",
    step3: "Unzip the downloaded zip and place the files in the designated folder of your custom WFC server.",
    pathJpn: "jpn: /dlc/YDQJ",
    pathUsa: "usa: /dlc/YDQE",
    pathOther: "other: /dlc/YDQP",
    step4a: "Start the WFC server. Depending on the server used, you may need to specify a local IP address or perform additional setup.",
    step4b: "Connect your PC to the same network as the DS. (If on an open network, close other apps.)",
    step4c: "Check your PC's IP address.",
    step4d: "On DQIX Wi-Fi settings, connect, open Advanced, set DNS auto to Off, and set Primary DNS to your PC's IP address.",
    step4e: "Connect from DQIX.",
    step5: "Enjoy!",
    notesTitle: "Notes",
    note1: "This generator is intended for personal/private use and enjoyment.",
    note2: "Commercial use requires permission.",
    note3: "Do not sell, resell, or trade ROMs that contain arbitrary DQVC shop data.",
    note4: "If commercial use is confirmed, publication of the tool may be suspended.",
    note5: "This work contains content from multiple copyright holders (with permission).",
    note6: "Downloading or saving this tool's source code is prohibited, except for execution via the official page.",
    note7: 'Please refrain from saving this site to web archives like Wayback Machine, as it exceeds the scope of private copying under copyright law.',
    contactLabel: "Contact:",
    versionPrefix: "DQVC Custom List Generator by DaisukeDaisuke",
},
    es: {
    title: "Generador de lista de artículos DQVC",
    items: "Artículos",
    selected: "Seleccionados",
    noItem: "Aún no se han seleccionado artículos.",
    dropTitle: "Suelta el archivo .bin aquí",
    dropHint: "Suelta un archivo .bin aquí para cargarlo",
    loadBtn: "Cargar",
    downloadBtn: "Descargar",
    themeLabel: "Tema",
    langLabel: "Idioma",
    searchPlaceholder: "Buscar",
    themeDark: "Oscuro",
    themeLight: "Claro",
    themeBlue: "Azul",
    themeGold: "Oro",
    themePink: "Rosa",
    themeOrange: "Oscuro+",
    themeDeepDark: "Oscuro profundo",
    themeDarkColorblind: "Oscuro para daltónicos (Naranja)",
    themeDarkTritanopia: "Oscuro Tritanopía (Rojo)",
    themeLightGray: "Claro+ (Gris)",
    themelightGrayPlus: "Claro++ (Gris)",
    themeLightCool: "Claro+ (Azul frío)",
    themeLightSepia: "Sepia (tipo papel)",
    themeLightGreen: "Claro+ (Verde)",
    themeLightHighContrast: "Claro (Alto contraste)",
    priceLabel: "Precio",
    minLabel: "Mín",
    maxLabel: "Máx",
    bulkTitle: "Asignación en lote",
    bulkApply: "Aplicar a todos",
    presetTitle: "Aplicar lista fija",
    presetLabel: "Lista",
    presetApply: "Aplicar",
    presetPlaceholder: "Selecciona una lista",
    filterSelected: "Filtrar seleccionados por búsqueda",
    deleteMatched: "Eliminar los que coinciden con la búsqueda",
    deleteUnmatched: "Eliminar los que no coinciden con la búsqueda",
    deleteAll: "Eliminar todo",
    confirmDelete: "Se eliminarán los siguientes elementos. ¿Desea continuar?",
    noResults: "No hay elementos coincidentes.",
    infoTitle: "Acerca de esta herramienta",
    infoIntro1: "Este sitio genera datos dlc para la tienda DQVC que puedes usar tal cual en un servidor WFC personalizado.",
    infoIntro2: "DQVC se considera válido incluso con un solo artículo. Con 6 o más, la cantidad y el surtido se deciden aleatoriamente.",
    infoCollapsible: "Este mensaje se puede contraer.",
    usageTitle: "Uso",
    step1: "Selecciona los artículos que quieres enviar",
    step2: "Haz clic en Descargar",
    step3: "Descomprime el zip y coloca los archivos en la carpeta designada del servidor WFC personalizado.",
    pathJpn: "jpn: /dlc/YDQJ",
    pathUsa: "usa: /dlc/YDQE",
    pathOther: "otros: /dlc/YDQP",
    step4a: " Inicie el servidor WFC. Según el servidor utilizado, puede ser necesario especificar una dirección IP local u otra configuración.",
    step4b: "Conecta tu PC a la misma red que la DS. (Si es una red abierta, cierra otras apps.)",
    step4c: "Comprueba la dirección IP de tu PC.",
    step4d: "En la configuración Wi‑Fi de DQIX, conéctate, abre Avanzado, desactiva la obtención automática de DNS y pon el DNS primario a la IP de tu PC.",
    step4e: "Conéctate desde DQIX.",
    step5: "¡Disfruta!",
    notesTitle: "Notas",
    note1: "Este generador está destinado al uso personal/privado y para entretenimiento.",
    note2: "El uso comercial requiere permiso.",
    note3: "No vendas, revendas ni comercialices ROMs que contengan datos de tienda DQVC arbitrarios.",
    note4: "Si se confirma un uso comercial, la publicación de la herramienta puede ser suspendida.",
    note5: "Esta obra contiene contenido de varios titulares de derechos (con permiso).",
    note6: "Está prohibido descargar o guardar el código fuente de esta herramienta, salvo para ejecución desde la página oficial.",
    note7: "Por favor, evite guardar este sitio en archivos web como Wayback Machine, ya que excede el ámbito de la copia privada según la ley de derechos de autor.",
    contactLabel: "Contacto:",
    versionPrefix: "Generador de lista personalizada DQVC por DaisukeDaisuke",
},
    fr: {
    title: "Générateur de liste d'objets DQVC",
    items: "Objets",
    selected: "Sélectionnés",
    noItem: "Aucun objet sélectionné pour le moment.",
    dropTitle: "Déposez le fichier .bin ici",
    dropHint: "Déposez un fichier .bin ici pour le charger",
    loadBtn: "Charger",
    downloadBtn: "Télécharger",
    themeLabel: "Thème",
    langLabel: "Langue",
    searchPlaceholder: "Recherche",
    themeDark: "Sombre",
    themeLight: "Clair",
    themeBlue: "Bleu",
    themeGold: "Or",
    themePink: "Rose",
    themeOrange: "Sombre+",
    themeDeepDark: "Sombre profond",
    themeDarkColorblind: "Sombre daltonien (Orange)",
    themeDarkTritanopia: "Sombre tritanopie (Rouge)",
    themeLightGray: "Clair+ (Gris)",
    themelightGrayPlus: "Clair++ (Gris)",
    themeLightCool: "Clair+ (Bleu froid)",
    themeLightSepia: "Sépia (aspect papier)",
    themeLightGreen: "Clair+ (Vert)",
    themeLightHighContrast: "Clair (Contraste élevé)",
    priceLabel: "Prix",
    minLabel: "Min",
    maxLabel: "Max",
    bulkTitle: "Affectation en lot",
    bulkApply: "Appliquer à tous",
    presetTitle: "Appliquer une liste fixe",
    presetLabel: "Liste",
    presetApply: "Appliquer",
    presetPlaceholder: "Sélectionner une liste",
    filterSelected: "Filtrer les sélectionnés par la recherche",
    deleteMatched: "Supprimer les éléments correspondant à la recherche",
    deleteUnmatched: "Supprimer les éléments ne correspondant pas à la recherche",
    deleteAll: "Tout supprimer",
    confirmDelete: "Les éléments suivants seront supprimés. Continuer ?",
    noResults: "Aucun objet correspondant.",
    infoTitle: "À propos de cet outil",
    infoIntro1: "Ce site génère des données dlc pour la boutique DQVC, utilisables telles quelles sur un serveur WFC personnalisé.",
    infoIntro2: "DQVC est valable même avec un seul objet. À partir de 6, le nombre et l'assortiment sont déterminés aléatoirement.",
    infoCollapsible: "Ce message peut être replié.",
    usageTitle: "Mode d'emploi",
    step1: "Sélectionnez les objets à envoyer",
    step2: "Cliquez sur Télécharger",
    step3: "Décompressez le zip et placez les fichiers dans le dossier prévu de votre serveur WFC personnalisé.",
    pathJpn: "jpn: /dlc/YDQJ",
    pathUsa: "usa: /dlc/YDQE",
    pathOther: "autre: /dlc/YDQP",
    step4a: "Démarrez le serveur WFC. Selon le serveur utilisé, il peut être nécessaire de spécifier une adresse IP locale ou d’effectuer d’autres réglages.",
    step4b: "Connectez votre PC au même réseau que la DS. (Sur un réseau ouvert, fermez les autres applications.)",
    step4c: "Vérifiez l'adresse IP de votre PC.",
    step4d: "Dans les paramètres Wi‑Fi de DQIX, connectez-vous, ouvrez Avancé, désactivez l'obtention automatique du DNS et définissez le DNS primaire sur l'IP de votre PC.",
    step4e: "Connectez-vous depuis DQIX.",
    step5: "Amusez-vous !",
    notesTitle: "Remarques",
    note1: "Ce générateur est destiné à un usage personnel/privé et au divertissement.",
    note2: "L'utilisation commerciale nécessite une autorisation.",
    note3: "N'en vendez ni ne revendez des ROMs contenant des données de boutique DQVC arbitraires.",
    note4: "Si une utilisation commerciale est constatée, la publication de l'outil peut être suspendue.",
    note5: "Cette œuvre contient du contenu de plusieurs détenteurs de droits (avec autorisation).",
    note6: "Le téléchargement ou la sauvegarde du code source de cet outil est interdit, sauf pour exécution depuis la page officielle.",
    note7: "Veuillez ne pas sauvegarder ce site sur des archives web comme Wayback Machine, car cela dépasse le cadre de la copie privée selon la loi sur le droit d’auteur.",
    contactLabel: "Contact :",
    versionPrefix: "Générateur de liste personnalisée DQVC par DaisukeDaisuke",
},
    de: {
    title: "DQVC-Artikel-Listengenerator",
    items: "Artikel",
    selected: "Ausgewählt",
    noItem: "Noch keine Artikel ausgewählt.",
    dropTitle: "Ziehe die .bin-Datei hierher",
    dropHint: "Ziehe eine .bin-Datei hierher, um sie zu laden",
    loadBtn: "Laden",
    downloadBtn: "Herunterladen",
    themeLabel: "Thema",
    langLabel: "Sprache",
    searchPlaceholder: "Suchen",
    themeDark: "Dunkel",
    themeLight: "Hell",
    themeBlue: "Blau",
    themeGold: "Gold",
    themePink: "Rosa",
    priceLabel: "Preis",
    themeOrange: "Dunkel+",
    themeDeepDark: "Tiefdunkel",
    themeDarkColorblind: "Dunkel Farbenblind (Orange)",
    themeDarkTritanopia: "Dunkel Tritanopie (Rot)",
    themeLightGray: "Hell+ (Grau)",
    themelightGrayPlus: "Hell++ (Grau)",
    themeLightCool: "Hell+ (Kühles Blau)",
    themeLightSepia: "Sepia (papierähnlich)",
    themeLightGreen: "Hell+ (Grün)",
    themeLightHighContrast: "Hell (Hoher Kontrast)",
    minLabel: "Min",
    maxLabel: "Max",
    bulkTitle: "Sammelzuweisung",
    bulkApply: "Auf alle anwenden",
    presetTitle: "Feste Liste anwenden",
    presetLabel: "Liste",
    presetApply: "Anwenden",
    presetPlaceholder: "Liste auswählen",
    filterSelected: "Ausgewählte mit Suche filtern",
    deleteMatched: "Elemente löschen, die der Suche entsprechen",
    deleteUnmatched: "Elemente löschen, die der Suche nicht entsprechen",
    deleteAll: "Alle löschen",
    confirmDelete: "Die folgenden Elemente werden gelöscht. Fortfahren?",
    noResults: "Keine passenden Elemente.",
    infoTitle: "Über dieses Tool",
    infoIntro1: "Diese Website erzeugt DLC-Daten für den DQVC-Shop, die direkt auf einem eigenen WFC-Server verwendet werden können.",
    infoIntro2: "DQVC gilt bereits mit einem einzelnen Artikel als gültig. Bei 6 oder mehr werden Anzahl und Sortiment zufällig bestimmt.",
    infoCollapsible: "Diese Nachricht kann eingeklappt werden.",
    usageTitle: "Verwendung",
    step1: "Wähle die zu sendenden Artikel aus",
    step2: "Klicke auf Herunterladen",
    step3: "Entpacke die ZIP-Datei und lege die Dateien in den vorgesehenen Ordner deines benutzerdefinierten WFC-Servers.",
    pathJpn: "jpn: /dlc/YDQJ",
    pathUsa: "usa: /dlc/YDQE",
    pathOther: "sonstige: /dlc/YDQP",
    step4a: "Starten Sie den WFC-Server. Je nach verwendetem Server kann es erforderlich sein, eine lokale IP-Adresse anzugeben oder zusätzliche Einstellungen vorzunehmen.",
    step4b: "Verbinde deinen PC mit demselben Netzwerk wie der DS. (Bei offenem Netzwerk andere Apps schließen.)",
    step4c: "Prüfe die IP-Adresse deines PCs.",
    step4d: "In den DQIX-Wi‑Fi‑Einstellungen: verbinden, Erweitert öffnen, DNS-Auto auf Aus, primären DNS auf die PC‑IP setzen.",
    step4e: "Vom DQIX aus verbinden.",
    step5: "Viel Spaß!",
    notesTitle: "Hinweise",
    note1: "Dieser Generator ist für den privaten/individuellen Gebrauch und zur Unterhaltung gedacht.",
    note2: "Kommerzielle Nutzung erfordert eine Genehmigung.",
    note3: "Verkaufen/Weiterverkaufen von ROMs mit beliebigen DQVC-Shopdaten ist untersagt.",
    note4: "Bei festgestellter kommerzieller Nutzung kann die Veröffentlichung des Tools ausgesetzt werden.",
    note5: "Dieses Werk enthält Inhalte mehrerer Urheber (mit Erlaubnis).",
    note6: "Das Herunterladen oder Speichern des Quellcodes dieses Tools ist verboten, außer für die Ausführung über die offizielle Seite.",
    note7: "Bitte speichern Sie diese Website nicht in Webarchiven wie Wayback Machine, da dies den Rahmen der privaten Vervielfältigung nach dem Urheberrecht überschreitet.",
    contactLabel: "Kontakt:",
    versionPrefix: "DQVC Custom List Generator by DaisukeDaisuke",
},
    it: {
    title: "Generatore elenco oggetti DQVC",
    items: "Oggetti",
    selected: "Selezionati",
    noItem: "Nessun oggetto selezionato.",
    dropTitle: "Trascina qui il file .bin",
    dropHint: "Trascina un file .bin qui per caricarlo",
    loadBtn: "Carica",
    downloadBtn: "Scarica",
    themeLabel: "Tema",
    langLabel: "Lingua",
    searchPlaceholder: "Cerca",
    themeDark: "Scuro",
    themeLight: "Chiaro",
    themeBlue: "Blu",
    themeGold: "Oro",
    themePink: "Rosa",
    themeOrange: "Scuro+",
    themeDeepDark: "Scuro Profondo",
    themeDarkColorblind: "Scuro Daltonismo (Arancione)",
    themeDarkTritanopia: "Scuro Tritanopia (Rosso)",
    themeLightGray: "Chiaro+ (Grigio)",
    themelightGrayPlus: "Chiaro++ (Grigio)",
    themeLightCool: "Chiaro+ (Blu freddo)",
    themeLightSepia: "Seppia (simile carta)",
    themeLightGreen: "Chiaro+ (Verde)",
    themeLightHighContrast: "Chiaro (Alto contrasto)",
    priceLabel: "Prezzo",
    minLabel: "Min",
    maxLabel: "Max",
    bulkTitle: "Impostazione massiva",
    bulkApply: "Applica a tutti",
    presetTitle: "Applica elenco fisso",
    presetLabel: "Elenco",
    presetApply: "Applica",
    presetPlaceholder: "Seleziona un elenco",
    filterSelected: "Filtra selezionati con ricerca",
    deleteMatched: "Elimina gli elementi corrispondenti alla ricerca",
    deleteUnmatched: "Elimina gli elementi non corrispondenti alla ricerca",
    deleteAll: "Elimina tutti",
    confirmDelete: "I seguenti elementi verranno rimossi. Continuare?",
    noResults: "Nessun elemento corrispondente.",
    infoTitle: "Informazioni su questo strumento",
    infoIntro1: "Questo sito genera dati dlc per il negozio DQVC, utilizzabili così com'è su un server WFC personalizzato.",
    infoIntro2: "DQVC è considerato valido anche con un solo oggetto. Con 6 o più, il numero e l'assortimento sono determinati casualmente.",
    infoCollapsible: "Questo messaggio può essere compresso.",
    usageTitle: "Uso",
    step1: "Seleziona gli oggetti che vuoi inviare",
    step2: "Fai clic su Scarica",
    step3: "Estrai lo zip e posiziona i file nella cartella designata del tuo server WFC personalizzato.",
    pathJpn: "jpn: /dlc/YDQJ",
    pathUsa: "usa: /dlc/YDQE",
    pathOther: "altro: /dlc/YDQP",
    step4a: "Avvia il server WFC. A seconda del server utilizzato, potrebbe essere necessario specificare un indirizzo IP locale o eseguire altre configurazioni.",
    step4b: "Collega il PC alla stessa rete del DS. (Se la rete è aperta, chiudi le altre app.)",
    step4c: "Controlla l'indirizzo IP del tuo PC.",
    step4d: "Nelle impostazioni Wi‑Fi di DQIX: connettiti, apri Avanzate, disattiva il DNS automatico e imposta il DNS primario all'IP del PC.",
    step4e: "Connettiti da DQIX.",
    step5: "Divertiti!",
    notesTitle: "Note",
    note1: "Questo generatore è pensato per uso personale/privato e per il divertimento.",
    note2: "L'uso commerciale richiede autorizzazione.",
    note3: "Non vendere o rivendere ROM che contengono dati di negozio DQVC arbitrari.",
    note4: "Se viene confermato un uso commerciale, la pubblicazione dello strumento può essere sospesa.",
    note5: "Quest'opera contiene contenuti di più detentori di copyright (con permesso).",
    note6: "È vietato scaricare o salvare il codice sorgente di questo strumento, salvo per esecuzione tramite la pagina ufficiale.",
    note7: "Si prega di non salvare questo sito in archivi web come Wayback Machine, poiché supera i limiti della copia privata secondo la legge sul diritto d’autore.",
    contactLabel: "Contatto:",
    versionPrefix: "Generatore elenco personalizzato DQVC di DaisukeDaisuke",
}
};

    // 指定言語を適用する関数
    function applyLang(lang) {
    // Alt（自動判別）の場合、ブラウザ言語を利用
    let t;
    if (lang === "alt") {
    t = translations["ja"] || translations.en;
} else {
    t = translations[lang] || translations.ja;
}

    // ヘルパー：要素が存在する場合のみ書き換え
    const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.innerText = text;
};

    // 単純テキスト置換
    setText("h1", t.title);
    setText("#itemsPanel h2", t.items);
    setText("#selectedPanel h2", t.selected);
    setText("#selEmpty", t.noItem);
    setText("#drop .inner div:first-child", t.dropTitle);
    setText("#drop .inner .muted, #drop .muted", t.dropHint); // 内部の muted 要素を更新
    setText("label[for='lang']", t.langLabel);
    setText("label[for='theme']", t.themeLabel);
    setText("#loadBtn", t.loadBtn);
    setText("#downloadBtn", t.downloadBtn);

    // 新規UI（フィルタ・一括指定）の文言
    setText("#filterSelLabel", t.filterSelected);
    setText("#bulkTitle", t.bulkTitle);
    setText("#bulkPriceLabel", t.priceLabel);
    setText("#bulkMinLabel", t.minLabel);
    setText("#bulkMaxLabel", t.maxLabel);
    setText("#bulkApply", t.bulkApply);
    // 一括削除ボタンの文言
    setText("#delMatched", t.deleteMatched);
    setText("#delUnmatched", t.deleteUnmatched);
    setText("#delAll", t.deleteAll);

    // Preset fixed-list UI texts
    setText("#presetTitle", t.presetTitle);
    setText("#presetSelectLabel", t.presetLabel);
    setText("#presetApply", t.presetApply);
    const phOpt = document.querySelector("#presetSelect option[value='']");
    if (phOpt) phOpt.innerText = t.presetPlaceholder || phOpt.innerText;

    // プレースホルダ更新
    const q = document.getElementById("q");
    if (q) q.placeholder = t.searchPlaceholder;

    // テーマ select の option を更新（value 属性を基準に）
        const themeMap = {
            dark: 'themeDark',
            light: 'themeLight',
            lightGray: 'themeLightGray',
            lightGrayPlus: 'themelightGrayPlus',
            lightCool: 'themeLightCool',
            lightSepia: 'themeLightSepia',
            lightGreen: 'themeLightGreen',
            lightHighContrast: 'themeLightHighContrast',
            blue: 'themeBlue',
            gold: 'themeGold',
            pink: 'themePink',
            orange: 'themeOrange',
            deepDark: 'themeDeepDark',
            darkColorblind: 'themeDarkColorblind',
            darkTritanopia: 'themeDarkTritanopia'
        };

        for (const [value, key] of Object.entries(themeMap)) {
            const opt = document.querySelector(`#theme option[value='${value}']`);
            if (opt && t && t[key]) opt.innerText = t[key];
        }


    // Info box content
    setText("#infoTitle", t.infoTitle);
    const infoContentEl = document.getElementById("infoContent");
    if (infoContentEl) {
    infoContentEl.innerHTML = `
        <div class="muted" style="margin-bottom:6px">${t.infoIntro1}</div>
        <div class="muted" style="margin-bottom:6px">${t.infoIntro2}</div>
        <div class="muted" style="margin-bottom:6px">${t.infoCollapsible}</div>
        <div style="font-weight:700; margin:8px 0 4px;">${t.usageTitle}</div>
        <ul style="margin:0 0 8px 18px; padding:0; line-height:1.6">
          <li>${t.step1}</li>
          <li>${t.step2}</li>
          <li>${t.step3}</li>
          <li>${t.pathJpn}</li>
          <li>${t.pathUsa}</li>
          <li>${t.pathOther}</li>
          <li>${t.step4a}</li>
          <li>${t.step4b}</li>
          <li>${t.step4c}</li>
          <li>${t.step4d}</li>
          <li>${t.step4e}</li>
          <li>${t.step5}</li>
        </ul>
        <div style="font-weight:700; margin:8px 0 4px;">${t.notesTitle}</div>
        <ul style="margin:0 0 8px 18px; padding:0; line-height:1.6">
          <li>${t.note1}</li>
          <li>${t.note2}</li>
          <li>${t.note3}</li>
          <li>${t.note4}</li>
          <li>${t.note5}</li>
          <li>${t.note6}</li>
          <li>${t.note7}</li>
          <li>${t.contactLabel} <a href="https://x.com/Daisuke76897125" target="_blank" rel="noopener">https://x.com/Daisuke76897125</a></li>
        </ul>
        <div style="font-weight:700; margin:8px 0 4px;">copyright</div>
        <ul style="margin:0 0 8px 18px; padding:0; line-height:1.6">
          <li>このページで利用している株式会社スクウェア・エニックスを代表とする共同著作者が権利を所有する画像の転載・配布は禁止いたします。</li>
          <li>© 2009 ARMOR PROJECT/BIRD STUDIO/LEVEL-5/SQUARE ENIX All Rights Reserved.</li>
        </ul>
        <div class="muted" style="margin-top:8px">${t.versionPrefix}, v${version}</div>
      `;
}
}

// 初期化：DOMContentLoaded で適用、言語セレクト変更時に再適用
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("lang");
    if (!select) {
        // 言語セレクトが無ければデフォルト日本語で適用
        applyLang("ja");
        return;
    }

    // 初期適用（select の現在値を使用）
    applyLang(select.value);

    // ユーザーが言語を切り替えたとき
    select.addEventListener("change", (e) => {
        applyLang(e.target.value);
    });
});


const el = id => document.getElementById(id);

function debounce(fn, ms){ let t; return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), ms); } }

// CSV parser (minimal, handles quoted fields)
function parseCSV(text){
    const rows = [];
    let i = 0, field = '', row = [], inQuotes = false;
    const pushField = () => { row.push(field); field = ''; };
    const pushRow = () => { if(row.length>1 || (row.length===1 && row[0]!=='')) rows.push(row); row = []; };
    while(i < text.length){
        const c = text[i++];
        if(inQuotes){
            if(c === '"'){
                if(text[i] === '"'){ field += '"'; i++; } else { inQuotes = false; }
            } else { field += c; }
        } else {
            if(c === '"'){ inQuotes = true; }
            else if(c === ','){ pushField(); }
            else if(c === '\n'){ pushField(); pushRow(); }
            else if(c === '\r'){ /* ignore */ }
            else { field += c; }
        }
    }
    if(field.length>0 || row.length>0){ pushField(); pushRow(); }
    return rows;
}

// ===================== Binary Writer/Reader =====================
class BinWriter {
    constructor(){ this.a = []; }
    putByte(v){ this.a.push(v & 0xFF); }
    putLShort(v){ this.a.push(v & 0xFF, (v>>>8) & 0xFF); }
    putLInt(v){ this.a.push(v & 0xFF, (v>>>8)&0xFF, (v>>>16)&0xFF, (v>>>24)&0xFF); }
    putBytes(bytes){ for(const b of bytes) this.a.push(b); }
    putAscii(str){ for(const b of new TextEncoder().encode(str)) this.a.push(b); }
    toUint8(){ return Uint8Array.from(this.a); }
}
class BinReader {
    constructor(bytes){ this.b = bytes; this.o = 0; }
    get eof(){ return this.o >= this.b.length; }
    getByte(){ return this.b[this.o++]; }
    getLShort(){ const v = this.b[this.o] | (this.b[this.o+1]<<8); this.o+=2; return v>>>0; }
    getLInt(){ const v = (this.b[this.o] | (this.b[this.o+1]<<8) | (this.b[this.o+2]<<16) | (this.b[this.o+3]<<24))>>>0; this.o+=4; return v; }
    skip(n){ this.o += n; }
    slice(n){ const out = this.b.slice(this.o, this.o+n); this.o += n; return out; }
    remaining(){ return this.b.length - this.o; }
}

// ===================== RC4 =====================
function ksaMasterKey(keyStr){
    const key = new TextEncoder().encode(keyStr); // bytes (UTF-8)
    const S = new Uint8Array(256);
    for(let i=0;i<256;i++) S[i]=i;
    let j=0;
    for(let i=0;i<256;i++){
        j = (j + S[i] + key[i % key.length]) & 0xFF;
        const t = S[i]; S[i] = S[j]; S[j] = t;
    }
    return S;
}
function prgaKeystreamFromMaster(Sin, length){
    const S = new Uint8Array(Sin); // copy
    let i=0, j=0; const out = new Uint8Array(length);
    for(let k=0;k<length;k++){
        i = (i + 1) & 0xFF;
        j = (j + S[i]) & 0xFF;
        const t=S[i]; S[i]=S[j]; S[j]=t;
        const K = S[(S[i] + S[j]) & 0xFF];
        out[k] = K;
    }
    return out;
}
function rc4(dataBytes, keyStr){
    const S = ksaMasterKey(keyStr);
    const ks = prgaKeystreamFromMaster(S, dataBytes.length);
    const out = new Uint8Array(dataBytes.length);
    for(let i=0;i<dataBytes.length;i++) out[i] = dataBytes[i] ^ ks[i];
    return out;
}

// ===================== Checksum =====================
function lay_d_23_CheckChecksum(bytes){
    let buf = 0n; let overflow = 0n;
    for(let i=0;i<bytes.length;i++){
        const byte = BigInt(bytes[i]);
        overflow = ((overflow << 8n) | (buf >> 24n)) & 0xFFFFFFFFn;
        buf = ((buf << 8n) + byte) & 0xFFFFFFFFn;
        if(overflow !== 0n){
            const combined = (overflow << 32n) | buf;
            buf = combined % MOD;
            overflow = 0n;
        }
    }
    return Number(buf);
}
function calc_fix_bytes_for_zero_hash(buf32){
    const t = (BigInt(buf32) * POW32MOD) % MOD;
    const x = (MOD - t) % MOD;
    return Uint8Array.from([
        Number((x >> 24n) & 0xFFn),
        Number((x >> 16n) & 0xFFn),
        Number((x >> 8n) & 0xFFn),
        Number(x & 0xFFn)
    ]);
}

// ===================== Packet build/parse =====================
function makeItemPackets(ids, metaMap){
    const w = new BinWriter();
    let count = 0;

    // ボディヘッダー(必須)
    w.putLShort(0x65); // command
    w.putByte(1);      // one arg
    w.putByte(0);      // mode 0
    w.putLInt(0);      // 0
    count++;

    w.putLShort(0x64); // command
    w.putByte(1);      // one arg
    w.putByte(0);      // mode 0
    w.putLInt(0);      // 0
    count++;

    // 期限(固定: 2099/12/31)
    w.putLShort(0x67); // command
    w.putByte(3);      // 3 args
    w.putByte(0x15);   // mode 0x15
    w.putLInt(2099 >>> 0);
    w.putLInt(12 >>> 0);
    w.putLInt(31 >>> 0);
    count++;

    for(const id of ids){
        const meta = metaMap && metaMap.get(id) || { price: 10, min: 1, max: 100 };
        const price = (meta.price>>>0); const min = (meta.min>>>0); const max = (meta.max>>>0);
        w.putLShort(0x68); // command
        w.putByte(4);      // 4 args
        w.putByte(0x55);   // mode 0x55
        w.putLInt(id >>> 0);      // id
        w.putLInt(price);         // 販売価格
        w.putLInt(min);           // 最小個数
        w.putLInt(max);           // 最大個数
        count++;
    }
    return { body: w.toUint8(), count };
}

function buildFile(ids){
    const { body, count } = makeItemPackets(ids, state.meta);

    const hdr = new BinWriter();
    hdr.putLInt(count);
    hdr.putLInt(body.length);
    hdr.putLInt(0x1b);
    hdr.putLInt(0x2);
    hdr.putBytes(body);
    // Tail string: "2011/03/23 17:09:05\x001102323\x00"
    hdr.putAscii('2011/03/23'); hdr.putByte(0x20); hdr.putAscii('17:09:05'); hdr.putByte(0x00);
    hdr.putAscii('1102323'); hdr.putByte(0x00);hdr.putByte(0xFF);

    let bytes = hdr.toUint8();

    const pad = (16 - (bytes.length % 16)) % 16;
    if(pad>0){ const ff = new Uint8Array(pad); ff.fill(0xFF); bytes = concat(bytes, ff); }


    const now = new Date();
    const timeString = now.toISOString(); // 例: "2025-10-24T09:32:10.123Z"

    let url = "\r\nGenerate by DQVC DLC Custom List Generator v" + version + ", ^_^\r\nanchor: DaisukeDaisuke, <('.'<) \r\nurl: https://dqix.github.io/auction/, (>^_^)> \r\ncontact: https://x.com/Daisuke76897125, \r\ndate: " + timeString + ", \r\nThank you for using!\r\n";
    let urlBytes = new TextEncoder().encode(url);
    bytes = concat(bytes, urlBytes);

    const pad1 = (16 - (bytes.length % 16)) % 16;
    if(pad>0){ const ff = new Uint8Array(pad1); ff.fill(0x00); bytes = concat(bytes, ff); }

    bytes = concat(bytes, MARKER);

    // encrypt
    const enc = rc4(bytes, KEY);
    let final = enc.slice(0, enc.length - 4 - urlBytes.length - pad1);
    final = concat(final, urlBytes);
    if(pad>0){ const ff = new Uint8Array(pad1); ff.fill(0x00); final = concat(final, ff); }
    const fix = calc_fix_bytes_for_zero_hash(lay_d_23_CheckChecksum(final));
    final = concat(final, fix);

    // sanity: verify zero
    const chk = lay_d_23_CheckChecksum(final);
    if(chk !== 0){ console.warn('Checksum not zero:', chk); }

    return final; // Uint8Array
}
function parseFile(bin){
    // verify checksum
    const sum = lay_d_23_CheckChecksum(bin);
    if(bin.length === 0 || sum !== 0){ throw new Error('チェックサムが不正です。\n This is not a dqvc file.'); }
    // decrypt; note last 4 bytes were replaced with checksum; we'll decrypt anyway and patch tail marker
    const dec = rc4(bin, KEY);
    let plain = dec.slice(0, dec.length - 4);
    plain = concat(plain, MARKER); // restore original marker

    const r = new BinReader(plain);
    const packetCount = r.getLInt();
    const bodyLen = r.getLInt();
    const v1 = r.getLInt();
    const v2 = r.getLInt();
    if(v1 !== 0x1b || v2 !== 0x2){ /* tolerate but warn */ }
    const body = r.slice(bodyLen);

    const entries = [];
    const pr = new BinReader(body);
    while(!pr.eof && pr.remaining() >= 4){
        const cmd = pr.getLShort();
        if(pr.remaining() < 2) break;
        const c = pr.getByte();
        const mode = pr.getByte();
        if(pr.remaining() < c*4) break;
        const args=[]; for(let i=0;i<c;i++) args.push(pr.getLInt());
        if(cmd === 0x68 && args.length >= 4){
            const [id, price, min, max] = args;
            entries.push({ id: id>>>0, price: price>>>0, min: min>>>0, max: max>>>0 });
        }
    }
    return entries;
}

function concat(a, b){ const out = new Uint8Array(a.length + b.length); out.set(a,0); out.set(b,a.length); return out; }

// ===================== Data and UI =====================
const state = {
    items: [], // {id, type, en, ja, icon}
    groups: new Map(), // type -> items[]
    lang: 'ja',
    q: '',
    selected: new Set(), // of id
    meta: new Map(), // id -> {price, min, max}
    filterSelected: false, // whether to filter Selected list by master search
};

function iconIndexFromId(id){
    // Reverse lookup using prepared map (filled during CSV load)
    return ICON_BY_CODE.has(id) ? ICON_BY_CODE.get(id) : 0;
}
function iconStyleFromIndex(idx){
    if(idx == null || idx < 0) idx = 0; // fallback
    const x = 1 + 25 * (idx % 11);
    const y = 1 + 25 * Math.floor(idx / 11);
    return `background-position: -${x}px -${y}px;`;
}

async function loadCSV(){
    const res = await fetch('dq9items.csv');
    const text = await res.text();
    const rows = parseCSV(text);
    // header indexes
    const header = rows[0];
    const idxCode = header.indexOf('Code');
    const idxType = header.indexOf('Type');
    const itemDX = header.indexOf('Item #');
    const idxEn = header.indexOf('English');
    const idxJa = header.indexOf('Japanese');
    const idxAlt = header.indexOf('Alt');
    const idxEs = header.indexOf('Spanish');
    const idxFr = header.indexOf('French');
    const idxDe = header.indexOf('German');
    const idxIt = header.indexOf('Italian');
    const itemsArr = [];
    for(let i=1;i<rows.length;i++){
        const r = rows[i];
        if(!r || r.length === 0) continue;
        const code = r[idxCode];
        const type = r[idxType];
        const item = r[itemDX];
        const en = r[idxEn];
        const ja = r[idxJa];
        const alt = idxAlt>=0 ? r[idxAlt] : '';
        const es = idxEs>=0 ? r[idxEs] : '';
        const fr = idxFr>=0 ? r[idxFr] : '';
        const de = idxDe>=0 ? r[idxDe] : '';
        const it = idxIt>=0 ? r[idxIt] : '';
        if(!code || !type) continue;
        const id = parseInt(code, 16);
        const itemid = parseInt(item, 10);
        // icon index: prefer data.js mapping by id, fallback to CSV Item #
        const dataItem = (typeof items !== 'undefined') ? items[id] : undefined;
        const icon = (dataItem && typeof dataItem.icon === 'number') ? dataItem.icon : (Number.isFinite(itemid) ? itemid : 0);
        ICON_BY_CODE.set(id, icon);
        itemsArr.push({ id, type, en, ja, alt, es, fr, de, it, icon });
    }
    state.items = itemsArr;
    // group by type
    const map = new Map();
    for(const it of itemsArr){
        if(!map.has(it.type)) map.set(it.type, []);
        map.get(it.type).push(it);
    }
    // sort each group by id
    for(const g of map.values()) g.sort((a,b)=>a.id-b.id);
    state.groups = map;
}

function getItemName(it, lang){
    if(!it) return '';
    switch(lang){
        case 'ja': return it.ja || it.en || it.alt || it.es || it.fr || it.de || it.it || '';
        case 'en': return it.en || it.ja || it.alt || it.es || it.fr || it.de || it.it || '';
        case 'es': return it.es || it.en || it.ja || it.fr || it.de || it.it || it.alt || '';
        case 'fr': return it.fr || it.en || it.ja || it.es || it.de || it.it || it.alt || '';
        case 'de': return it.de || it.en || it.ja || it.es || it.fr || it.it || it.alt || '';
        case 'it': return it.it || it.en || it.ja || it.es || it.fr || it.de || it.alt || '';
        case 'alt': return it.alt || it.ja || it.en || it.es || it.fr || it.de || it.it || '';
        default: return it.en || it.ja || it.alt || it.es || it.fr || it.de || it.it || '';
    }
}

// translation helper for dynamic UI
function t(key){
    const fallback = {
        priceLabel: '価格',
        minLabel: '最小',
        maxLabel: '最大',
        filterSelected: '検索で選択済みも絞り込む',
        confirmDelete: '下記のアイテムを削除します。よろしいですか',
        noResults: '該当するアイテムがありません。'
    };
    const hasTrans = (typeof translations !== 'undefined');
    const lang = state.lang;
    let dict = hasTrans ? translations[lang] : null;
    if(hasTrans && lang === 'alt'){
        const auto = (navigator.language || 'en').slice(0,2).toLowerCase();
        dict = translations[auto] || translations.en;
    }
    if(hasTrans && !dict) dict = translations.ja;
    if(hasTrans){
        return (dict && key in dict) ? dict[key] : (translations.ja[key] || fallback[key] || key);
    } else {
        return fallback[key] || key;
    }
}

function render(){
    renderItems();
    renderSelected();
    el('downloadBtn').disabled = state.selected.size === 0;
}

function renderItems(){
    const body = el('itemsBody');
    body.innerHTML = '';
    const q = state.q.trim().toLowerCase();
    const lang = state.lang;

    for(const [type, arr] of state.groups){
        // filter by search
        const vis = [];
        for(const it of arr){
            const name = getItemName(it, lang) || '';
            if(q && !name.toLowerCase().includes(q)) continue;
            vis.push(it);
        }
        if(vis.length === 0) continue;

        const det = document.createElement('details');
        det.className = 'type';
        det.open = true;
        const sum = document.createElement('summary');
        sum.textContent = `${type} ・ ${vis.length}`;
        det.appendChild(sum);

        const grid = document.createElement('div');
        grid.className = 'type-items';

        for(const it of vis){
            const row = document.createElement('label');
            row.className = 'item';
            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.className = 'check';
            chk.checked = state.selected.has(it.id);
            chk.addEventListener('change', ()=>{
                if(chk.checked){
                    state.selected.add(it.id);
                    if(!state.meta.has(it.id)) state.meta.set(it.id, { price: 10, min: 1, max: 1 });
                } else {
                    state.selected.delete(it.id);
                }
                renderSelected();
                el('downloadBtn').disabled = state.selected.size === 0;
            });

            const icon = document.createElement('i');
            icon.className = 'icon-sprite';
            icon.style = iconStyleFromIndex(it.icon);

            const name = document.createElement('div');
            name.className = 'name';
            name.textContent = getItemName(it, lang) || `(0x${it.id.toString(16).toUpperCase()})`;

            row.appendChild(chk);
            row.appendChild(icon);
            row.appendChild(name);
            grid.appendChild(row);
        }

        det.appendChild(grid);
        body.appendChild(det);
    }

    if(!body.childElementCount){
        const div = document.createElement('div');
        div.className = 'muted';
        div.textContent = t('noResults');
        body.appendChild(div);
    }
}

function renderSelected(){
    const holder = el('selected');
    holder.innerHTML = '';
    const lang = state.lang;
    const selEmpty = el('selEmpty');
    const ids = Array.from(state.selected).sort((a,b)=>a-b);
    // Show empty message only when nothing is selected (not based on filter)
    selEmpty.style.display = ids.length? 'none':'block';

    const onlyDigits = (s)=> s.replace(/\D+/g, '');

    const q = state.q.trim().toLowerCase();
    const doFilter = !!(state.filterSelected && q.length);

    for(const id of ids){
        const it = state.items.find(x=>x.id===id);
        const nameStr = it ? (getItemName(it, lang)||'') : `Unknown 0x${id.toString(16).toUpperCase()}`;
        if(doFilter && !nameStr.toLowerCase().includes(q)) continue; // hide by filter

        const meta = state.meta.get(id) || { price: 10, min: 1, max: 100 };
        state.meta.set(id, meta);

        const row = document.createElement('div');
        row.className = 'sel';

        const icon = document.createElement('i');
        icon.className = 'icon-sprite';
        icon.style = iconStyleFromIndex(it? it.icon : iconIndexFromId(id));

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = nameStr;

        const fields = document.createElement('div');
        fields.className = 'fields';

        const price = document.createElement('input');
        price.type = 'text'; price.inputMode = 'numeric'; price.pattern = '\\d*';
        price.className = 'num'; price.value = String(meta.price ?? 0);
        price.title = t('priceLabel') || '価格';
        price.addEventListener('input', ()=>{
            const v = onlyDigits(price.value);
            price.value = v;
            meta.price = (v === '' ? 0 : parseInt(v,10));
            state.meta.set(id, meta);
        });
        const g = document.createElement('span'); g.className='suffix'; g.textContent = 'G';

        const minLabel = document.createElement('span');
        minLabel.className = 'muted';
        minLabel.textContent = t('minLabel');

        const min = document.createElement('input');
        min.type = 'text'; min.inputMode = 'numeric'; min.pattern = '\\d*';
        min.className = 'num'; min.value = String(meta.min ?? 1);
        min.title = t('minLabel');
        min.addEventListener('input', ()=>{
            const v = onlyDigits(min.value);
            min.value = v;
            let vi = (v === '' ? 0 : parseInt(v,10));
            if(vi > (meta.max ?? 0)){
                meta.max = vi;
                max.value = String(meta.max);
            }
            meta.min = vi;
            state.meta.set(id, meta);
        });
        const pcs1 = document.createElement('span'); pcs1.className='suffix'; pcs1.textContent = '個';

        const maxLabel = document.createElement('span');
        maxLabel.className = 'muted';
        maxLabel.textContent = t('maxLabel');

        const max = document.createElement('input');
        max.type = 'text'; max.inputMode = 'numeric'; max.pattern = '\\d*';
        max.className = 'num'; max.value = String(meta.max ?? 100);
        max.title = t('maxLabel');
        max.addEventListener('input', ()=>{
            const v = onlyDigits(max.value);
            max.value = v;
            let vi = (v === '' ? 0 : parseInt(v,10));
            if(vi < (meta.min ?? 0)){
                meta.min = vi;
                min.value = String(meta.min);
            }
            meta.max = vi;
            state.meta.set(id, meta);
        });
        const pcs2 = document.createElement('span'); pcs2.className='suffix'; pcs2.textContent = '個';

        fields.appendChild(price); fields.appendChild(g);
        fields.appendChild(minLabel); fields.appendChild(min); fields.appendChild(pcs1);
        fields.appendChild(maxLabel); fields.appendChild(max); fields.appendChild(pcs2);

        const rm = document.createElement('button');
        rm.className='btn remove'; rm.textContent='×'; rm.title='削除';
        rm.onclick=()=>{ state.selected.delete(id); render(); };

        row.appendChild(icon);
        row.appendChild(name);
        row.appendChild(fields);
        row.appendChild(rm);
        holder.appendChild(row);
    }
}

// ===================== File IO =====================
let _JSZip = null; // 読み込み済みキャッシュ
async function loadJSZip() {
    if (_JSZip) return _JSZip;

    // 1) まず ESM 版を import() で試す（jsDelivr の +esm を利用）
    try {
        const mod = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm');
        _JSZip = mod.default || mod; // default エクスポート or モジュール自体
        return _JSZip;
    } catch (err) {
        // import に失敗したらフォールバックへ（古いブラウザや CSP のせいで import が失敗することがある）
        // 既にグローバルにあるならそれを使う
        if (window.JSZip) {
            _JSZip = window.JSZip;
            return _JSZip;
        }

        // 2) UMD を動的に読み込む（script 要素挿入）
        await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
            s.onload = resolve;
            s.onerror = () => reject(new Error('Failed to load JSZip UMD'));
            document.head.appendChild(s);
        });

        if (!window.JSZip) throw new Error('JSZip not available after loading UMD');
        _JSZip = window.JSZip;
        return _JSZip;
    }
}

async function onDownload(){
    const JSZip = await loadJSZip();

    const ids = Array.from(state.selected).sort((a,b)=>a-b);
    const bin = buildFile(ids);

    const size = bin.length;
    const listTxt = `output.bin\t\tauction\t\t\t${size}\r\r`;

    const zip = new JSZip();
    zip.file('output.bin', bin);
    zip.file('_list.txt', new TextEncoder().encode(listTxt));

    const blob = await zip.generateAsync({type:'blob'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'YDQJ.zip'; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 2000);
}

async function loadBinFromFile(file){
    const buf = new Uint8Array(await file.arrayBuffer());
    let entries;
    try{
        entries = parseFile(buf);
    }catch(e){
        alert('読み込み失敗: ' + (e && e.message ? e.message : e));
        return;
    }
    const ids = entries.map(e=>e.id);
    state.selected = new Set(ids);
    state.meta = new Map(entries.map(e=>[e.id, { price: e.price, min: e.min, max: e.max }]));
    render();
}

// Drag & drop overlay
function setupDnD(){
    const drop = el('drop');
    let dragDepth = 0;
    let lastShowAt = 0;
    let hideTimer = null;

    const show = () => {
        lastShowAt = Date.now();
        drop.classList.add('visible');
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    };
    const scheduleHide = () => {
        const elapsed = Date.now() - lastShowAt;
        const wait = Math.max(250 - elapsed, 0); // keep visible at least 500ms
        if (hideTimer) { clearTimeout(hideTimer); }
        hideTimer = setTimeout(() => { drop.classList.remove('visible'); hideTimer = null; }, wait);
    };

    window.addEventListener('dragenter', (e)=>{ e.preventDefault(); dragDepth++; show(); });
    window.addEventListener('dragover', (e)=>{ e.preventDefault(); show(); });
    window.addEventListener('dragleave', (e)=>{ e.preventDefault(); dragDepth = Math.max(0, dragDepth-1); if(dragDepth===0) scheduleHide(); });
    window.addEventListener('drop', (e)=>{ e.preventDefault(); dragDepth = 0; scheduleHide(); const f = e.dataTransfer.files && e.dataTransfer.files[0]; if(f && f.name.endsWith('.bin')) loadBinFromFile(f); });
}

// main内のテキストドラッグだけを無効化（選択とコピペは可）
function setupMainTextDragBlock(){
    const mainEl = document.querySelector('main');
    if(!mainEl) return;
    const isFileDrag = (e)=> e && e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types || [], 'Files') !== -1;

    // テキスト選択からのドラッグ開始を抑止（ファイルドラッグは許可）
    mainEl.addEventListener('dragstart', (e)=>{
        const sel = window.getSelection && window.getSelection();
        const hasTextSel = sel && String(sel).length > 0;
        if(hasTextSel && !isFileDrag(e)){
            e.preventDefault();
        }
    });

    // 非ファイルのdragイベントがwindowにバブリングしてオーバーレイを出さないよう抑止
    const stopIfTextDrag = (e)=>{ if(!isFileDrag(e)){ e.stopPropagation(); } };
    mainEl.addEventListener('dragenter', stopIfTextDrag);
    mainEl.addEventListener('dragover', stopIfTextDrag);
    mainEl.addEventListener('dragleave', stopIfTextDrag);
    mainEl.addEventListener('drop', stopIfTextDrag);
}

// ===================== Wire up =====================


(async function init(){
    setupDnD();
    setupMainTextDragBlock();
    el('loadBtn').onclick = ()=> el('loader').click();
    el('loader').onchange = ()=>{ const f = el('loader').files[0]; if(f) loadBinFromFile(f); el('loader').value = ''; };
    el('downloadBtn').onclick = onDownload;

    // restore language and theme from localStorage
    const SUPPORTED_LANGS = ['ja','en','es','fr','de','it'];
    console.log('lang', localStorage.getItem('lang'));
    const savedLang = localStorage.getItem('lang') || ((navigator.language || navigator.userLanguage || "en").slice(0,2).toLowerCase());
    const lang = SUPPORTED_LANGS.indexOf(savedLang) !== -1 ? savedLang : 'en';
    if(lang){ state.lang = lang; }
    el('lang').value = state.lang;
    el('theme').value = savedTheme;

    // restore filter-selected flag
    const savedFilter = localStorage.getItem('filterSel');
    state.filterSelected = savedFilter === '1';
    const filterChk = document.getElementById('filterSel');
    if(filterChk){ filterChk.checked = state.filterSelected; }

    // layout handled by CSS media queries

    el('lang').onchange = ()=>{ state.lang = el('lang').value; localStorage.setItem('lang', state.lang); render(); };
    el('theme').onchange = ()=>{ const t = el('theme').value; localStorage.setItem('theme', t); applyTheme(t); };

    if(filterChk){ filterChk.onchange = ()=>{ state.filterSelected = filterChk.checked; localStorage.setItem('filterSel', state.filterSelected ? '1':'0'); renderSelected(); }; }

    // bulk apply handler
    const bulkApplyBtn = document.getElementById('bulkApply');
    if(bulkApplyBtn){
        bulkApplyBtn.onclick = ()=>{
            const ids = Array.from(state.selected);
            if(ids.length===0) return;
            const getNum = (id)=>{
                const v = document.getElementById(id);
                if(!v) return null;
                const s = (v.value||'').replace(/\D+/g,'');
                return s === '' ? null : parseInt(s,10);
            };
            const pVal = getNum('bulkPrice');
            const minValRaw = getNum('bulkMin');
            const maxValRaw = getNum('bulkMax');
            let minVal = minValRaw, maxVal = maxValRaw;
            if(minVal != null && maxVal != null && minVal > maxVal){ const t = minVal; minVal = maxVal; maxVal = t; }
            for(const id of ids){
                const meta = state.meta.get(id) || { price:10, min:1, max:100 };
                if(pVal != null) meta.price = pVal;
                if(minVal != null){
                    meta.min = minVal;
                    if(maxVal == null && meta.max < minVal){ meta.max = minVal; }
                }
                if(maxVal != null){
                    meta.max = maxVal;
                    if(minVal == null && meta.min > maxVal){ meta.min = maxVal; }
                }
                if(meta.min > meta.max) meta.max = meta.min;
                state.meta.set(id, meta);
            }
            renderSelected();
        };
    }

    // bulk delete handlers
    function namesForIds(ids){
        const lang = state.lang;
        return ids.map(id=>{
            const it = state.items.find(x=>x.id===id);
            const name = it ? (getItemName(it, lang)||'') : `0x${id.toString(16).toUpperCase()}`;
            return `• ${name} (0x${id.toString(16).toUpperCase()})`;
        });
    }
    function confirmAndDelete(ids){
        if(!ids || ids.length===0) return;
        const msg = t('confirmDelete') + '\n\n' + namesForIds(ids).join('\n');
        if(confirm(msg)){
            for(const id of ids){
                state.selected.delete(id);
                state.meta.delete(id);
            }
            render();
        }
    }
    const btnMatched = document.getElementById('delMatched');
    const btnUnmatched = document.getElementById('delUnmatched');
    const btnAll = document.getElementById('delAll');
    const computeMatches = ()=>{
        const q = (state.q||'').trim().toLowerCase();
        if(!q) return [];
        const ids = Array.from(state.selected);
        const lang = state.lang;
        const matches = [];
        for(const id of ids){
            const it = state.items.find(x=>x.id===id);
            const name = it ? (getItemName(it, lang)||'') : '';
            if(name.toLowerCase().includes(q)) matches.push(id);
        }
        return matches;
    };
    if(btnMatched){ btnMatched.onclick = ()=>{ const ids = computeMatches(); confirmAndDelete(ids); }; }
    if(btnUnmatched){ btnUnmatched.onclick = ()=>{
        const idsSel = Array.from(state.selected);
        const matched = new Set(computeMatches());
        const notMatched = idsSel.filter(id=>!matched.has(id));
        confirmAndDelete(notMatched);
    }; }
    if(btnAll){ btnAll.onclick = ()=>{
        const ids = Array.from(state.selected);
        confirmAndDelete(ids);
    }; }

    // Info box collapse/expand behavior with persistence
    const infoBox = document.getElementById('infoBox');
    if(infoBox){
        const saved = localStorage.getItem('infoCollapsed');
        const collapsedInit = (saved !== null) ? (saved === '1') : (window.innerWidth <= 1000);
        if(collapsedInit) infoBox.classList.add('collapsed');
        infoBox.addEventListener('click', ()=>{
            const isCollapsed = infoBox.classList.toggle('collapsed');
            localStorage.setItem('infoCollapsed', isCollapsed ? '1' : '0');
        });
    }

    // Preset fixed-list: populate dropdown and apply handler
    (function setupPresets(){
        const sel = document.getElementById('presetSelect');
        if(!sel) return;

        // Populate once
        if(typeof dqvcListings !== 'undefined' && Array.isArray(dqvcListings)){
            // Clear existing options except placeholder
            for(let i = sel.options.length - 1; i >= 1; i--) sel.remove(i);
            dqvcListings.forEach((list, idx)=>{
                // Ignore link property per spec
                const opt = document.createElement('option');
                const num = idx + 1;
                const name = list && list.name ? String(list.name) : `List ${num}`;
                opt.value = String(idx);
                opt.textContent = `${num} - ${name}`;
                sel.appendChild(opt);
            });
        }

        const applyFromSelect = ()=>{
            const v = sel.value;
            if(v === '' || isNaN(parseInt(v,10))) return;
            const idx = parseInt(v,10);
            if(typeof dqvcListings === 'undefined' || !Array.isArray(dqvcListings)) return;
            const list = dqvcListings[idx];
            if(!list || !Array.isArray(list.items)) return;

            const newSel = new Set();
            const newMeta = new Map();
            list.items.forEach((it)=>{
                if(!it || typeof it.itemId !== 'number') return;
                const id = it.itemId >>> 0;
                newSel.add(id);
                const price = (typeof it.price === 'number') ? it.price : 10;
                const min = (typeof it.min === 'number') ? it.min : 1;
                const max = (typeof it.max === 'number') ? it.max : 1;
                newMeta.set(id, { price, min, max }); // default to 1 if undefined
            });
            state.selected = newSel;
            state.meta = newMeta;
            render();
        };

        // 変更した瞬間に適用
        sel.addEventListener('change', applyFromSelect);
    })();

    el('q').addEventListener('input', debounce(()=>{ state.q = el('q').value; renderItems(); renderSelected(); }, 120));

    await loadCSV();
    render();
})();