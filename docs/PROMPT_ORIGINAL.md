PROMPT MAESTRO: DESARROLLO DE UNA APLICACIÓN MUSICAL INTELIGENTE PARA IGLESIAS

 1.⁠ ⁠ROL Y OBJETIVO DEL PROYECTO

Actúa como un equipo multidisciplinario de expertos en desarrollo de software, arquitectura de aplicaciones, inteligencia artificial, teoría musical, armonía, procesamiento de documentos, diseño UX/UI y herramientas digitales para músicos en vivo.

Quiero desarrollar una aplicación musical inteligente diseñada especialmente para tecladistas, pianistas, músicos y equipos de alabanza y adoración de iglesias cristianas.

La aplicación debe resolver problemas reales que ocurren durante los cultos, ensayos, momentos de adoración, ministración y prédicas.

Debe ayudar al músico a encontrar canciones rápidamente, recordar canciones mediante frases de sus letras, visualizar acordes, transportar canciones a cualquier tonalidad, descubrir canciones que puedan conectarse musicalmente y encontrar progresiones para acompañar momentos de prédica y oración.

El objetivo es que el músico pueda reaccionar con rapidez cuando el director de alabanza cambia una canción inesperadamente, solicita bajar o subir la tonalidad o necesita mantener un acompañamiento musical mientras habla o ministra.

No quiero una aplicación que funcione únicamente como un lector de PDF. Quiero que los documentos importados se conviertan en una biblioteca musical organizada, editable, buscable y conectada con herramientas reales de teoría musical.

La aplicación debe ser moderna, profesional, intuitiva y fácil de utilizar mientras se toca un instrumento.

 2.⁠ ⁠PÚBLICO OBJETIVO

La aplicación está dirigida principalmente a:

•⁠  ⁠Tecladistas y pianistas de iglesias.
•⁠  ⁠Músicos que acompañan equipos de alabanza y adoración.
•⁠  ⁠Directores musicales y líderes de alabanza.
•⁠  ⁠Músicos que necesitan transportar canciones rápidamente.
•⁠  ⁠Personas que conocen acordes básicos, pero necesitan ayuda con progresiones, inversiones y transiciones.
•⁠  ⁠Músicos que acompañan prédicas, oraciones, ministraciones y momentos espontáneos.
•⁠  ⁠Equipos musicales que desean preparar y organizar las canciones de cada servicio.

La experiencia debe ser accesible para principiantes, sin limitar las herramientas disponibles para músicos avanzados.

 3.⁠ ⁠PRINCIPIOS FUNDAMENTALES DE LA APLICACIÓN

La aplicación debe cumplir cinco principios:

 1.⁠ ⁠Rapidez: encontrar una canción y cambiar su tonalidad debe requerir la menor cantidad posible de pasos.
 2.⁠ ⁠Precisión: los acordes reconocidos, las transposiciones y las recomendaciones musicales deben ser verificables y editables.
 3.⁠ ⁠Control del músico: las sugerencias automáticas nunca deben impedir que el usuario elija su propia solución musical.
 4.⁠ ⁠Funcionamiento sin conexión: las funciones principales deben trabajar sin internet una vez que los documentos y datos necesarios estén guardados en el dispositivo.
 5.⁠ ⁠Conservación de los originales: las transposiciones y ediciones nunca deben sobrescribir los documentos fuente.

 4.⁠ ⁠BIBLIOTECA MUSICAL INTELIGENTE

Crear una biblioteca central en la que el usuario pueda importar, guardar, organizar, editar y consultar todas sus canciones.

La aplicación debe permitir importar:

•⁠  ⁠PDF digitales con texto seleccionable.
•⁠  ⁠PDF escaneados que contengan páginas en forma de imagen.
•⁠  ⁠Documentos Microsoft Word en formato .docx.
•⁠  ⁠Archivos con letras y acordes.
•⁠  ⁠Documentos que contengan letras, acordes, diagramas o combinaciones de estos elementos.

Cada documento importado debe procesarse y convertirse, cuando sea posible, en una canción estructurada dentro de la biblioteca.

La aplicación debe intentar identificar automáticamente:

•⁠  ⁠Título de la canción.
•⁠  ⁠Artista o intérprete.
•⁠  ⁠Tonalidad original.
•⁠  ⁠Acordes musicales.
•⁠  ⁠Letras.
•⁠  ⁠Versos.
•⁠  ⁠Coros.
•⁠  ⁠Puentes.
•⁠  ⁠Introducciones.
•⁠  ⁠Interludios.
•⁠  ⁠Finales.
•⁠  ⁠Repeticiones y otras secciones identificables.

No asumir que todos los documentos tendrán una estructura uniforme.

Si no es posible identificar un dato con suficiente confianza, solicitar la revisión del usuario en lugar de inventar información.

Cada canción debe tener un registro independiente del archivo original. Conservar el PDF o Word original para que el usuario pueda consultarlo cuando lo necesite.

Permitir corregir manualmente los títulos, las letras, los acordes, las tonalidades y las secciones.

Incluir funciones para:

•⁠  ⁠Crear carpetas o categorías.
•⁠  ⁠Añadir etiquetas personalizadas.
•⁠  ⁠Marcar canciones como favoritas.
•⁠  ⁠Consultar canciones recientes.
•⁠  ⁠Ordenar por título, artista o tonalidad.
•⁠  ⁠Detectar posibles duplicados.
•⁠  ⁠Editar los metadatos de una canción.
•⁠  ⁠Eliminar canciones de la biblioteca sin alterar archivos externos.
•⁠  ⁠Ver el documento original cuando sea necesario.

La biblioteca debe admitir un número creciente de canciones sin que la búsqueda se vuelva lenta.

 5.⁠ ⁠PROCESAMIENTO DE PDF Y WORD

Implementar un sistema de procesamiento de documentos con diferentes métodos según el archivo importado.

Para PDF digitales

Extraer directamente el texto cuando esté disponible, intentando conservar el orden de las letras, los acordes y las secciones.

Para PDF escaneados

Utilizar reconocimiento óptico de caracteres (OCR) para convertir las imágenes en texto editable.

Para documentos Word

Extraer los párrafos, las letras, los acordes y los encabezados respetando, cuando sea posible, la estructura original.

Revisión del reconocimiento

Después del procesamiento, mostrar una pantalla de revisión donde el usuario pueda confirmar o corregir:

•⁠  ⁠El título.
•⁠  ⁠La tonalidad.
•⁠  ⁠Los acordes.
•⁠  ⁠La letra.
•⁠  ⁠La ubicación de los acordes.
•⁠  ⁠Las secciones de la canción.

Diferenciar claramente los datos reconocidos con alta confianza de aquellos que requieren revisión.

No considerar que todo texto entre corchetes o paréntesis sea necesariamente un acorde. Validar las notas y los símbolos según las reglas musicales.

Cuando un documento contenga acordes encima de determinadas palabras, conservar la asociación entre el acorde y su posición musical para que la transposición no desorganice la letra.

Guardar la versión original y una representación musical estructurada e independiente.

 6.⁠ ⁠BÚSQUEDA INTELIGENTE POR TÍTULO, LETRAS Y FRASES

Esta es una de las funciones principales de la aplicación.

El usuario no debe recordar el título completo de una canción para encontrarla.

Debe poder buscar utilizando:

•⁠  ⁠El título completo.
•⁠  ⁠Una parte del título.
•⁠  ⁠El nombre del artista.
•⁠  ⁠Una palabra de la letra.
•⁠  ⁠Una frase del verso.
•⁠  ⁠Una frase del coro.
•⁠  ⁠Una frase del puente.
•⁠  ⁠Un fragmento que recuerde de una canción.
•⁠  ⁠Una tonalidad.
•⁠  ⁠Un acorde.
•⁠  ⁠Una combinación de criterios.

Ejemplo:

El usuario recuerda una frase del coro, pero no recuerda cómo se llama la canción. Escribe esa frase en el buscador y la aplicación presenta las canciones de su biblioteca que contienen esas palabras.

El buscador debe incluir:

•⁠  ⁠Búsqueda por coincidencia exacta.
•⁠  ⁠Búsqueda por frases parciales.
•⁠  ⁠Búsqueda por palabras individuales.
•⁠  ⁠Tolerancia a errores de escritura.
•⁠  ⁠Normalización de mayúsculas, minúsculas y acentos.
•⁠  ⁠Resultados ordenados por relevancia.
•⁠  ⁠Identificación de la sección donde aparece la coincidencia.
•⁠  ⁠Acceso inmediato a la canción encontrada.

Si existen varias canciones con frases parecidas, mostrar todas las coincidencias relevantes y permitir compararlas.

La búsqueda debe examinar el contenido musical importado, no solamente los títulos de los documentos.

Implementar un índice local para que la búsqueda funcione sin internet y sea rápida incluso con una biblioteca grande.

Si el texto de una canción no se pudo extraer correctamente, mostrar que esa canción necesita revisión en lugar de asumir que está completamente indexada.

En una fase futura, permitir búsqueda semántica para encontrar frases con significado parecido aunque no contengan exactamente las mismas palabras. Esta función debe distinguirse de la búsqueda textual y no debe inventar letras ni atribuir frases incorrectamente.

La búsqueda externa de canciones, si se incorpora en el futuro, debe ser opcional y separada de la biblioteca personal.

 7.⁠ ⁠SISTEMA MUSICAL Y NOTACIÓN DE ACORDES

Utilizar la notación americana como formato principal.

Notas:

C, C#, D, D#, E, F, F#, G, G#, A, A#, B.

Permitir también la escritura con bemoles cuando corresponda:

Db, Eb, Gb, Ab, Bb.

Acordes mayores y menores:

C, D, E, F, G, A, B.

Cm, Dm, Em, Fm, Gm, Am, Bm.

También reconocer, cuando sea posible:

•⁠  ⁠Acordes disminuidos y aumentados.
•⁠  ⁠Acordes de séptima.
•⁠  ⁠Acordes maj7.
•⁠  ⁠Acordes sus2 y sus4.
•⁠  ⁠Acordes add9.
•⁠  ⁠Acordes de novena y otras extensiones.
•⁠  ⁠Inversiones.
•⁠  ⁠Acordes con bajo alternativo.
•⁠  ⁠Progresiones que utilizan números romanos.
•⁠  ⁠Símbolos habituales de música contemporánea y de adoración.

Ejemplos:

Cmaj7, Dm7, G7, Asus4, G/B, F#m7, B♭, E♭maj7.

Crear un motor musical independiente de la interfaz visual. Este motor debe ser responsable de interpretar, validar, transponer y analizar acordes.

No modificar los símbolos de un acorde si la aplicación no ha identificado correctamente su estructura.

Permitir corregir acordes individualmente.

Cuando se trate de acordes ambiguos, mostrar una advertencia y permitir que el usuario confirme su interpretación.

 8.⁠ ⁠TRANSPOSICIÓN COMPLETA A CUALQUIER TONALIDAD

Esta es otra de las funciones más importantes.

El usuario debe poder transportar una canción completa a cualquier tonalidad sin calcular manualmente los acordes.

Incluir un selector visual con las 12 notas cromáticas y permitir elegir tonalidades mayores o menores.

El usuario debe poder:

•⁠  ⁠Elegir la tonalidad de destino.
•⁠  ⁠Subir un semitono.
•⁠  ⁠Bajar un semitono.
•⁠  ⁠Subir un tono completo.
•⁠  ⁠Bajar un tono completo.
•⁠  ⁠Transportar la canción a una tonalidad específica.
•⁠  ⁠Cambiar entre escrituras con sostenidos y bemoles.
•⁠  ⁠Volver a la tonalidad original.
•⁠  ⁠Guardar una tonalidad diferente para cada servicio.

Ejemplo práctico:

La canción está en D mayor.

Durante el culto, la directora dice: “Bájenla un tono”.

El músico selecciona C mayor y la aplicación actualiza inmediatamente todos los acordes reconocidos.

Ejemplo:

D pasa a C.

G pasa a F.

A pasa a G.

Bm pasa a Am.

Em pasa a Dm.

Otro ejemplo:

La canción está en Em y el músico quiere tocarla en Gm. La aplicación debe transponer todos los acordes y conservar sus cualidades musicales.

La transposición debe respetar, cuando sea posible:

•⁠  ⁠La calidad mayor o menor.
•⁠  ⁠Las séptimas y extensiones.
•⁠  ⁠Las inversiones.
•⁠  ⁠Los bajos alternativos.
•⁠  ⁠Las relaciones armónicas.
•⁠  ⁠La escritura apropiada de las notas.

Las letras no deben cambiar al transportar una canción. Solo deben actualizarse los acordes y la información musical que dependa de la tonalidad.

El archivo original debe permanecer intacto.

La tonalidad original y la tonalidad actual deben identificarse claramente.

Permitir guardar versiones de interpretación para servicios específicos sin duplicar innecesariamente el documento original.

 9.⁠ ⁠FILTRO POR TONALIDAD PARA TODA LA BIBLIOTECA

Crear un filtro visible y fácil de utilizar que permita mostrar todas las canciones de una tonalidad determinada.

El usuario debe poder seleccionar una nota como:

C, D, E, F, G, A o B, así como sus alternativas cromáticas.

Debe ser posible filtrar por:

•⁠  ⁠Tonalidad mayor.
•⁠  ⁠Tonalidad menor.
•⁠  ⁠Todas las tonalidades.
•⁠  ⁠Tonalidad original.
•⁠  ⁠Tonalidad asignada para un servicio.
•⁠  ⁠Canciones que puedan transportarse a una tonalidad determinada.

El filtro debe mostrar todas las canciones de la biblioteca que cumplan los criterios seleccionados.

Ejemplo:

El músico selecciona G mayor.

La aplicación muestra todas las canciones cuya tonalidad original o tonalidad asignada sea G mayor, según el filtro activo.

El músico selecciona E menor.

La aplicación muestra las canciones que correspondan a esa tonalidad.

Permitir elegir varias tonalidades para comparar canciones.

Incluir filtros combinados por artista, título, favoritos, frases de letras y acordes.

Diferenciar claramente la tonalidad original de la tonalidad de interpretación. No clasificar una canción como si su documento original estuviera en una tonalidad diferente solamente porque el usuario la transportó.

Ofrecer una opción para mostrar canciones que originalmente están en otras tonalidades, pero que pueden transportarse a la tonalidad seleccionada.

La interfaz debe indicar cuándo se está mostrando la tonalidad original y cuándo se está mostrando una tonalidad asignada o propuesta.

10.⁠ ⁠CONEXIÓN MANUAL ENTRE CANCIONES

Crear una herramienta que permita al usuario explorar manualmente su biblioteca para encontrar canciones que pueda conectar.

El músico debe poder seleccionar una tonalidad y consultar todas las canciones disponibles en ella.

Después debe poder elegir dos o más canciones y organizarlas en una secuencia.

Para cada canción seleccionada, mostrar:

•⁠  ⁠Título.
•⁠  ⁠Tonalidad original.
•⁠  ⁠Tonalidad de interpretación.
•⁠  ⁠Acordes iniciales.
•⁠  ⁠Acordes finales.
•⁠  ⁠Progresiones reconocidas.
•⁠  ⁠Secciones relevantes.
•⁠  ⁠Notas personales del músico.

Permitir cambiar el orden de las canciones y asignar tonalidades individuales.

El usuario debe poder seleccionar canciones de tonalidades diferentes y solicitar que se transporten a una tonalidad común.

Ejemplo:

El músico desea conectar tres canciones durante la adoración.

Selecciona las canciones desde la biblioteca, revisa sus tonalidades y elige la tonalidad final de interpretación de cada una.

La aplicación muestra los acordes finales e iniciales y ayuda a planificar las conexiones.

No limitar la búsqueda manual a canciones que originalmente compartan tonalidad. Permitir explorar todas las canciones y mostrar cuáles pueden adaptarse mediante transposición.

El objetivo es que el usuario tenga libertad para tomar decisiones musicales, sin depender de recomendaciones automáticas.

11.⁠ ⁠ASISTENTE AUTOMÁTICO DE TRANSICIONES

Crear un asistente que recomiende canciones y progresiones para conectar una canción con otra.

El usuario debe poder:

•⁠  ⁠Elegir la canción actual.
•⁠  ⁠Seleccionar una canción de destino.
•⁠  ⁠Solicitar recomendaciones de canciones compatibles.
•⁠  ⁠Consultar varias alternativas de transición.
•⁠  ⁠Elegir una tonalidad común cuando sea útil.
•⁠  ⁠Ver los acordes de salida, los acordes intermedios y los acordes de entrada.

El sistema debe analizar:

•⁠  ⁠Tonalidad.
•⁠  ⁠Acordes finales de la canción actual.
•⁠  ⁠Acordes iniciales de la siguiente canción.
•⁠  ⁠Progresiones reconocidas.
•⁠  ⁠Estructura musical.
•⁠  ⁠Relaciones armónicas.
•⁠  ⁠Cambios de tonalidad.
•⁠  ⁠Posibilidades de transposición.
•⁠  ⁠Información disponible y nivel de confianza del análisis.

Ejemplo de interfaz:

Canción actual: Em.

Canción de destino: G.

La aplicación analiza los acordes disponibles y sugiere una transición apropiada para las dos canciones.

Debe mostrar:

 1.⁠ ⁠El acorde o progresión para cerrar la canción actual.
 2.⁠ ⁠Una progresión intermedia propuesta.
 3.⁠ ⁠El acorde o progresión para entrar en la siguiente canción.
 4.⁠ ⁠Una explicación sencilla de por qué puede funcionar la transición.
 5.⁠ ⁠Otras alternativas para que el músico pueda elegir.

No asumir que compartir tonalidad significa que dos canciones se conectan automáticamente de manera musical.

Tampoco descartar canciones de tonalidades diferentes si existe una transición viable.

Si faltan acordes iniciales, finales o información armónica, indicar que la sugerencia es provisional.

Las recomendaciones deben poder editarse, probarse y descartarse sin modificar las canciones originales.

En el futuro, considerar una vista de piano que muestre las notas de los acordes sugeridos.

12.⁠ ⁠MODO EN VIVO

Crear un modo especial llamado “Modo en vivo” o “Live Mode”.

Debe estar diseñado para músicos que utilizan un teléfono o una tableta mientras tocan.

La pantalla debe ser minimalista, legible y rápida.

Incluir:

•⁠  ⁠Letras y acordes con tamaño ajustable.
•⁠  ⁠Acordes visualmente diferenciados de las letras.
•⁠  ⁠Desplazamiento vertical cómodo.
•⁠  ⁠Selector de tonalidad accesible en todo momento.
•⁠  ⁠Botones grandes para subir o bajar la tonalidad.
•⁠  ⁠Acceso rápido al buscador.
•⁠  ⁠Navegación entre canciones.
•⁠  ⁠Acceso a canciones recientes.
•⁠  ⁠Listas preparadas para cada culto.
•⁠  ⁠Posibilidad de volver a la canción anterior.
•⁠  ⁠Modo oscuro.
•⁠  ⁠Prevención de cambios accidentales.
•⁠  ⁠Conservación de la posición actual dentro de la letra al cambiar de tonalidad.

Si la directora solicita cambiar de tonalidad mientras el músico está tocando, el cambio debe poder realizarse con pocos toques y sin abandonar la pantalla actual.

No recargar la pantalla con controles innecesarios.

Las funciones esenciales deben funcionar sin conexión una vez descargada o importada la información necesaria.

13.⁠ ⁠ACOMPAÑAMIENTO PARA PRÉDICAS, ORACIONES Y MINISTRACIÓN

Crear una sección independiente llamada “Acompañamiento” o “Prédica y Ministración”.

Su propósito es ayudar al pianista a improvisar acompañamientos armónicos mientras alguien predica, ora, reflexiona o ministra.

La herramienta debe servir tanto a principiantes como a músicos con experiencia.

Permitir seleccionar:

Tipo de momento

•⁠  ⁠Prédica hablada.
•⁠  ⁠Oración.
•⁠  ⁠Reflexión.
•⁠  ⁠Ministración.
•⁠  ⁠Clamor.
•⁠  ⁠Intercesión.
•⁠  ⁠Adoración espontánea.
•⁠  ⁠Celebración.
•⁠  ⁠Momento suave o contemplativo.

Nivel musical

•⁠  ⁠Básico.
•⁠  ⁠Intermedio.
•⁠  ⁠Avanzado.

Estilo de acompañamiento

•⁠  ⁠Suave y ambiental.
•⁠  ⁠Sostenido y contemplativo.
•⁠  ⁠Arpegios.
•⁠  ⁠Progresiones con movimiento.
•⁠  ⁠Acordes con inversiones.
•⁠  ⁠Acompañamiento rítmico.
•⁠  ⁠Progresiones con tensiones y extensiones.

Tonalidad

Permitir seleccionar cualquiera de las 12 tonalidades cromáticas en modo mayor o menor.

Progresiones sugeridas

Incluir una biblioteca inicial de progresiones musicales, por ejemplo:

C – G – Am – F.

Am – F – C – G.

Em – C – G – D.

Dm – B♭ – F – C.

G – D – Em – C.

Estas progresiones son ejemplos de partida y no deben etiquetarse como universalmente adecuadas para un estado emocional o espiritual específico.

Cada progresión debe mostrar:

•⁠  ⁠Nombre o descripción.
•⁠  ⁠Tonalidad.
•⁠  ⁠Acordes.
•⁠  ⁠Función armónica cuando sea útil.
•⁠  ⁠Inversiones recomendadas.
•⁠  ⁠Opciones para mano izquierda y mano derecha.
•⁠  ⁠Formas de variar el acompañamiento.
•⁠  ⁠Alternativas para evitar repetir siempre el mismo patrón.
•⁠  ⁠Botón para transportar la progresión a otra tonalidad.

Guía práctica de piano

Ofrecer explicaciones sencillas sobre cómo tocar las progresiones.

Por ejemplo:

•⁠  ⁠Mantener acordes suaves durante una parte hablada.
•⁠  ⁠Utilizar inversiones cercanas para que los cambios sean fluidos.
•⁠  ⁠Añadir notas de paso cuando resulten apropiadas.
•⁠  ⁠Reducir el movimiento cuando se necesita espacio para la voz.
•⁠  ⁠Aumentar gradualmente la intensidad cuando la música lo permita.
•⁠  ⁠Evitar cambios armónicos innecesarios que distraigan del mensaje.

No asumir que existe una progresión universal para cada momento. Presentar alternativas musicales que el usuario pueda adaptar según la situación.

En una fase posterior, permitir escuchar ejemplos MIDI generados a partir de las progresiones, cambiar el tempo y comparar diferentes patrones de acompañamiento.

14.⁠ ⁠PREPARACIÓN DE SERVICIOS Y LISTAS MUSICALES

Permitir crear listas de canciones para:

•⁠  ⁠Cultos regulares.
•⁠  ⁠Ensayos.
•⁠  ⁠Reuniones de jóvenes.
•⁠  ⁠Vigilias.
•⁠  ⁠Conferencias.
•⁠  ⁠Actividades especiales.
•⁠  ⁠Momentos de adoración espontánea.

Cada lista debe permitir:

•⁠  ⁠Añadir canciones de la biblioteca.
•⁠  ⁠Cambiar el orden.
•⁠  ⁠Asignar una tonalidad de interpretación a cada canción.
•⁠  ⁠Añadir notas personales.
•⁠  ⁠Marcar transiciones.
•⁠  ⁠Guardar versiones específicas del servicio.
•⁠  ⁠Consultar acordes iniciales y finales.
•⁠  ⁠Abrir la canción en el modo en vivo.
•⁠  ⁠Transportar canciones sin alterar la biblioteca original.

Si una canción se cambia de D a C para un culto específico, ese cambio debe guardarse en la lista del servicio, sin reemplazar la tonalidad original de la canción.

Permitir duplicar una lista para preparar un nuevo servicio sin volver a organizar todas las canciones.

15.⁠ ⁠FUNCIONES FUTURAS

Diseñar la arquitectura para que pueda ampliarse con:

Reconocimiento de canciones por audio

Explorar la posibilidad de identificar una canción mediante una grabación o el audio de una interpretación en vivo.

Esta función debe considerarse experimental, ya que voces, batería, instrumentos simultáneos, ruido y variaciones de interpretación pueden dificultar el reconocimiento.

No prometer identificación perfecta ni utilizarla como requisito del MVP.

Controles por voz

Permitir comandos como:

“Buscar canción”.

“Transportar a C”.

“Mostrar canciones en E menor”.

“Volver a la canción anterior”.

Diseñar primero la arquitectura para soportar esta función, pero no hacer que sea necesaria para el funcionamiento inicial.

Pedal Bluetooth

Explorar la compatibilidad futura con pedales Bluetooth para avanzar, retroceder o controlar determinadas funciones sin utilizar las manos.

Sincronización entre dispositivos

Permitir, en una fase posterior, sincronizar la biblioteca, los favoritos y las listas de servicio entre teléfonos y tabletas.

La sincronización debe ser opcional. No debe impedir el funcionamiento local.

Colaboración de equipos musicales

Considerar una función para compartir listas de canciones y tonalidades entre los integrantes del equipo de alabanza.

Los permisos deben permitir controlar quién puede editar y quién solamente puede consultar.

16.⁠ ⁠DISEÑO UX/UI

Crear una interfaz moderna, profesional y minimalista.

Debe sentirse como una herramienta musical especializada, no como una aplicación de documentos genérica.

Utilizar:

•⁠  ⁠Diseño adaptable a teléfonos y tabletas.
•⁠  ⁠Navegación intuitiva.
•⁠  ⁠Tipografía legible.
•⁠  ⁠Contraste suficiente para leer las letras y los acordes.
•⁠  ⁠Modo oscuro para los servicios.
•⁠  ⁠Modo claro para la preparación y organización.
•⁠  ⁠Botones grandes en el modo en vivo.
•⁠  ⁠Selectores musicales fáciles de utilizar.
•⁠  ⁠Transiciones de interfaz discretas.
•⁠  ⁠Mensajes claros cuando un archivo está procesándose.
•⁠  ⁠Estados de error que permitan recuperarse sin perder información.

Diseñar primero estas pantallas:

 1.⁠ ⁠Inicio.
 2.⁠ ⁠Biblioteca musical.
 3.⁠ ⁠Buscador inteligente.
 4.⁠ ⁠Resultados de búsqueda por letras.
 5.⁠ ⁠Filtros por tonalidad.
 6.⁠ ⁠Importación de PDF y Word.
 7.⁠ ⁠Revisión de documentos procesados.
 8.⁠ ⁠Detalle y edición de una canción.
 9.⁠ ⁠Selector de tonalidad.
10.⁠ ⁠Vista de transposición.
11.⁠ ⁠Modo en vivo.
12.⁠ ⁠Preparación de servicios.
13.⁠ ⁠Conexión manual de canciones.
14.⁠ ⁠Asistente automático de transiciones.
15.⁠ ⁠Acompañamiento para prédicas.
16.⁠ ⁠Biblioteca de progresiones.
17.⁠ ⁠Ajustes y preferencias.

La pantalla de inicio debe dar acceso rápido a las funciones más importantes: buscar canciones, ver canciones por tonalidad, abrir el servicio actual y acceder al acompañamiento para prédicas.

17.⁠ ⁠ARQUITECTURA TÉCNICA

Proponer e implementar una arquitectura modular y mantenible.

Tecnologías preferidas:

•⁠  ⁠Flutter para desarrollar la aplicación móvil multiplataforma.
•⁠  ⁠SQLite para almacenar los datos localmente.
•⁠  ⁠Extracción de texto para PDF digitales.
•⁠  ⁠OCR para PDF escaneados.
•⁠  ⁠Procesamiento de documentos DOCX.
•⁠  ⁠Un motor musical independiente para acordes, transposición y análisis armónico.
•⁠  ⁠Indexación local para búsquedas rápidas.
•⁠  ⁠Una capa de almacenamiento que conserve los documentos originales.
•⁠  ⁠Sincronización en la nube opcional para futuras versiones.

Si la plataforma de desarrollo seleccionada no permite implementar Flutter directamente, explicar la alternativa técnica y conservar los requisitos funcionales.

La aplicación debe separar la interfaz visual de la lógica musical.

El motor musical no debe depender de botones ni de pantallas específicas, de manera que pueda probarse y reutilizarse.

Módulos técnicos

 1.⁠ ⁠Gestión de archivos.
 2.⁠ ⁠Importación y extracción de texto.
 3.⁠ ⁠OCR.
 4.⁠ ⁠Biblioteca musical.
 5.⁠ ⁠Búsqueda e indexación.
 6.⁠ ⁠Modelo de acordes.
 7.⁠ ⁠Motor de transposición.
 8.⁠ ⁠Filtros por tonalidad.
 9.⁠ ⁠Listas de servicio.
10.⁠ ⁠Modo en vivo.
11.⁠ ⁠Análisis de transiciones.
12.⁠ ⁠Asistente de acompañamiento.
13.⁠ ⁠Preferencias del usuario.
14.⁠ ⁠Sincronización futura.

18.⁠ ⁠MODELO DE DATOS

Crear modelos de datos que representen adecuadamente la información musical.

Songs

Guardar el identificador de la canción, título, artista, tonalidad original, metadatos y fecha de creación.

SourceFiles

Guardar la referencia al documento original, formato, ubicación, estado de procesamiento y errores detectados.

Sections

Representar versos, coros, puentes, introducciones, interludios y finales.

Lyrics

Guardar el texto de cada sección y conservar el orden de sus líneas.

Chords

Guardar el símbolo original, la interpretación musical, la posición dentro del texto, la sección y el nivel de confianza del reconocimiento.

SongVersions

Representar las versiones de interpretación y las tonalidades alternativas sin duplicar ni sobrescribir la fuente original.

Setlists

Representar los servicios y sus listas de canciones.

SetlistItems

Guardar el orden, la tonalidad asignada y las notas específicas de cada canción dentro del servicio.

Transitions

Guardar las canciones de origen y destino, los acordes de salida y entrada, las progresiones sugeridas y las decisiones del usuario.

AccompanimentPatterns

Guardar progresiones, tonalidades, inversiones, patrones de acompañamiento y ejemplos musicales.

UserPreferences

Guardar las preferencias de visualización, notación, búsqueda y configuración musical.

Diseñar las relaciones entre estas entidades de manera consistente, evitando duplicaciones innecesarias.

19.⁠ ⁠PRECISIÓN, PRIVACIDAD Y DERECHOS DE USO

Implementar validación de datos, manejo de errores y pruebas automatizadas.

No presentar como seguro un acorde que no se ha reconocido correctamente.

No inventar letras, tonalidades ni información sobre canciones.

Mantener las funciones básicas disponibles sin conexión.

Proteger los documentos importados y permitir que el usuario gestione sus propios archivos.

No enviar los documentos a servicios externos de procesamiento sin informar al usuario y establecer un mecanismo adecuado de consentimiento cuando corresponda.

Diseñar la aplicación para respetar los derechos de autor. El usuario debe poder importar y gestionar archivos que tenga derecho a utilizar. Si en el futuro se distribuyen letras o catálogos a otros usuarios, revisar las licencias y permisos necesarios.

20.⁠ ⁠PLAN DE DESARROLLO DEL MVP

Desarrollar la aplicación progresivamente y validar cada módulo antes de avanzar.

Fase 1: Biblioteca y documentos

•⁠  ⁠Crear la estructura técnica.
•⁠  ⁠Importar PDF y Word.
•⁠  ⁠Extraer texto y utilizar OCR cuando sea necesario.
•⁠  ⁠Revisar y editar canciones.
•⁠  ⁠Guardar la información localmente.
•⁠  ⁠Implementar la búsqueda por título y frases.
•⁠  ⁠Conservar los archivos originales.

Fase 2: Motor musical

•⁠  ⁠Implementar el modelo de acordes.
•⁠  ⁠Validar la interpretación de acordes.
•⁠  ⁠Implementar la transposición.
•⁠  ⁠Crear el selector de tonalidades.
•⁠  ⁠Añadir el filtro de biblioteca por tonalidad.
•⁠  ⁠Probar acordes mayores, menores, inversiones y extensiones reconocidas.

Fase 3: Modo en vivo

•⁠  ⁠Diseñar la pantalla de interpretación.
•⁠  ⁠Añadir controles de tonalidad.
•⁠  ⁠Mantener la posición de lectura.
•⁠  ⁠Implementar listas de servicio.
•⁠  ⁠Verificar el funcionamiento sin internet.

Fase 4: Conexión de canciones

•⁠  ⁠Implementar selección manual de canciones.
•⁠  ⁠Mostrar tonalidades y acordes iniciales y finales.
•⁠  ⁠Permitir transportar canciones a tonalidades comunes.
•⁠  ⁠Desarrollar recomendaciones automáticas.
•⁠  ⁠Mostrar progresiones sugeridas y alternativas.

Fase 5: Acompañamiento para prédicas

•⁠  ⁠Crear la biblioteca inicial de progresiones.
•⁠  ⁠Implementar filtros por tonalidad, nivel y tipo de acompañamiento.
•⁠  ⁠Mostrar acordes e inversiones.
•⁠  ⁠Añadir patrones de piano.
•⁠  ⁠Permitir transponer cualquier progresión.

Fase 6: Mejoras futuras

•⁠  ⁠Sincronización.
•⁠  ⁠Compartir listas.
•⁠  ⁠Controles por voz.
•⁠  ⁠Pedal Bluetooth.
•⁠  ⁠Reconocimiento de audio.
•⁠  ⁠Reproducción de ejemplos musicales.

21.⁠ ⁠PRUEBAS Y CRITERIOS DE ACEPTACIÓN

Antes de considerar terminada cada fase, comprobar lo siguiente:

•⁠  ⁠Se puede importar un PDF digital.
•⁠  ⁠Se puede importar un PDF escaneado y revisar el resultado del OCR.
•⁠  ⁠Se puede importar un DOCX.
•⁠  ⁠La búsqueda encuentra una canción por una frase de su coro.
•⁠  ⁠La búsqueda tolera errores razonables de escritura.
•⁠  ⁠El filtro por tonalidad muestra los resultados correctos.
•⁠  ⁠Las tonalidades originales se conservan después de transportar una canción.
•⁠  ⁠La transposición actualiza todos los acordes reconocidos.
•⁠  ⁠Los acordes desconocidos se identifican para revisión.
•⁠  ⁠El modo en vivo conserva la posición de lectura al cambiar la tonalidad.
•⁠  ⁠Las listas de servicio mantienen sus tonalidades específicas.
•⁠  ⁠La conexión manual permite escoger canciones libremente.
•⁠  ⁠Las sugerencias automáticas muestran sus acordes y no dependen únicamente de compartir tonalidad.
•⁠  ⁠Las progresiones de acompañamiento pueden transportarse a otras tonalidades.
•⁠  ⁠Las funciones básicas siguen disponibles sin conexión.
•⁠  ⁠Los errores de procesamiento no destruyen ni sobrescriben los archivos originales.

Crear pruebas unitarias para el motor musical, pruebas de integración para la importación de documentos y pruebas funcionales para los principales flujos de usuario.

22.⁠ ⁠INSTRUCCIONES FINALES PARA LA IA DE DESARROLLO

No desarrolles todo en una sola operación sin validar las partes.

Primero, presenta:

 1.⁠ ⁠La arquitectura técnica.
 2.⁠ ⁠La estructura de carpetas.
 3.⁠ ⁠El modelo de datos.
 4.⁠ ⁠Los flujos de usuario.
 5.⁠ ⁠El diseño inicial de las pantallas.
 6.⁠ ⁠El plan de implementación por fases.

Después, comienza a desarrollar la primera fase funcional.

No construyas únicamente una maqueta ni botones que no hagan nada.

Conecta cada pantalla con las funciones reales que le correspondan. No simules una importación, una búsqueda, una transposición ni una recomendación musical si esa función todavía no está implementada.

Si una función requiere un servicio externo, una biblioteca adicional o una decisión técnica que no está resuelta, identifica el requisito y explica las alternativas antes de implementarlo.

Prioriza la importación fiable de documentos, la búsqueda por letras, la transposición correcta y el filtro por tonalidad.

El resultado debe ser una aplicación musical útil para situaciones reales de adoración, diseñada para que un músico pueda encontrar, organizar, transportar y conectar canciones con rapidez, además de recibir apoyo práctico para acompañar prédicas y momentos espontáneos.

Comienza ahora por la arquitectura y el MVP, y desarrolla cada módulo de forma progresiva, funcional y verificable.