# s-blacklist — documentation site

Bilingual (EN/ES) documentation website built with **[VitePress](https://vitepress.dev)** and
deployed to **GitHub Pages**. This folder is meant to be its own GitHub repo
(`https://github.com/Valgan21/S-blacklist`).

## Local preview

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs .vitepress/dist
npm run preview  # preview the built site
```

## Structure

```
.vitepress/config.mts     site config, nav, sidebar, EN/ES locales
.vitepress/theme/         Star-brand colors (amber + dark)
index.md                  home (English)
guide/                    English pages
es/index.md  es/guide/    Spanish pages
.github/workflows/        auto-deploy to GitHub Pages
```

## Publish to GitHub Pages

1. Push this folder to the repo:
   ```bash
   git init
   git add .
   git commit -m "docs: bilingual VitePress site"
   git branch -M main
   git remote add origin https://github.com/Valgan21/S-blacklist.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow builds & deploys on every push. Site URL:
   **https://valgan21.github.io/S-blacklist/**

> The `base` in `.vitepress/config.mts` is set to `/S-blacklist/` to match the repo name.
> If you rename the repo or use a custom domain, update `base` accordingly.
