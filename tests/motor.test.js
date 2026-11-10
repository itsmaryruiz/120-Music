/* Pruebas del motor musical. Ejecutar: node tests/motor.test.js */
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const eng = html.slice(html.indexOf('/*ENGINE-START*/'), html.indexOf('/*ENGINE-END*/'));
eval(eng + ';globalThis.E={Music,parseSongText,songToText,itemsToText,searchIndex,buildIndex,checkBackup,planRestore,isNoteText,matchKey}');
const {Music} = E; let fail = 0;
const eq = (a, b, m) => { if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.log('FALLA', m, JSON.stringify(a), '≠', JSON.stringify(b)); } else console.log('ok  ', m); };
const T = (c, s, k) => Music.transposeSym(c, s, Music.flatsFor(k, s, 'auto'), false);
eq(['D','G','A','Bm','Em','G/B','Asus4','F#m7'].map(c => T(c, -2, {i:2,minor:false})), ['C','F','G','Am','Dm','F/A','Gsus4','Em7'], 'D → C (bajar un tono)');
eq(['Em','C','G','D','Am7','B7','D/F#'].map(c => T(c, 3, {i:4,minor:true})), ['Gm','Eb','Bb','F','Cm7','D7','F/A'], 'Em → Gm');
eq(['Cmaj7','Dm7','G7','E♭maj7','B♭','Cadd9','C(add9)','Bm7b5','C#dim7','Gaug','C2','Dsus'].every(c => Music.parse(c)), true, 'reconoce acordes extendidos');
eq(['Dios','Amén','A mi','Hola','Coro','x2','H7'].some(c => Music.parse(c)), false, 'no confunde palabras con acordes');
eq(T('Xyz', 3, {i:2,minor:false}), 'Xyz', 'acorde desconocido queda intacto');
eq(Music.parseKey('Re menor'), {i:2,minor:true}, 'tonalidad en solfeo');
eq(Music.parseKey('F#m'), {i:6,minor:true}, 'tonalidad F#m');
eq(Music.semiLabel(-2), '−1 tono', 'etiqueta de intervalo');
const txt = `MI CANCIÓN DE PRUEBA\nAutor de prueba      Tono: G\n______________\nIntro: G D/F# Em C\n\nEstofra 1:\nG           D/F#\nPrimera línea de prueba\nEm          C\nsegunda línea del verso\n\n// Coro //\nC     D      G\nfrase del coro aquí\nFinal : G`;
const p = E.parseSongText(txt, {});
eq([p.meta.title, p.meta.artist, Music.keyName(p.meta.key)], ['MI CANCIÓN DE PRUEBA','Autor de prueba','G'], 'título, artista y tono en la misma línea');
eq(p.sections.map(s => s.label), ['Intro','Verso 1','Coro','Final'], 'secciones (incluye "Estofra" y "// Coro //")');
eq(p.stats.unknown, [], 'sin acordes desconocidos');
const song = {id:'x', title:p.meta.title, artist:p.meta.artist, key:p.meta.key, sections:p.sections};
const ix = new Map([['x', E.buildIndex(song)]]);
const r = E.searchIndex([song], ix, 'segunda linea del berso');
eq(r.length ? ix.get('x').lines[r[0].hits[0].k].raw : null, 'segunda línea del verso', 'búsqueda tolera acentos y errores');
/* Abrir otra canción en el tono que se está tocando */
const C = {i:0, minor:false};
eq(E.matchKey({i:2, minor:false}, C), {i:0, minor:false, relative:false}, 'canción en D se abre en C si estoy en C');
eq(Music.semiBetween({i:2, minor:false}, E.matchKey({i:2, minor:false}, C)), -2, 'D → C es bajar un tono');
eq(E.matchKey({i:4, minor:true}, C), {i:9, minor:true, relative:true}, 'canción menor (Em) estando en C se abre en Am, la relativa');
eq(E.matchKey({i:7, minor:false}, {i:9, minor:true}), {i:0, minor:false, relative:true}, 'canción mayor estando en Am se abre en C, la relativa');
eq(E.matchKey(null, C), null, 'sin tonalidad confirmada no se adivina');
/* Notas de interpretación */
const nt = `[Coro]\nG       D\nfrase de prueba\nSe repite\n(x2)\n(Todos)\n{nota-derecha: Una vez más}\n{c: Suave}\n(Aleluya)`;
const pn = E.parseSongText(nt, {});
eq(pn.sections[0].lines.filter(l => l.note).map(l => [l.lyric, l.note]), [['Se repite','left'],['(x2)','left'],['(Todos)','left'],['Una vez más','right'],['Suave','left']], 'detecta notas y respeta la alineación');
eq(pn.sections[0].lines.some(l => !l.note && l.lyric === '(Aleluya)'), true, 'una letra entre paréntesis sigue siendo letra');
eq(pn.stats.lyricLines, 2, 'las notas no cuentan como letra');
const pn2 = E.parseSongText(E.songToText({sections:pn.sections}), {bodyOnly:true});
eq(JSON.stringify(pn2.sections), JSON.stringify(pn.sections), 'las notas sobreviven al editar (texto de ida y vuelta)');
eq(E.parseSongText('Se repite', {bodyOnly:true}).sections[0].lines[0].note, undefined, 'al editar, una frase sin marcar se queda como letra');
eq(E.isNoteText('Repetir 2 veces') && E.isNoteText('// x2 //') && !E.isNoteText('Te alabaré'), true, 'reconoce frases de repetición');
eq(E.buildIndex({title:'t', artist:'', sections:pn.sections}).lines.some(l => l.raw === 'Se repite'), false, 'las notas no entran en la búsqueda por letra');
/* Copia de seguridad */
const bk = (o) => ({app:'120 Worship', version:1, exportedAt:1, songs:[], setlists:[], files:[], ...o});
eq(E.checkBackup(bk({})), null, 'copia válida');
eq(E.checkBackup(bk({app:'120 Music'})), null, 'acepta copias hechas con el nombre anterior');
eq(!!E.checkBackup({app:'Otra', version:1}), true, 'rechaza archivo que no es copia');
eq(!!E.checkBackup(bk({version:99})), true, 'rechaza copia de una versión más nueva');
eq(!!E.checkBackup(bk({songs:[{title:'sin id'}]})), true, 'rechaza canciones dañadas');
const cur = {songs:[{id:'a', title:'A', updatedAt:5, sections:[]}, {id:'b', title:'B', updatedAt:9, sections:[]}, {id:'ex1', title:'Aurora de gracia', isExample:true, sections:[]}],
  setlists:[{id:'L1', items:[], updatedAt:5}, {id:'LX', isExample:true, items:[]}], fileIds:['f1']};
const plan = E.planRestore(cur, bk({
  songs:[{id:'a', updatedAt:7, sections:[]}, {id:'b', updatedAt:3, sections:[]}, {id:'c', updatedAt:1, sections:[]}, {id:'ex9', title:'Aurora de Gracia', isExample:true, sections:[]}],
  setlists:[{id:'L1', items:[], updatedAt:2}, {id:'L2', items:[{songId:'ex9'}], updatedAt:1}, {id:'LY', isExample:true, items:[]}],
  files:[{id:'f1', data:'AA=='}, {id:'f2', data:'AA=='}]}));
eq(plan.songs.map(s => s.id), ['a','c'], 'restaurar: agrega nuevas y solo reemplaza si la copia es más reciente');
eq(plan.setlists.map(l => l.id), ['L2'], 'restaurar: listas nuevas, sin duplicar la de ejemplo');
eq(plan.setlists[0].items[0].songId, 'ex1', 'restaurar: la lista apunta al ejemplo que ya existe');
eq(plan.files.map(f => f.id), ['f2'], 'restaurar: nunca sobrescribe un documento original');
eq(plan.counts, {newSongs:1, updSongs:1, keptSongs:2, newSets:1, updSets:0, keptSets:2, newFiles:1}, 'restaurar: resumen');
console.log(fail ? `\n${fail} prueba(s) fallaron` : '\nTodas las pruebas pasaron');
process.exit(fail ? 1 : 0);
