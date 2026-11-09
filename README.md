# u02 portfolio

Live: https://portfolio-production-70e8.up.railway.app

Min portfolio från u01, fast vidareutvecklad. Nytt i u02: CV:t laddas från en JSON-fil, projekten hämtas från GitHub API, det finns ljust/mörkt läge och ett språkfilter på projektsidan.

CV-datan i `data/cv.json` är påhittad, för jag vill inte ha mina riktiga uppgifter publikt.

Kör lokalt med Live Server eller `python -m http.server`. Om man öppnar filen direkt (`file://`) fungerar inte `fetch`.

## Reflektion

**GitHub-anropet**

`loadProjects()` i `js/projects.js` gör en `fetch` mot GitHub API. Först kollar jag `response.ok`, för `fetch` ger inget fel vid t.ex. 403. Sen gör jag om svaret till en array, tar bort forkar och skickar listan till `showProjects()`, som gör ett kort per repo. Listan sparas i `allProjects` så att filtret inte behöver fråga GitHub igen.

**JSON-fil eller API**

`cv.json` har jag skrivit själv, så där använder jag `innerHTML` med en template string. Datan från GitHub kan innehålla vad som helst, så där använder jag `createElement` och `textContent` så att inget tolkas som HTML.

**DOM och events**

Filterknapparna har varsin `click`-lyssnare. Den valda knappen får `aria-pressed="true"`, och sen visas en filtrerad lista. `aria-pressed` styr både stilen i CSS och vad skärmläsare säger. Temaknappen funkar på samma sätt.

**Markup**

Projekten ligger i en `ul` med ett `article` per repo, och CV-posterna i en `ol` med `time` för datumen. Knappar är `button` och länkar är `a`. "View Code" har dold text med repots namn, så att man vet vilken länk det är med skärmläsare.

**Temabyte**

Färgerna är CSS-variabler i `:root`, och `html.dark` skriver över dem. `theme.js` laddas i `head` så att sidan inte blinkar vit. Valet sparas i `localStorage`, och första gången följer sidan systemets inställning.

**Laddar, fel och tomt**

Medan projekten laddas står det "Loading projects from GitHub..." (med `role="status"`). Efter 8 sekunder avbryts anropet. Vid fel visas ett meddelande med länk till min GitHub, och om det inte finns några projekt står det det. Filterknapparna är dolda tills projekten har laddats.

**Tillgänglighet**

- 0 fel i W3C-validatorn, både på filerna och på HTML:en som JavaScript skapar.
- Inga fel i konsolen.
- Tabbordningen följer sidan och fokusramen syns.
- Kontrasten klarar WCAG AA i båda temana.
- Funkar på mobil, surfplatta och dator utan att man behöver scrolla i sidled.

Mobilmenyn gick först inte att stänga med Escape, men det har jag fixat nu. Jag har inte testat med en riktig skärmläsare.

**Styrkor och svagheter**

Bra: alla tre lägena (laddar, fel, tomt) finns, och filtret och temat funkar på samma sätt.

Mindre bra: headern är kopierad i fem HTML-filer, och `cv.js` och `projects.js` har nästan samma felhantering på två ställen.

**Det här skulle jag göra om**

En gemensam funktion `loadJson(url)` med `response.ok` och timeout, som båda filerna använder.

**Svårast och vad jag lärde mig**

Det svåraste var att förstå att `fetch` inte ger fel när servern svarar 404 eller 403. Jag glömde först att kolla `response.ok` i `cv.js` och fick lägga till det sen. Jag lärde mig också att `innerHTML` tolkar text som HTML, så för data utifrån ska man använda `textContent`.

**AI-verktyg**

Jag använde AI (Claude). Medan jag kodade lät jag AI ge förslag på kod, bland annat i JavaScript-filerna. Första versionen av reflektionen skrevs av AI, och sen ändrade jag den så att den stämmer med vad jag gjorde. I slutet använde jag det också för att publicera sidan på Railway, för git-hjälp (bland annat att ändra datumen på mina commits) och för att korta ner och förenkla den här README:n. Kod jag fick från AI testade jag i webbläsaren innan jag behöll den.
