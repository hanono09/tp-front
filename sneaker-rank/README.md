[README.md](https://github.com/user-attachments/files/29483397/README.md)
# SneakerRank

Plataforma para buscar, explorar y rankear zapatillas. Construida con React + Vite + Supabase.

🚀 **Producción**: [URL de Vercel acá]

---

## Stack

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Backend/Auth**: Supabase
- **Testing**: Vitest (unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions → Vercel

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Variables de entorno (crear .env.local)
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key

# Levantar dev server
npm run dev
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server en localhost:5173 |
| `npm run build` | Build de producción |
| `npm run lint` | Corre ESLint |
| `npm run test` | Tests unitarios con Vitest |
| `npm run test:coverage` | Tests con reporte de cobertura |
| `npm run test:e2e` | Tests E2E con Playwright |

---

## Convención de ramas

| Prefijo | Uso |
|---|---|
| `feature/nombre` | Nueva funcionalidad |
| `fix/nombre` | Corrección de bug |
| `chore/nombre` | Tareas de mantenimiento (deps, config) |
| `docs/nombre` | Cambios solo en documentación |

**Regla**: ningún cambio se mergea directo a `main` o `develop`. Todo pasa por un Pull Request revisado y aprobado por el otro integrante.

---

## Pipeline CI/CD

Cada push o PR a `main` dispara el pipeline completo:

```
lint → tests unitarios → tests E2E → build → deploy (solo main)
```

El deploy a Vercel ocurre **únicamente** si todos los pasos anteriores pasan y el push es a `main`.

---

## Variables de entorno en GitHub

Para que el pipeline funcione, configurar estos secrets en el repo:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
