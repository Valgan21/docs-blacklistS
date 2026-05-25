# Configuración

Todo está en la carpeta `config/`. Estos archivos **quedan editables aunque el recurso esté
encriptado** (Asset Escrow), así adaptás el script a tu servidor sin tocar el core.

## Archivos principales

| Archivo | Controla |
|---|---|
| `config.lua` | Bridge del framework, targeting, dispatch, tecla del radial |
| `config/access.lua` | Quién puede usar s-blacklist (ver [Acceso](./access)) |
| `config/garages.lua` | Compatibilidad de vehículos / garages |
| `config/tiers.lua` | Umbrales de tier (F→S) |
| `config/rewards.lua` | REP por carrera + bonus |
| `config/modes.lua` | Ajustes de los modos |
| `config/hubs.lua` | Ubicación de Race Hubs y NPCs |
| `config/radial.lua` | Items del radial |
| `config/events.lua` | Eventos weekly/random |
| `config/perks.lua` | Perks del Top 10 |

## Framework (`config.lua`)

```lua
Config.Bridge    = 'auto'     -- 'auto' detecta qb/qbx/esx; o 'standalone'|'qbcore'|'esx'|'qbox'|'ox'
Config.Targeting = 'native'   -- o 'qb-target' | 'ox_target'
Config.Dispatch  = 'auto'     -- a dónde va el aviso policial: ps-dispatch, cd_dispatch, chat, none
Config.RadialKey = 'M'
```

En server híbrido (varios frameworks), fijá `Config.Bridge` explícito (no `'auto'`).

## Garages / propiedad de vehículos (`config/garages.lua`)

Los Pink Slips y el listado de vehículos leen la propiedad de la tabla del garage. La mayoría
(qb-garages, qbx-garages, jg-advancedgarages, esx garages) usan la tabla del framework, así que
`Config.Garage = 'auto'` funciona. Para un schema propio, poné `Config.Garage = 'custom'` y editá
el bloque `custom` (columnas tabla / owner / plate / model).

## Dispatch / MDT

s-blacklist **no** trae MDT. Emite el aviso y vos lo enrutás:

- Poné `Config.Dispatch` en `ps-dispatch` / `cd_dispatch` (adaptadores integrados), o
- Escuchá el evento genérico `s-blacklist:dispatch` desde tu propio recurso — ver [API](./api).

Siguiente: **[Acceso y Whitelist →](./access)**
