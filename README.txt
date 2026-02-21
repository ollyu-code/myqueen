BIRTHDAY SITE – Quick start

1. Put your files in the "media" folder:
   - photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg  (hero + Your Moments gallery)
   - video1.mp4 … video6.mp4
   - music.mp3

2. If images/videos don’t show when you double‑click index.html:
   Browsers often block local files when you open the page as file://.
   Run a local server from this folder instead:

   Option A – Node/npx (port 4000):
     npx serve . -p 4000
   Then open: http://localhost:4000

   Option B – Python 3 (port 4000):
     python -m http.server 4000
   Then open: http://localhost:4000

   Fixing 404: The URL must point to the page that lives NEXT TO the "media" folder. If you started the server from a parent folder (e.g. Desktop), open http://localhost:4000/sandra/ (or whatever the folder name is) so the address bar shows .../sandra/ or .../sandra/index.html. Then media will load. If you started the server from inside the "sandra" folder, open http://localhost:4000

3. Edit script.js to set the poem (CONFIG.poemLines) and birthday (CONFIG.birthdayMonth / birthdayDay) if needed.
