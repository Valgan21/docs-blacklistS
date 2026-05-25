# Instalación

Tiempo estimado: **menos de 10 minutos.**

## Requisitos

- Servidor FiveM con **OneSync activado** (el ganador se decide server-side).
- **oxmysql** (única dependencia hard).
- Framework **opcional** — funciona standalone, o con bridge a QBCore / ESX / Qbox / ox.

::: tip La UI viene compilada
El recurso incluye la UI compilada en `dist/`. **No necesitás Node/npm** para correrlo.
:::

## Pasos

1. **Importá la base de datos** — corré `sql/s-blacklist.sql` (crea ~21 tablas, todas `IF NOT EXISTS`).
2. **Poné la carpeta** `s-blacklist` en `resources/`. El nombre **debe ir en minúscula**.
3. **Editá `server.cfg`** (después de oxmysql):

```cfg
set onesync on
ensure oxmysql
ensure s-blacklist
```

4. **Configurá** a gusto en `config/` — ver [Configuración](./configuration).
5. **Reiniciá** el servidor.

## Verificación

Con el servidor arriba:

1. La consola imprime `[s-blacklist] bridge activo: <nombre>` y `Season 1 iniciada`.
2. `/s-blacklist:debugbridge` (admin) → reporta las 14 funciones del bridge OK.
3. En el juego, tecla **M** abre el radial → **Street Tablet** (te pide un alias la primera vez).
4. Probá una carrera: dos jugadores cerca, en vehículo → `/race [serverId]`, el otro `/raceaccept`.

## Troubleshooting

| Síntoma | Solución |
|---|---|
| `ERROR: faltan las tablas core` | No importaste `sql/s-blacklist.sql`. Importalo y reiniciá. |
| `bridge "qbcore" no está registrado` | Detectó un framework pero su bridge no cargó — revisá el recurso o fijá `Config.Bridge`. |
| UI en blanco | Verificá que la carpeta se llame `s-blacklist` (minúscula) y que `dist/` esté presente. |
| Las carreras nunca terminan | El servidor necesita **OneSync** (se leen coords server-side). |
| El dispatch no llega a la policía | Ajustá `Config.Dispatch`, o escuchá el evento `s-blacklist:dispatch` desde tu MDT. Ver [API](./api). |
