<h1>Домашнее задание №3</h1>

<h2>Задача</h2>
<p>Разработать сервис генерации вотермарков</p>
<h2>Результат</h2>
<p><a href="http://acherepov.ru/projects/wmapp/">http://acherepov.ru/projects/wmapp/</a></p>

<h2>Рабочая группа</h2>
<ul>
  <li>Черепов Антон (<a href="https://github.com/chekit/">chekit</a>)</li>
  <li>Николай Журавлёв (<a href="https://github.com/verbaux">verbaux</a>)</li>
  <li>Гранев Кирилл (<a href="https://github.com/mustang85">mustang85</a>)</li>
</ul>
<h3>Роли</h3>
<dl>
  <dt><code>Вёрстка</code><dt>
  <dd>Николай Журавлёв, Гранев Кирилл, Черепов Антон</dd>
  <dt><code>JS</code><dt>
  <dd>Черепов Антон, Гранев Кирилл</dd>
  <dt><code>PHP</code><dt>
  <dd>Черепов Антон</dd>
</dl>
<h2>Структура проекта</h2>
<h3>Директории</h3>
<p>
<em><code>app/</code></em>- директория разработки проекта<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ <code>sass/</code>- все стили (используется препроцессор Sass)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>base/</code> (базовые стили, без классов)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>layout/</code> (стили, касающиеся, структуры макета)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>modules/</code> (стили, касающиеся всех элементов, блоков макета дизайна)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>tools/</code> (все необходимые данные: переменный mixins, placeholders, functions)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>styles.scss</code> - файл, где собираются все стили вместе<sup>*</sup><br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;<code>|_ jade/</code>- разметка макета с использованием препроцессора jade<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>includes/</code> - head и body<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>mixins/</code> - необходимые миксины<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>partials/</code> - контент страницы<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>vars/</code> - переменные<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_<code>index.jade</code> - собираем все части страницы вместе<br />
<br />
<em><code>gulp</code>/</em>-<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ <code>build.gulp.js</code> - основные команды для разбора jade, sass, создания директории dist, вставки необходимых компонентов bower<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ <code>watch.gulp.js</code> - следим за изменениями в проекте<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ <code>wiredep.gulp.js</code> - вставляем bower зависимости<br />
&nbsp;&nbsp;&nbsp;&nbsp;|_ <code>server.gulp.js</code> - запуск локального сервера<br />
<br />
<em><code>serv</code>/</em>- Файлы для локальной работы на WampServer<br />
<code>.bowerrc</code> - указываем, куда устанавливаются bower пакеты<br />
<code>.gitignore</code> - исключаем папки с установкой bower, npm модулей<br />
<code>.jshint</code> - для проверки js, исключаем ошибки при использовании $, jQuery<br />
<code>gulpfile.js</code> - основной файл, по дефолту запускает build<br />
<code>package.json</code> - все необходимые пакеты для gulp<br />
<code>README.md</code> - описание проекта<br />
<code>.ccscomb.json</code> - описание сортировки правил CSS для модуля CSSComb (сортирует по <a href="https://code.google.com/p/zen-coding/downloads/detail?name=ZenCodingCheatSheet.pdf">ZEN</a>)
</p>
<blockquote>
	<p><sup>*</sup> &mdash; в самом styles подключаются только _index.scss каждой папки, в которых, соответственно, подключены соответствующие части. В <em>base/</em> уже присутствует reset.scss</p>
</blockquote>
<h3>Инициализация проекта</h3>
<p>Для начала работы необходимо склонировать себе репозиторий, далее в консоли выполнить <code>npm install</code>, далее <code>bower install</code></p>
<p>Для работы над проектом в консоли набираем <code>gulp server</code> (выполняется build, подключается watch и запускается browser-sync), просто "сбилдить проект" <code>gulp</code></p> 
<h3>Ссылка на методичку</h3>
<p><a href="https://docs.google.com/document/d/1ukji85Sgfkp9Wn9dSSa6oiCoWXsjTYBBNm_Xox11zto/edit?usp=sharing">Схема взаимодействия на GitHub</a> (документ Google Docs).</p>

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/chekit/loftschool_hw3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
