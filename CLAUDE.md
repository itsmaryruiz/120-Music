# 120 Worship

Aplicación web instalable (PWA) para tecladistas, pianistas y equipos de alabanza de iglesias. Sirve para encontrar canciones por frases de la letra, transportarlas a cualquier tono, filtrarlas por tonalidad, prepararlas por servicio y tocarlas en un modo en vivo.

La especificación completa que escribió la dueña del proyecto está en `docs/PROMPT_ORIGINAL.md`. Es la fuente de verdad sobre qué debe hacer la app.

## Estado actual

Están hechas las fases 1 a 5 del plan de `docs/PROMPT_ORIGINAL.md`, todas funcionales:

- **Fase 1 · Biblioteca e importación**
  - Importa PDF digital, Word .docx y texto o ChordPro.
  - Pantalla de revisión con nivel de confianza por campo.
  - **Tonalidad deducida por los acordes** (`Music.estimateKey`, devuelve `conf` y `why`): se da por segura (`alta`, "Detectado por los acordes", en verde) solo con evidencia clara: ≥8 acordes, ≥90 % del tono, margen ≥3 y empieza o termina en la tónica. Si no, la revisión dice "Probable" o "Dudoso", explica por qué (`meta.keyWhy`) y ofrece "Buscar el tono" (Google) y "Escuchar en YouTube". (A la dueña le molestaba que siempre pidiera confirmar el tono.)
  - Edición, etiquetas, favoritas, recientes y detección de duplicados.
  - El documento original se guarda aparte.
  - **Procesados** (en Importar, `jobsHTML`): cada documento importado en la sesión muestra su estado real ("Falta revisar" con su botón, o "✓ Revisada" con "Abrir"). El botón de arriba solo cuenta lo que falta revisar (`jobPending`) y "Quitar las revisadas" limpia la lista. Al terminar una revisión, si falta algo de lo importado, se vuelve a Importar. (A la dueña le confundía que contara también lo ya revisado.)
  - **Buscar acordes en internet** (en Importar, y desde Buscar cuando no hay resultados): atajos que abren en el navegador Google, LaCuerda y Cifra Club (vía Google `site:`) y YouTube. La app **no lee ni copia** esas páginas: la dueña verifica los acordes, los copia y los pega en "Pega letra y acordes". Necesita internet.
- **Fase 2 · Motor musical**
  - Interpreta, valida y transporta acordes.
  - Selector de 12 tonos, botones de ±½ y ±1 tono, y escritura con sostenidos o bemoles.
  - **Escritura según la tonalidad** (`Music.spellIn`): cada nota se escribe por su función (en Dm el VI es Bb, no A#; en C el bVII es Bb y el #IV es F#). Nunca Cb, Fb, E#, B#. Se usa al transportar en modo "Según la tonalidad".
  - **Al importar** (si la tonalidad se detectó con seguridad) `respellSections` corrige la escritura y la revisión avisa qué cambió, con "Dejar como venía". En el editor, si algún acorde está mal escrito para la tonalidad elegida, aparece un aviso con "Corregir". En el tono original se muestra lo guardado tal cual.
  - Filtro por tonalidad con tres modos: original, asignada en servicios y transportables.
- **Fase 3 · Modo en vivo y servicios**
  - Listas de servicio con tono propio por canción, notas, enlace con la siguiente y opción de duplicar.
  - Modo en vivo con pantalla oscura, botones grandes, bloqueo contra toques accidentales, búsqueda rápida y navegación por la lista.
  - Al transportar se conserva la posición de lectura y la pantalla no se apaga.
  - **Desplazamiento automático** (botón "▶ Auto"): la letra baja sola; velocidad 1–10 con − / + (se guarda en `Prefs.liveScroll`); tocar la letra pausa o sigue; funciona con la pantalla bloqueada; se detiene al final y al cambiar de canción. Alternativa sin pedal Bluetooth (la dueña lo prefirió así).
  - **Acordes del tono** (botón "Acordes" en vivo y tarjeta en Improvisar): como una rueda del círculo de quintas. Familia de 7 acordes con sus números (mayores 1-4-5, menores 6-2-3, el 7), acordes prestados comunes (b7, 3 mayor, 2 mayor, 4 menor), progresiones comunes y teclado del acorde tocado. Un tono menor usa la familia de su relativa mayor (sistema de números). Lógica en `keyFamily`. Sirve para seguir a la cantante cuando entra una canción que no está en la lista.
  - **Círculo de quintas** (`cofSVG`, `circleHTML`): los 12 tonos mayores afuera y sus relativas menores adentro, con la "ventana" del tono iluminada y sus números (1-4-5 / 6-2-3), escala (`scaleOf`), armadura (`keySignature`) y tonos vecinos. En Improvisar se puede tocar para cambiar de tono; en vivo es solo de consulta (botón "Ver círculo de quintas" dentro de Acordes).
  - **Detectar tono** (botón 🎤 en vivo y en Improvisar; objeto `Det`): escucha el micrófono, muestra la nota que se canta y estima el tono con su relativa y nivel de seguridad (necesita ≥4 s de canto y ≥4 notas). Debajo muestra la familia de acordes de ese tono. En Improvisar, "Usar … en Improvisar" cambia el tono. Todo local: el audio no se guarda ni se envía. Motor: `detectPitch` (YIN), `keysFromHistogram` (perfiles de Krumhansl), `keyGuess`. En vivo va como panel (el modo en vivo tapa las ventanas emergentes); el micrófono se apaga al cerrar el panel o la ventana. Funciona mejor con la cantante sola o con poca música.
  - **Buscar en vivo en el mismo tono:** cada resultado de la búsqueda tiene un botón "En C" (el tono que suena) además de "Original". Si una canción es mayor y la otra menor, usa la relativa (C ↔ Am), marcada "relativa". Lógica en `matchKey` (motor). "Volver" regresa a la canción anterior con su tono.
- **Fase 4 · Conexión de canciones**
  - **Asistente de transiciones** (vista `conectar`, estado `S.conn`): eliges canción actual y siguiente con su tono; muestra cómo sale una y entra la otra y varias opciones (directo, dominante V7, subida de tono, ii–V, suspensión, acorde puente), cada una con acordes, nivel y explicación. Si faltan acordes o la tonalidad es estimada, avisa que es provisional. Sugiere "¿mismo tono?" con la relativa. Sin canción siguiente, lista las que mejor conectan (`rankByKey`).
  - Entradas: botón en Servicios, en Inicio, "Conectar con otra" en cada canción y "Sugerir transición" entre canciones de una lista.
  - **En Servicios:** "Tono común" pone todas en un tono (menores en la relativa). Cada canción muestra la progresión del coro y sus secciones. Entre canciones: cómo sale y entra, la relación de tonos y la transición guardada (editable; avisa si luego cambió un tono). La transición se ve en el modo en vivo antes de la siguiente.
  - Motor: `keyRelation`, `transitionOptions`, `rankByKey`, `diatonic` (sección CONEXIÓN DE CANCIONES).
- **Fase 5 · Improvisación** (pestaña "Improvisar", vista `acompanar`, estado `S.acc` guardado en `Prefs.acc`)
  - La dueña pidió que se llame **Improvisación**, no "Prédica y ministración". Reemplazó a la pestaña "Buscar" (la búsqueda sigue en Inicio).
  - Se elige momento (prédica, oración, clamor…), tonalidad (12 tonos, mayor o menor), nivel y estilo. El momento da ideas de cómo tocar y ordena las progresiones; nunca se etiqueta una progresión como "la correcta" para un momento espiritual.
  - Biblioteca `PROGRESSIONS` (escritas en C o Am, se transportan con `progressionIn`): acordes, grados en romanos (`romanOf`), tecladito por acorde con mano derecha (azul) y bajo (violeta), inversiones cercanas (`voiceLead`), variaciones, alternativas que comparten acordes, ±½ por progresión y "Ver en grande" (paso a paso).
  - **Escuchar** (`Player`, Web Audio): piano sencillo generado en el momento, sin internet ni archivos de sonido. Suena en bucle, ilumina el acorde que suena y avanza la vista en grande. Patrones `PATTERNS`/`barEvents` (acordes largos, arpegio, rítmico) y tempo 50–130. Se detiene al salir de la sección. En iPhone antiguos el interruptor de silencio puede apagarlo (`navigator.audioSession` lo evita donde existe).
- **Notas de interpretación y secciones**
  - Frases como "Se repite", "x2", "(Todos)" son *notas*: renglón aparte, en rojo y cursiva (color rojo/azul/gris y cursiva se cambian en Ajustes), alineadas a la izquierda, al centro o a la derecha.
  - Se detectan solas al importar (`isNoteText`). En el editor hay botones para marcar la línea del cursor como nota (izquierda, centro, derecha), quitarla, o buscar frases de repetición. "(x2)", "(bis)" dentro de un renglón de letra se pintan igual sin moverlo.
  - En el texto del editor una nota se escribe `{nota: …}`, `{nota-centro: …}` o `{nota-derecha: …}`. `{c: …}` de ChordPro también es nota. Al editar (`bodyOnly`) no se detectan notas solas: así una frase que se desmarcó se queda como letra.
  - Títulos de sección compuestos ("[Intermedio/Instrumental]", "Coro / Chorus") y cualquier título entre corchetes ("[Ministración libre]") son secciones, con el texto tal cual. "Intermedio" es del tipo interludio.
  - Cada tipo de sección tiene su color (etiqueta + raya izquierda): verso oscuro, pre-coro verde azulado, coro azul con fondo, puente violeta, intro/interludio/final gris.
- **Sincronización entre dispositivos** (Ajustes → Sincronización; sección `SINCRONIZACIÓN` de index.html, objeto `Sync`)
  - Servidor: Supabase, proyecto `120 Worship` de la dueña (`https://ijknbjmuqdrzcmsuavcn.supabase.co`, plan gratis). Tabla `public.items` (una fila por canción, lista o documento: `kind`, `id`, `data` jsonb, `deleted`, `updated_at`, `server_at`) y bucket privado `files` (`<usuario>/<id>`). Todo protegido con RLS por usuario. El SQL está en `docs/supabase.sql`.
  - La llave en el código es la **publicable** (pública por diseño). Nunca poner en el repositorio la `secret`/`service_role` ni la contraseña de la base de datos.
  - **Entrar:** correo → enlace "Sign in" de Supabase. En la computadora se toca el enlace (vuelve a la app con `#access_token`). En el iPhone el enlace abre Safari (que guarda aparte de la app instalada): Safari muestra la vista `enlace` ("Ya casi") con **Copiar para la app**, y en la app instalada **Pegar y entrar** lee el portapapeles (`syncLoginFrom`). Safari no se queda con la sesión. También se acepta pegar a mano el enlace del correo (aunque venga envuelto por Gmail; `authFromText`), cuyo `token` se usa como `token_hash` en `/auth/v1/verify`. La dueña encontró difícil copiar el enlace escondido detrás de "Sign in"; por eso existe este paso. No se usa código de 6 dígitos: Supabase no deja editar las plantillas de correo sin SMTP propio. El correo integrado de Supabase permite **pocos correos por hora**.
  - **Cómo sincroniza:** cada `dbPut`/`dbDel` de canciones, listas y documentos se anota en `Sync.st.dirty` (en `localStorage` `120w-sync`, junto con la sesión y `lastPull`). `syncNow` sube lo anotado y baja lo nuevo desde `lastPull` (con 5 s de margen). Gana el cambio más reciente (`syncDecide`, en el motor). Los ejemplos y las preferencias no se sincronizan. Se dispara al abrir, 2,5 s después de cada cambio, cada minuto, al volver a la app y al volver la conexión.
  - `sw.js` no guarda en caché nada de `*.supabase.co`.
  - Al entrar por primera vez en un dispositivo, se sube todo lo que ya tenía (`syncAfterLogin`).
- **Copia de seguridad** (en Ajustes)
  - Exporta canciones, listas y documentos originales en un solo `.json` (`120-worship-copia-AAAA-MM-DD.json`). En iPhone se guarda con la hoja de compartir ("Guardar en Archivos"); en computadora se descarga.
  - Restaurar nunca borra: agrega lo que falta, reemplaza una canción o lista solo si la de la copia es más reciente (`updatedAt`) y nunca sobrescribe un documento original. Antes de restaurar muestra un resumen.
  - Ajustes avisa si nunca se hizo copia o si hay cambios después de la última.

**Pendiente**
- **Fase 6:** colaboración en equipo, voz, pedal Bluetooth y audio. (La sincronización entre sus dispositivos ya está hecha.)
- **OCR** para PDF escaneados: la dueña **no lo quiere por ahora** (solo PDF digitales). Si algún día se hace, que sea gratis y local (tesseract.js).

## Archivos

```
index.html             Toda la app: HTML + CSS + JS, sin paso de compilación
manifest.webmanifest   Nombre, ícono y colores para instalarla en el teléfono
sw.js                  Service worker: funcionamiento sin conexión
icons/                 Íconos 192, 512, maskable, apple-touch-icon (180) y logo.png
tests/motor.test.js    Pruebas del motor (ejecutar: node tests/motor.test.js)
docs/PROMPT_ORIGINAL.md  Especificación completa del proyecto
```

## Arquitectura de index.html

Es un solo archivo, ordenado por secciones con comentarios `/* ===== ... ===== */`.

1. **Motor musical** (entre los marcadores `/*ENGINE-START*/` y `/*ENGINE-END*/`). No depende de la interfaz ni del navegador. Las pruebas lo extraen por esos marcadores, así que no hay que borrarlos.
   - `Music`: `parse`, `transposeSym`, `parseKey` (acepta también solfeo: "Re menor"), `estimateKey`, `keyName`, `flatsFor`, `semiLabel`, `semiBetween`.
   - Parser de documentos: `parseSongText`, `analyzeChordLine`, `convertInline` (ChordPro `[G]palabra`), `songToText`.
   - Reconstrucción de PDF: `itemsToText`. Agrupa los fragmentos por renglón y calcula columnas de caracteres para que el acorde quede sobre la sílaba correcta. **Detecta páginas a dos columnas** buscando un pasillo vertical sin texto.
   - Búsqueda: `normText`, `buildIndex`, `searchIndex`, `lev`. Hace frase exacta (también entre dos renglones), palabras sueltas, prefijo de la última palabra y tolerancia a errores con Levenshtein. Además busca por acorde y por tonalidad.
   - Copia de seguridad: `checkBackup` (valida el archivo) y `planRestore` (decide qué se agrega o actualiza). La parte de interfaz está en la sección `COPIA DE SEGURIDAD` fuera del motor: `buildBackup`, `readBackupFile`, `doRestore`.
2. **Almacenamiento:** IndexedDB, base `app-alabanza`, con los almacenes `songs`, `files`, `setlists` y `prefs`. Si IndexedDB falla, los datos viven solo en memoria y Ajustes lo avisa.
3. **Estado (`S`)**, **vistas (`VIEWS.*`, que devuelven HTML)**, **`AFTER.*`** (escuchadores que se conectan después de pintar) y **`ACT.*`** (acciones por `data-act` con delegación de clics).
4. **Importación:** `pdfExtract` usa pdf.js 3.11.174 en el hilo principal (el worker se carga como script). `mammoth` 1.6.0 lee el .docx. Ambos se cargan desde cdnjs.
5. **Modo en vivo:** `openLive`, `renderLive` y `closeLive`.
6. **Ejemplos:** tres canciones de muestra con letra original (no son canciones reales) y una lista de ejemplo. Se crean la primera vez y se pueden quitar desde Ajustes.

## Modelo de datos

```js
Song = { id, title, artist, key:{i:0-11, minor:bool}|null,   // meta.keyWhy: por qué se eligió el tono
  conf:{title,artist,key: 'alta'|'media'|'baja'},
  sections:[{type:'intro'|'verso'|'precoro'|'coro'|'puente'|'interludio'|'final'|'otro'|'sin', label,
             lines:[{chords:[{pos, raw, ok}], lyric, note?:'left'|'center'|'right'}]}],
  tags:[], favorite, status:'revisar'|'ok'|'sin-texto', sourceFileId, sourceName, sourcePage?,
  createdAt, updatedAt, lastOpened, isExample?, meta:{notes:[]} }
SourceFile = { id, name, ext, size, blob, addedAt, status }
Setlist = { id, name, date:'YYYY-MM-DD', type, items:[{songId, key, notes, link, transition?:{text, name, from, to}}], isExample? }
Prefs = { id:'prefs', spell:'auto'|'sharp'|'flat', liveSize, livePalette:'dark'|'light', perPage, seeded, lastBackup?, noteColor:'red'|'blue'|'gray', noteItalic, liveScroll, theme:'auto'|'light'|'dark', acc?:{key, moment, level, style, pattern, bpm} }
Backup = { app:'120 Worship' (también se aceptan copias con '120 Music'), version:1, exportedAt, songs:[Song], setlists:[Setlist], files:[{...SourceFile sin blob, type, data:base64}] }
```

- `chords[].pos` es la columna del acorde sobre la letra.
- `ok:false` marca un acorde no reconocido.
- `note` marca un renglón que es nota de interpretación (no letra): no entra en la búsqueda ni cuenta como letra.
- La tonalidad original **nunca** cambia al transportar. El tono por servicio se guarda en `Setlist.items[].key`.

## Reglas que no se rompen (vienen de la especificación)

- **Originales:** nunca sobrescribir ni modificar los documentos originales.
- **Acordes no reconocidos:** nunca transportarlos ni cambiarlos. Se muestran en rojo y se dejan intactos.
- **Datos inventados:** nunca inventar títulos, letras ni tonalidades. Si un dato no se detectó con seguridad, se marca para revisión.
- **Funciones simuladas:** ningún botón que no haga nada. Una función que aún no existe no aparece en la interfaz, o se explica como fase pendiente.
- **Sin conexión:** las funciones principales deben funcionar sin internet.
- **Letras con derechos:** no incluir letras de canciones reales en el repositorio (es público). Para pruebas, usar letra inventada.

## Decisiones tomadas

- **Nombre: 120 Worship** (antes "120 Music"; el repositorio y el enlace siguen siendo `120-Music`). Aparece en `<title>`, `const APP_NAME`, la marca de la barra lateral (`.brand`), `apple-mobile-web-app-title` y `manifest.webmanifest`. La base de IndexedDB se sigue llamando `app-alabanza` a propósito: cambiarla haría que los teléfonos pierdan las canciones guardadas.
- **Publicada en GitHub Pages:** https://itsmaryruiz.github.io/120-Music/ (repositorio público `itsmaryruiz/120-Music`, rama `main`, carpeta raíz).
  - **Cómo se publica una actualización:** Claude hace el commit en esta carpeta y la dueña toca **Push origin** en GitHub Desktop (ella maneja la sesión de GitHub; no hay `gh` instalado). Antes de cada publicación hay que subir `VERSION` en `sw.js`.
- **Diseño:** tipografía Plus Jakarta Sans (Google Fonts) para títulos y texto; JetBrains Mono solo en hojas de acordes y tonos, porque la alineación acorde-sílaba necesita letra monoespaciada. Color principal azul (`--accent` #2563eb en claro, #5b8cff en oscuro). Los colores viven como variables en `:root`; el modo en vivo tiene su propia paleta en `.live`. Ícono: logo "120 Worship" en azul (#2563eb) sobre fondo blanco (`icons/`; `icon-maskable-512.png` tiene más margen para Android). Dentro de la app, `icons/logo.png` (negro sobre transparente, recortado) se muestra con `.logo` como máscara CSS pintada con `--accent`: en el inicio (teléfono) y en la barra lateral (computadora).
- **App web en vez de Flutter.** La versión actual es una PWA que se publica en **GitHub Pages** y se agrega a la pantalla de inicio del iPhone (Compartir → Agregar a pantalla de inicio). El motor está separado para poder portarlo a Flutter + SQLite si algún día se quiere una app de tienda.
- **Apariencia:** por defecto sigue al teléfono (claro u oscuro); en Ajustes → Apariencia se puede fijar Claro u Oscuro (`applyTheme`, `data-theme` en `<html>`). El modo en vivo tiene su propia paleta.
- **Datos locales por dispositivo.** En iPhone, la app instalada en la pantalla de inicio y Safari tienen almacenamiento **separado**. Hay que usar siempre la app instalada.
- **Sin conexión.** `sw.js` guarda en caché la app, las librerías de cdnjs y las fuentes. **Cada vez que se publique un cambio en index.html, hay que subir el valor de `VERSION` en sw.js** (por ejemplo alabanza-v2 → alabanza-v3) para que los teléfonos reciban la versión nueva.

## Probado con un documento real

Se probó con un PDF real de la usuaria, "Suelto" de Sarai Rivera. El archivo no está en el repositorio.

- **Detectado correctamente:** las dos columnas (el Puente va a la derecha), el título, la artista (estaba en la misma línea que "Tono: C") y la tonalidad C con confianza alta.
- **Acordes:** 38 reconocidos, ninguno desconocido.
- **Variantes de formato entendidas:** "Estofra 1:" escrito así, "// Coro //", "Final : C" e "Intro: C G Em7 D ( G A B / F#)".
- **Detalle conocido:** si en el PDF hay un renglón vacío entre un acorde y su letra, el acorde queda en un renglón aparte. Se corrige en la revisión.

## Limitaciones conocidas

- **PDF escaneados:** sin OCR por ahora. La canción queda marcada "Sin texto" y el original se puede ver para transcribirla. Con hosting propio, el OCR es posible con tesseract.js, guardando el modelo de idioma español dentro del repositorio para que funcione sin internet. Ver la sección "Próximos pasos".
- **Archivos .doc antiguos:** no se leen. Se pide guardarlos como .docx.
- **PDF con muchas canciones:** usar la opción "una canción por página". Todavía no se separan canciones automáticamente dentro de una misma página.
- **Respaldo:** con la sincronización activa, todo queda también en Supabase. Sin ella, la copia de seguridad es manual.
- **Supabase gratis se "duerme"** si pasa una semana sin uso: se reactiva desde supabase.com sin perder datos.
- **Copia con la misma canción importada en dos teléfonos:** si se importó el mismo PDF por separado en cada teléfono, al restaurar quedan dos canciones (tienen id distinto). La detección de duplicados de la biblioteca las señala.

## Próximos pasos sugeridos

1. **Fase 6:** compartir listas con el equipo (la sincronización ya existe) y, si algún día lo compra, pedal Bluetooth (se recibe como teclas de flecha o espacio).
2. **OCR (en pausa, la dueña no lo quiere por ahora):** tesseract.js con los archivos dentro del repositorio.
3. **Librerías locales (opcional):** copiar pdf.js y mammoth a `vendor/` para no depender de cdnjs.

## Cómo trabajar en este proyecto

- **Probar:** abrir `index.html` con un servidor local, por ejemplo `npx serve .` o `python3 -m http.server`. El service worker no funciona si se abre con file://.
- **Pruebas:** antes de publicar, ejecutar `node tests/motor.test.js`. Cualquier cambio en el motor necesita una prueba nueva.
- **Idioma:** la interfaz, los mensajes y los comentarios van en español.
