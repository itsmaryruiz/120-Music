# 120 Music

Aplicación web instalable (PWA) para tecladistas, pianistas y equipos de alabanza de iglesias. Sirve para encontrar canciones por frases de la letra, transportarlas a cualquier tono, filtrarlas por tonalidad, prepararlas por servicio y tocarlas en un modo en vivo.

La especificación completa que escribió la dueña del proyecto está en `docs/PROMPT_ORIGINAL.md`. Es la fuente de verdad sobre qué debe hacer la app.

## Estado actual

Están hechas las fases 1, 2 y 3 del plan de `docs/PROMPT_ORIGINAL.md`, todas funcionales:

- **Fase 1 · Biblioteca e importación**
  - Importa PDF digital, Word .docx y texto o ChordPro.
  - Pantalla de revisión con nivel de confianza por campo.
  - Edición, etiquetas, favoritas, recientes y detección de duplicados.
  - El documento original se guarda aparte.
- **Fase 2 · Motor musical**
  - Interpreta, valida y transporta acordes.
  - Selector de 12 tonos, botones de ±½ y ±1 tono, y escritura con sostenidos o bemoles.
  - Filtro por tonalidad con tres modos: original, asignada en servicios y transportables.
- **Fase 3 · Modo en vivo y servicios**
  - Listas de servicio con tono propio por canción, notas, enlace con la siguiente y opción de duplicar.
  - Modo en vivo con pantalla oscura, botones grandes, bloqueo contra toques accidentales, búsqueda rápida y navegación por la lista.
  - Al transportar se conserva la posición de lectura y la pantalla no se apaga.
- **Copia de seguridad** (en Ajustes)
  - Exporta canciones, listas y documentos originales en un solo `.json` (`120-music-copia-AAAA-MM-DD.json`). En iPhone se guarda con la hoja de compartir ("Guardar en Archivos"); en computadora se descarga.
  - Restaurar nunca borra: agrega lo que falta, reemplaza una canción o lista solo si la de la copia es más reciente (`updatedAt`) y nunca sobrescribe un documento original. Antes de restaurar muestra un resumen.
  - Ajustes avisa si nunca se hizo copia o si hay cambios después de la última.

**Pendiente**
- **Fase 4:** conexión manual de canciones y asistente de transiciones.
- **Fase 5:** acompañamiento para prédicas y biblioteca de progresiones.
- **Fase 6:** sincronización, colaboración en equipo, voz, pedal Bluetooth y audio.
- **OCR** para PDF escaneados.

## Archivos

```
index.html             Toda la app: HTML + CSS + JS, sin paso de compilación
manifest.webmanifest   Nombre, ícono y colores para instalarla en el teléfono
sw.js                  Service worker: funcionamiento sin conexión
icons/                 Íconos 192, 512 y apple-touch-icon (180)
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
Song = { id, title, artist, key:{i:0-11, minor:bool}|null,
  conf:{title,artist,key: 'alta'|'media'|'baja'},
  sections:[{type:'intro'|'verso'|'precoro'|'coro'|'puente'|'interludio'|'final'|'otro'|'sin', label,
             lines:[{chords:[{pos, raw, ok}], lyric}]}],
  tags:[], favorite, status:'revisar'|'ok'|'sin-texto', sourceFileId, sourceName, sourcePage?,
  createdAt, updatedAt, lastOpened, isExample?, meta:{notes:[]} }
SourceFile = { id, name, ext, size, blob, addedAt, status }
Setlist = { id, name, date:'YYYY-MM-DD', type, items:[{songId, key, notes, link}], isExample? }
Prefs = { id:'prefs', spell:'auto'|'sharp'|'flat', liveSize, livePalette:'dark'|'light', perPage, seeded, lastBackup? }
Backup = { app:'120 Music', version:1, exportedAt, songs:[Song], setlists:[Setlist], files:[{...SourceFile sin blob, type, data:base64}] }
```

- `chords[].pos` es la columna del acorde sobre la letra.
- `ok:false` marca un acorde no reconocido.
- La tonalidad original **nunca** cambia al transportar. El tono por servicio se guarda en `Setlist.items[].key`.

## Reglas que no se rompen (vienen de la especificación)

- **Originales:** nunca sobrescribir ni modificar los documentos originales.
- **Acordes no reconocidos:** nunca transportarlos ni cambiarlos. Se muestran en rojo y se dejan intactos.
- **Datos inventados:** nunca inventar títulos, letras ni tonalidades. Si un dato no se detectó con seguridad, se marca para revisión.
- **Funciones simuladas:** ningún botón que no haga nada. Una función que aún no existe no aparece en la interfaz, o se explica como fase pendiente.
- **Sin conexión:** las funciones principales deben funcionar sin internet.
- **Letras con derechos:** no incluir letras de canciones reales en el repositorio (es público). Para pruebas, usar letra inventada.

## Decisiones tomadas

- **Nombre: 120 Music.** Aparece en `<title>`, `const APP_NAME`, la marca de la barra lateral (`.brand`), `apple-mobile-web-app-title` y `manifest.webmanifest`. La base de IndexedDB se sigue llamando `app-alabanza` a propósito: cambiarla haría que los teléfonos pierdan las canciones guardadas.
- **App web en vez de Flutter.** La versión actual es una PWA que se publica en **GitHub Pages** y se agrega a la pantalla de inicio del iPhone (Compartir → Agregar a pantalla de inicio). El motor está separado para poder portarlo a Flutter + SQLite si algún día se quiere una app de tienda.
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
- **Respaldo:** la copia de seguridad es manual; no hay sincronización automática. Si se borran los datos del navegador y no hay copia, se pierden.
- **Copia con la misma canción importada en dos teléfonos:** si se importó el mismo PDF por separado en cada teléfono, al restaurar quedan dos canciones (tienen id distinto). La detección de duplicados de la biblioteca las señala.

## Próximos pasos sugeridos

1. **Publicar en GitHub Pages:** repositorio público → Settings → Pages → rama `main`, carpeta raíz.
2. **Fase 4:** conexión de canciones y asistente de transiciones. El motor ya tiene `edgeChords` y `semiBetween`.
3. **Fase 5:** acompañamiento para prédicas, con progresiones transportables y guía de mano izquierda y mano derecha.
4. **OCR:** tesseract.js con los archivos dentro del repositorio.
5. **Librerías locales (opcional):** copiar pdf.js y mammoth a `vendor/` para no depender de cdnjs.

## Cómo trabajar en este proyecto

- **Probar:** abrir `index.html` con un servidor local, por ejemplo `npx serve .` o `python3 -m http.server`. El service worker no funciona si se abre con file://.
- **Pruebas:** antes de publicar, ejecutar `node tests/motor.test.js`. Cualquier cambio en el motor necesita una prueba nueva.
- **Idioma:** la interfaz, los mensajes y los comentarios van en español.
