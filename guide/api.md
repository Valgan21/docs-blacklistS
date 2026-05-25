# Integration API

Add your own scripts/compatibilities **from your own resource, without editing (or seeing) the
core**. Everything here works with the resource **encrypted** (Asset Escrow): exports and events
are runtime interfaces; config/bridge files stay editable via `escrow_ignore`.

::: tip Golden rule
Don't edit the core. Create a separate resource (e.g. `s-blacklist-bridge`) that you `ensure`
after `s-blacklist`, and hook in via exports/events.
:::

## Editable directly (open when encrypted)

- `config.lua`, `config/*.lua` — all config.
- `bridges/*.lua` — framework/garage adapters (copy one for a custom core).
- `sql/*.sql` — the schema.

## Access — your own requirements

```lua
exports['s-blacklist']:RegisterAccessCheck(function(src)
    if not MySystem:can(src) then return false, 'You need the Racer role' end
    return true
end)
```

`IsEligible(src)` → bool · `EnsureAccess(src)` → bool (notifies the reason).

## Dispatch / MDT (any)

```lua
AddEventHandler('s-blacklist:dispatch', function(d)
    -- d = { type='illegal_race', target_alias, coords, location,
    --       vehicle_model, vehicle_plate, heat_level, priority, headline }
end)
```

ps-dispatch and cd_dispatch are built-in via `Config.Dispatch`.
Arrests back into s-blacklist: `exports['s-blacklist']:OnArrest(officerSrc, targetIdentifier)`.

## Radial — add your own entries

```lua
exports['s-blacklist']:AddRadialEntry({ id = 'my_item', label = 'My option', icon = 'star',
    event = 's-blacklist-bridge:client:myAction' })
```

## React to game events (server)

```lua
AddEventHandler('s-blacklist:internal:onRaceFinished', function(d)
    -- d = { raceId, winner, loser, mode, race_type, perfect, buyin, winnerPlate }
end)
```

| Event | Payload (key fields) |
|---|---|
| `onRaceStart` | `{ raceId, mode, type, players }` |
| `onRaceFinished` | `{ raceId, winner, loser, mode, race_type, perfect, buyin, winnerPlate }` |
| `onArrest` | `{ policeId, targetId, heatLevel }` |
| `onBlacklistChange` | `{ identifier, oldPos, newPos }` |
| `onPinkSlipTransfer` | `{ plate, fromId, toId, raceId }` |
| `onBountyClaim` | `{ bountyId, claimerId, targetId, amount }` |
| `onIconicChange` · `onLegendaryGained` | `{ identifier, plate }` · `{ plate, rank, identifier }` |
| `onPrestige` · `onSeasonClose` | `{ identifier, newLevel }` · `{ seasonId }` |

> All events are prefixed `s-blacklist:internal:` and triggered server-side.

## Useful exports (server)

| Export | Description |
|---|---|
| `IsEligible(src)` / `EnsureAccess(src)` | player access |
| `RegisterAccessCheck(fn)` | add an access requirement |
| `StartRace(opts)` | start a 1v1 race programmatically |
| `IsPlayerRacing(src)` | is the player racing? |
| `GetPerks(identifier)` | the player's Top 10 perks |
| `GrantTitle(identifier, title, via)` | grant a title |
| `OnArrest(officerSrc, targetId)` | register an arrest (reward + heat 0) |

> All exports/events keep working with the resource encrypted.
