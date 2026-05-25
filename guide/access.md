# Access & Whitelist

Not everyone should be able to use s-blacklist. In `config/access.lua` you decide **who gets in**.
All checks are validated **server-side** — if a player doesn't qualify, the radial won't open and
they're told why.

## Modes

```lua
Config.Access = {
  Enabled = true,         -- false = anyone can use it (no gate)
  Mode = 'open',          -- 'open' = meets requirements · 'ace' = + whitelist permission
  AcePermission = 's-blacklist.access',
  ...
}
```

- **`open`** — anyone who meets the requirements below.
- **`ace`** — a real whitelist: also requires the ace permission (only some players).

## Requirements

```lua
RequireOwnedVehicle = true,   -- must own at least one vehicle
MinMoney = 5000,              -- minimum bank + cash (0 = off)
BlockedJobs = { police = true, ambulance = true, ... },  -- jobs that can't street race
RequireItem = nil,            -- optional invite item (ox_inventory / qb-core)
```

::: warning Standalone note
`RequireOwnedVehicle` and `MinMoney` depend on a framework economy/garage, so they're **ignored
on standalone** (otherwise nobody could ever enter). On standalone, gate by **ace / job / item**.
:::

## Whitelist (only some players)

Set `Mode = 'ace'` and grant the permission:

```cfg
add_ace identifier.license:XXabc s-blacklist.access allow   # per player
add_principal group.vip s-blacklist.access allow            # per group / Discord role
```

## Custom requirements

Add your own rules (Discord role, gang, level, custom inventory) from your **own resource**,
without touching the core:

```lua
exports['s-blacklist']:RegisterAccessCheck(function(src)
    if not MySystem:can(src) then return false, 'You need the Racer role' end
    return true
end)
```

See the full [Integration API →](./api).
