# u02 portfolio

Live: [SKRIV LÄNKEN HÄR NÄR SIDAN ÄR PUBLICERAD]

Portfolion bygger vidare på min u01-portfolio. Nytt i u02: CV:t läses från en JSON-fil, projekten hämtas från GitHub API, det finns ljust/mörkt läge och ett språkfilter på projektsidan.

Namnet på sidan är `teddyyGO` och CV-datan i `data/cv.json` är platshållare, eftersom jag inte vill ha mina personuppgifter publikt.

Kör lokalt med Live Server (eller `python -m http.server`). `fetch` fungerar inte om man öppnar filen direkt med `file://`.

## Reflektion

**Datans väg genom ett GitHub-anrop**

I `js/projects.js` anropar `loadProjects()` `fetch` mot `https://api.github.com/users/teddyyGO/repos`. Först kollar jag `response.ok`, eftersom `fetch` inte kastar fel vid till exempel 403 när man har gjort för många anrop. Då kastar jag ett eget fel så att det hamnar i `catch`. Sedan gör `response.json()` om svaret till en array. Jag filtrerar bort forkar och mitt profilrepo, sparar resultatet i `allProjects` och skickar det till `showProjects()`. Den tömmer listan och skapar ett kort per repo med `createProjectCard()`. Jag sparar listan i en variabel så att filtret kan visa om den utan att fråga GitHub igen.

**JSON-fil eller API**

`data/cv.json` är min egen fil. Den ligger med på sidan, ändras bara när jag ändrar den och kan inte innehålla något jag inte själv har skrivit. Därför bygger `cv.js` HTML med en template string och `innerHTML`, vilket är lätt att läsa. GitHub-datan kommer utifrån: den kan vara långsam, saknas eller innehålla vad som helst i en beskrivning. Därför använder `projects.js` `createElement` och `textContent`, så att text från API:t aldrig tolkas som HTML. API:t har dessutom en gräns på 60 anrop i timmen utan inloggning, så felfallet är inte bara teoretiskt.

**DOM och events**

Filterknapparna har en `click`-lyssnare var. När man klickar sätts `aria-pressed="true"` på den valda knappen och `false` på de andra, och sedan anropas `showProjects()` med en filtrerad lista. Jag använde `aria-pressed` i stället för en egen klass, eftersom attributet både styr stilen i CSS (`.filter-button[aria-pressed="true"]`) och berättar för skärmläsare vilken knapp som är vald. Temaknappen fungerar på samma sätt.

**Kvalitet på genererad markup**

Projekten är en `ul` med `li` och ett `article` per repo, med `h2` under sidans `h1`. CV-posterna är `li` i en `ol` med `h3` under sektionernas `h2`, och datum ligger i `time` med `datetime`. Det som går att klicka på är `button` (filter, tema, meny) och det som leder någonstans är `a` (länk till repot). "View Code" har dold text med repots namn, så att man vet vilket projekt länken gäller när man listar länkar med skärmläsare. HTML:en validerades även efter att JavaScript hade kört, inte bara filerna.

**Temabyte**

Alla färger ligger som CSS-variabler i `:root` i `css/base.css`. Mörkt läge är bara en regel, `html.dark`, som skriver över variablerna. Resten av CSS:en behöver inte veta vilket tema som är på. `js/theme.js` laddas i `head` utan `defer`, så att klassen sätts innan sidan ritas och sidan inte blinkar vit. Valet sparas i `localStorage`, och första gången följer sidan systemets inställning med `prefers-color-scheme`. `--color-black` döptes om till `--color-text-strong`, eftersom den blir ljus i mörkt läge och namnet annars hade varit fel.

**Långsamt, fel och tomt**

Från början står det "Loading projects from GitHub..." i ett element med `role="status"`, så att skärmläsare också läser upp ändringen. `AbortSignal.timeout(8000)` avbryter anropet efter 8 sekunder om GitHub inte svarar, så att sidan inte står och laddar för evigt. Vid fel visas ett meddelande med en länk till min GitHub-profil, så att besökaren ändå kommer vidare. Är listan tom, eller ger filtret inga träffar, står det att det inte finns några projekt. Filterknapparna är dolda (`hidden`) tills projekten har laddats, så att man inte kan filtrera något som inte finns. Felet testades genom att låtsas att GitHub svarade 403, timeouten med ett anrop som aldrig svarade, och tomt läge genom att anropa `showProjects([])`.

**Tillgänglighet, testat**

- W3C-validatorn: 0 fel på alla fem HTML-filer, all CSS och den genererade HTML:en på about- och projektsidan.
- Inga fel i konsolen.
- Med Tab: skip link, logga, temaknapp, menyn, GitHub och filterknapparna i den ordning de syns, med synlig fokusram. Temaknappen flyttades så att den syns där den ligger i tabbordningen.
- Kontrast: alla texter på alla sidor klarar WCAG AA i både ljust och mörkt läge. Den rosa gradientfärgen klarade inte 4,5:1 i mörkt läge, så den gjordes ljusare.
- Mobil, 900px och desktop utan horisontell scroll.

[SKRIV SJÄLV: testade du något själv, till exempel med skärmläsare eller bara tangentbord?]

**Styrkor och svagheter**

Styrkor: alla tre datalägen syns på sidan, filtret och temat använder samma mönster med `aria-pressed`, och koden har engelska namn genomgående.

Svagheter: headern finns fortfarande kopierad i fem HTML-filer, så temaknappen fick läggas in fem gånger. `cv.js` kollar inte `response.ok` på samma sätt som `projects.js`. Menyn på mobil går inte att stänga med Escape.

**Det här skulle jag bygga om**

Jag skulle göra en gemensam funktion `loadJson(url)` som både `cv.js` och `projects.js` använder, med `response.ok` och timeout på ett ställe. Då hanteras fel likadant överallt och koden finns inte två gånger.

[SKRIV SJÄLV: vad var svårast för dig, och vad lärde du dig?]

**AI-verktyg**

[SKRIV SJÄLV: vad du använde AI till, vad du ändrade i det AI gav dig och hur du granskade det.]
