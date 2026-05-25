# Acceso y Whitelist

No todos deberían poder usar s-blacklist. En `config/access.lua` decidís **quién entra**. Todos
los chequeos se validan **server-side** — si un jugador no califica, el radial no abre y se le
dice por qué.

## Modos

```lua
Config.Access = {
  Enabled = true,         -- false = cualquiera puede usarlo (sin gate)
  Mode = 'open',          -- 'open' = cumple requisitos · 'ace' = + permiso de whitelist
  AcePermission = 's-blacklist.access',
  ...
}
```

- **`open`** — cualquiera que cumpla los requisitos de abajo.
- **`ace`** — whitelist real: además exige el permiso ace (solo algunos jugadores).

## Requisitos

```lua
RequireOwnedVehicle = true,   -- debe tener al menos un vehículo propio
MinMoney = 5000,              -- dinero mínimo banco + cash (0 = off)
BlockedJobs = { police = true, ambulance = true, ... },  -- trabajos que no pueden correr
RequireItem = nil,            -- item de invitación opcional (ox_inventory / qb-core)
```

::: warning Nota standalone
`RequireOwnedVehicle` y `MinMoney` dependen de la economía/garage del framework, así que se
**ignoran en standalone** (si no, nadie podría entrar nunca). En standalone, gateá por **ace / job / item**.
:::

## Whitelist (solo algunos)

Poné `Mode = 'ace'` y dale el permiso:

```cfg
add_ace identifier.license:XXabc s-blacklist.access allow   # por jugador
add_principal group.vip s-blacklist.access allow            # por grupo / rol de Discord
```

## Requisitos propios

Sumá tus reglas (rol de Discord, gang, nivel, inventario custom) desde tu **propio recurso**, sin
tocar el core:

```lua
exports['s-blacklist']:RegisterAccessCheck(function(src)
    if not MiSistema:puede(src) then return false, 'Necesitas el rol Racer' end
    return true
end)
```

Ver la [API de integración →](./api) completa.
