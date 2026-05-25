# API de integración

Sumá tus scripts/compatibilidades **desde tu propio recurso, sin editar (ni ver) el core**. Todo
esto funciona con el recurso **encriptado** (Asset Escrow): exports y eventos son interfaces de
runtime; los archivos de config/bridges quedan editables vía `escrow_ignore`.

::: tip Regla de oro
No edites el core. Creá un recurso aparte (ej. `s-blacklist-bridge`) que `ensure` después de
`s-blacklist`, y enganchate por exports/eventos.
:::

## Editable directamente (abierto al encriptar)

- `config.lua`, `config/*.lua` — toda la config.
- `bridges/*.lua` — adaptadores de framework/garage (copiá uno para un core propio).
- `sql/*.sql` — el schema.

## Acceso — requisitos propios

```lua
exports['s-blacklist']:RegisterAccessCheck(function(src)
    if not MiSistema:puede(src) then return false, 'Necesitas el rol Racer' end
    return true
end)
```

`IsEligible(src)` → bool · `EnsureAccess(src)` → bool (notifica el motivo).

## Dispatch / MDT (cualquiera)

```lua
AddEventHandler('s-blacklist:dispatch', function(d)
    -- d = { type='illegal_race', target_alias, coords, location,
    --       vehicle_model, vehicle_plate, heat_level, priority, headline }
end)
```

ps-dispatch y cd_dispatch vienen integrados vía `Config.Dispatch`.
Arrestos hacia s-blacklist: `exports['s-blacklist']:OnArrest(officerSrc, targetIdentifier)`.

## Radial — agregar entradas

```lua
exports['s-blacklist']:AddRadialEntry({ id = 'mi_item', label = 'Mi opción', icon = 'star',
    event = 's-blacklist-bridge:client:miAccion' })
```

## Reaccionar a eventos del juego (server)

```lua
AddEventHandler('s-blacklist:internal:onRaceFinished', function(d)
    -- d = { raceId, winner, loser, mode, race_type, perfect, buyin, winnerPlate }
end)
```

| Evento | Payload (campos clave) |
|---|---|
| `onRaceStart` | `{ raceId, mode, type, players }` |
| `onRaceFinished` | `{ raceId, winner, loser, mode, race_type, perfect, buyin, winnerPlate }` |
| `onArrest` | `{ policeId, targetId, heatLevel }` |
| `onBlacklistChange` | `{ identifier, oldPos, newPos }` |
| `onPinkSlipTransfer` | `{ plate, fromId, toId, raceId }` |
| `onBountyClaim` | `{ bountyId, claimerId, targetId, amount }` |
| `onIconicChange` · `onLegendaryGained` | `{ identifier, plate }` · `{ plate, rank, identifier }` |
| `onPrestige` · `onSeasonClose` | `{ identifier, newLevel }` · `{ seasonId }` |

> Todos los eventos llevan el prefijo `s-blacklist:internal:` y se disparan server-side.

## Exports útiles (server)

| Export | Descripción |
|---|---|
| `IsEligible(src)` / `EnsureAccess(src)` | acceso del jugador |
| `RegisterAccessCheck(fn)` | sumar un requisito de acceso |
| `StartRace(opts)` | iniciar una carrera 1v1 programática |
| `IsPlayerRacing(src)` | ¿está en carrera? |
| `GetPerks(identifier)` | perks del Top 10 del jugador |
| `GrantTitle(identifier, title, via)` | otorgar un título |
| `OnArrest(officerSrc, targetId)` | registrar arresto (recompensa + heat 0) |

> Todos los exports/eventos siguen funcionando con el recurso encriptado.
