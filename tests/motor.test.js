/* Pruebas del motor musical. Ejecutar: node tests/motor.test.js */
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const eng = html.slice(html.indexOf('/*ENGINE-START*/'), html.indexOf('/*ENGINE-END*/'));
eval(eng + ';globalThis.E={Music,parseSongText,songToText,itemsToText,searchIndex,buildIndex,checkBackup,planRestore,isNoteText,matchKey,respellSections,transitionOptions,keyRelation,rankByKey,PROGRESSIONS,progressionIn,romanOf,voiceLead,chordTones}');
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
/* Títulos de sección compuestos */
const ps = E.parseSongText(`[Verso 1]\nG\nuna línea\n\n[Intermedio/Instrumental]\nC   G   Am   F\n\nIntermedio\nD\n\nCoro / Chorus\nG\notra línea\n\n[Vamp final]\nG\n\n[Ministración libre]\nC`, {bodyOnly:true});
eq(ps.sections.map(x => [x.type, x.label]), [['verso','Verso 1'],['interludio','Intermedio/Instrumental'],['interludio','Intermedio'],['coro','Coro/Chorus'],['final','Vamp final'],['otro','Ministración libre']], 'reconoce [Intermedio/Instrumental] y otros títulos de sección');
eq(ps.sections[1].lines[0].chords.map(c => c.raw), ['C','G','Am','F'], 'los acordes del intermedio quedan dentro de su sección');
eq(E.parseSongText(E.songToText({sections:ps.sections}), {bodyOnly:true}).sections.map(x => x.label), ps.sections.map(x => x.label), 'los títulos se conservan al editar');
eq(E.parseSongText('[G]Hola [D]mundo', {bodyOnly:true}).sections[0].lines[0].chords.length, 2, 'ChordPro [G]palabra sigue funcionando');
/* Fase 5: acompañamiento */
const K5 = (i, minor=false) => ({i, minor});
const PR = id => E.PROGRESSIONS.find(p => p.id === id);
eq(E.progressionIn(PR('pop'), K5(0)).chords, ['C','G','Am','F'], 'C – G – Am – F (ejemplo de la especificación)');
eq(E.progressionIn(PR('pop'), K5(7)).chords, ['G','D','Em','C'], 'G – D – Em – C (ejemplo de la especificación)');
eq(E.progressionIn(PR('mpop'), K5(4,true)).chords, ['Em','C','G','D'], 'Em – C – G – D (ejemplo de la especificación)');
eq(E.progressionIn(PR('mpop'), K5(2,true)).chords, ['Dm','Bb','F','C'], 'Dm – B♭ – F – C (escribe Bb, no A#)');
eq(E.progressionIn(PR('mpop'), K5(9,true)).chords, ['Am','F','C','G'], 'Am – F – C – G (ejemplo de la especificación)');
eq(E.progressionIn(PR('bajo7'), K5(0)).roman, ['I','V/B','vi','IV'], 'grados en números romanos con bajo');
eq(E.progressionIn(PR('iiVI'), K5(3)).chords, ['Fm7','Bb7','Ebmaj7','Ebmaj7'], 'ii–V–I en Eb escrito con bemoles');
eq(E.romanOf('Bm7b5', K5(0)), 'viiø', 'semidisminuido');
eq(E.romanOf('Bb', K5(0)), 'bVII', 'acorde prestado bVII');
eq(E.romanOf('E', K5(9,true)), 'V', 'V mayor en menor');
eq(E.chordTones('Am9').tones, [0,3,7,10,2], 'notas de Am9');
const vl = E.voiceLead(['C','G/B','Am','F']);
eq(vl.every(v => v.rh.length === 3 && v.rh[0] >= 60 && v.rh[2] <= 81), true, 'mano derecha: 3 notas en el registro medio');
eq(vl.slice(1).every((v, i) => v.rh.reduce((n, x, k) => n + Math.abs(x - vl[i].rh[k]), 0) <= 5), true, 'inversiones cercanas: los dedos casi no se mueven');
eq(vl.map(v => v.lh % 12), [0, 11, 9, 5], 'mano izquierda toca el bajo (B en G/B)');
eq(E.PROGRESSIONS.every(p => p.chords.split(' ').every(c => E.chordTones(c))), true, 'todas las progresiones usan acordes válidos');
for(const k of [0,1,3,6,8,11]) for(const pr of E.PROGRESSIONS){ const r = E.progressionIn(pr, K5(k, pr.minor)); if(r.chords.some(c => /E#|B#|Cb|Fb|##|bb/.test(c))) { fail++; console.log('FALLA escritura rara', pr.id, k, r.chords); } }
console.log('ok   ninguna progresión en ningún tono usa escrituras raras (E#, Cb…)');
/* Fase 4: transiciones */
const K = (i, minor=false) => ({i, minor});
const to = (a, b) => E.transitionOptions(a, b).map(o => [o.id, o.chords.join(' ')]);
eq(E.keyRelation(K(4,true), K(7)).label, 'Relativa', 'Em y G son relativas');
eq(E.keyRelation(K(2), K(7)).label, 'Tono vecino', 'D y G son vecinos');
eq(E.keyRelation(K(0), K(6)).label, 'Tono lejano', 'C y F# son lejanos');
eq(to(K(4,true), K(7)), [['directo',''],['v7','D7'],['iiv','Am7 D7'],['sus','Dsus4 D']], 'Em → G: directo (relativas) y alternativas');
eq(to(K(0), K(2)), [['subida','A7'],['iiv','Em7 A7'],['sus','Asus4 A'],['pivote','G A7']], 'C → D: subida de un tono, con acorde puente G');
eq(to(K(2), K(7))[0], ['directo',''], 'D → G: directo por ser vecinos');
eq(to(K(2), K(7)).find(o => o[0] === 'pivote'), ['pivote','Em D7'], 'D → G: Em es el acorde puente');
eq(to(K(9,true), K(2,true)).find(o => o[0] === 'iiv'), ['iiv','Em7b5 A7'], 'Am → Dm: ii–V menor (Em7b5 → A7)');
eq(to(K(3), K(8)).find(o => o[0] === 'v7'), ['v7','Eb7'], 'Eb → Ab: escribe Eb7 (no D#7)');
eq(to(K(7), K(7)).map(o => o[0]), ['directo','sus'], 'mismo tono: directo o suspensión, sin inventar modulaciones');
eq(E.rankByKey(K(7), [{title:'Lejos', key:K(1)}, {title:'Vecina', key:K(2)}, {title:'Relativa', key:K(4,true)}, {title:'Sin tono', key:null}]).map(r => r.song.title), ['Relativa','Vecina','Lejos'], 'ordena canciones por cercanía de tono');
/* Escritura de acordes según la tonalidad */
const Dm = {i:2, minor:true}, Ck = {i:0, minor:false};
const sp = (c, k) => Music.transposeSym(c, 0, false, true, k);
eq(['Dm','A#','F','C','A#maj7','C/A#'].map(c => sp(c, Dm)), ['Dm','Bb','F','C','Bbmaj7','C/Bb'], 'en Dm, A# se escribe Bb');
eq(['C','Bb','Gb/F#'.split('/')[0],'D/F#','A#','Ab','Eb'].map(c => sp(c, Ck)), ['C','Bb','F#','D/F#','Bb','Ab','Eb'], 'en C: Bb, Ab y Eb se quedan; F# se queda');
eq(['D#m','A#','Gb'].map(c => sp(c, {i:4, minor:false})), ['D#m','A#','F#'], 'en E mayor: D#m, A# y F# (sostenidos)');
eq(['Cb','Fb','B','E'].map(c => sp(c, {i:3, minor:false})), ['B','E','B','E'], 'nunca escribe Cb ni Fb');
eq(Music.transposeSym('Bb', 2, false, false, {i:2, minor:false}), 'C', 'al transportar de C a D, Bb pasa a C');
eq(Music.transposeSym('Eb', 2, false, false, {i:4, minor:false}), 'F', 'al transportar a E, Eb pasa a F (no E#)');
const rs = E.respellSections(E.parseSongText('Dm      A#     F    C\nletra de prueba aquí\nA#m7   Gm', {bodyOnly:true}).sections, Dm);
eq(rs.changes, [{from:'A#', to:'Bb', n:1}, {from:'A#m7', to:'Bbm7', n:1}], 'lista lo que corrigió');
eq(rs.sections[0].lines[0].chords.map(c => [c.raw, c.pos]), [['Dm',0],['Bb',8],['F',15],['C',20]], 'corrige sin mover los acordes de lugar');
eq(E.respellSections(E.parseSongText('C  G  Am  F', {bodyOnly:true}).sections, Ck).changes, [], 'si todo está bien escrito no cambia nada');
const imp = E.parseSongText('Tono: Dm\nDm   A#\nletra', {});
eq(imp.sections[0].lines[0].chords.map(c => c.raw), ['Dm','A#'], 'leer el documento no cambia nada por sí solo (la corrección se hace al importar y se avisa)');
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
