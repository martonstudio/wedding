# Wedding Invite — Sonya & Marton

Live site: https://martonstudio.github.io/wedding/  
Editor: https://martonstudio.github.io/wedding/editor.html

---

## How to edit the site

Open the editor URL above from any device. Edit text, upload a hero photo, switch languages to check each one. When you're happy, tap **Publish**.

The first time you tap Publish, the editor asks for an editor token. Paste yours (see below). The token is only kept while the browser tab is open — you'll need to paste it again next session.

After publishing, the site updates in about one minute.

---

## Getting an editor token (do this once)

1. Go to: https://github.com/settings/personal-access-tokens/new
2. **Token name:** something like "Sonya wedding editor"
3. **Expiration:** 90 days (you can generate a new one when it expires)
4. **Repository access:** Only select repositories → `martonstudio/wedding`
5. **Permissions:** Contents → Read and write (everything else stays None)
6. Click **Generate token** and copy it immediately — GitHub only shows it once
7. Paste it into the editor when prompted

When the token expires, generate a new one the same way and paste it next time you publish.

---

## When ready to announce

1. Open `index.html`, remove the line with `noindex,nofollow`, save and push — or ask Marton to do it
2. Share the URL: https://martonstudio.github.io/wedding/
3. Remove the "✦ Edit" link from the nav (same file, one line)
