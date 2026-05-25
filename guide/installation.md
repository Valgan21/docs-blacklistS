# Installation

Estimated time: **under 10 minutes.**

## Requirements

- A FiveM server with **OneSync enabled** (the race winner is decided server-side).
- **oxmysql** (the only hard dependency).
- A framework is **optional** — runs fully standalone, or bridges to QBCore / ESX / Qbox / ox.

::: tip The UI ships pre-built
The resource includes the compiled UI in `dist/`. **You do not need Node/npm** to run it.
:::

## Steps

1. **Import the database** — run `sql/s-blacklist.sql` (creates ~21 tables, all `IF NOT EXISTS`).
2. **Drop the folder** `s-blacklist` into `resources/`. The folder name **must be lowercase**.
3. **Edit `server.cfg`** (after oxmysql):

```cfg
set onesync on
ensure oxmysql
ensure s-blacklist
```

4. **Configure** to taste in `config/` — see [Configuration](./configuration).
5. **Restart** the server.

## Verify

With the server up:

1. Console prints `[s-blacklist] bridge activo: <name>` and `Season 1 iniciada`.
2. `/s-blacklist:debugbridge` (admin) → reports the 14 bridge functions OK.
3. In-game, press **M** to open the radial → **Street Tablet** (it asks for an alias the first time).
4. Test a race: two players close together, in vehicles → `/race [serverId]`, the other `/raceaccept`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ERROR: faltan las tablas core` | You didn't import `sql/s-blacklist.sql`. Import it and restart. |
| `bridge "qbcore" no está registrado` | A framework was detected but its bridge didn't load — check the framework resource or set `Config.Bridge`. |
| Blank UI | Make sure the folder is named `s-blacklist` (lowercase) and `dist/` is present. |
| Races never finish | The server needs **OneSync** (coords are read server-side). |
| Dispatch doesn't reach police | Set `Config.Dispatch`, or listen to the `s-blacklist:dispatch` event from your MDT. See [API](./api). |
