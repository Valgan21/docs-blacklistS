# Configuration

Everything is in the `config/` folder. These files **stay editable even when the resource is
encrypted** (Asset Escrow), so you can adapt it to your server without touching the core.

## Main config files

| File | Controls |
|---|---|
| `config.lua` | Framework bridge, targeting, dispatch provider, radial key |
| `config/access.lua` | Who can use s-blacklist (see [Access](./access)) |
| `config/garages.lua` | Vehicle / garage compatibility |
| `config/tiers.lua` | Tier thresholds (F→S) |
| `config/rewards.lua` | REP per race + bonuses |
| `config/modes.lua` | Race mode tuning |
| `config/hubs.lua` | Race Hub locations & NPCs |
| `config/radial.lua` | Radial menu items |
| `config/events.lua` | Weekly/random events |
| `config/perks.lua` | Top 10 perks |

## Framework (`config.lua`)

```lua
Config.Bridge   = 'auto'      -- 'auto' detects qb/qbx/esx; or 'standalone'|'qbcore'|'esx'|'qbox'|'ox'
Config.Targeting = 'native'   -- or 'qb-target' | 'ox_target'
Config.Dispatch  = 'auto'     -- where police alerts go: ps-dispatch, cd_dispatch, chat, none
Config.RadialKey = 'M'
```

On a hybrid server (multiple frameworks), set `Config.Bridge` explicitly (not `'auto'`).

## Garages / vehicle ownership (`config/garages.lua`)

Pink Slips and vehicle listings read ownership from the garage table. Most garages (qb-garages,
qbx-garages, jg-advancedgarages, esx garages) use the framework table, so `Config.Garage = 'auto'`
just works. For a custom schema, set `Config.Garage = 'custom'` and edit the `custom` block
(table / owner / plate / model columns).

## Dispatch / MDT

s-blacklist does **not** bundle an MDT. It emits the alert and you route it:

- Set `Config.Dispatch` to `ps-dispatch` / `cd_dispatch` (built-in adapters), or
- Listen to the generic `s-blacklist:dispatch` event from your own resource — see [API](./api).

Next: **[Access & Whitelist →](./access)**
