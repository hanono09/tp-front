[CALIDAD.md](https://github.com/user-attachments/files/29483383/CALIDAD.md)
# CALIDAD.md — SneakerRank

## Estrategia general

El objetivo de calidad para SneakerRank fue proteger lo que realmente puede romperse: la lógica de búsqueda que filtra sneakers y el flujo que ve el usuario desde que abre la app hasta que encuentra lo que busca.

Elegimos un enfoque en dos capas. Primero, tests unitarios rápidos que validan la lógica de negocio de forma aislada, sin necesidad de levantar un servidor ni un browser. Segundo, un test E2E que verifica que la app completa funciona desde el punto de vista del usuario real. Esta combinación nos permite tener feedback rápido en los casos simples y cobertura real en los casos complejos, sin que el pipeline tarde demasiado.

La decisión de no testear componentes de React con testing-library fue consciente: la lógica visual (qué se renderiza, cómo se ve) cambia constantemente durante el desarrollo, y esos tests se rompen con cualquier refactor de UI sin que haya un bug real. Preferimos invertir ese tiempo en testear comportamiento observable desde afuera.

---

## Herramientas seleccionadas

**Vitest** para tests unitarios. Lo elegimos por sobre Jest porque es el testing framework nativo del ecosistema Vite, que es el bundler que ya usamos. No requiere configuración extra de transformaciones de módulos ESM y la integración con el mismo `vite.config.js` es directa. Jest tiene más ecosistema, pero para este stack Vitest es la opción obvia.

**Playwright** para tests E2E. Lo evaluamos contra Cypress. Cypress tiene una UI más amigable para debugging, pero Playwright corre más rápido en CI, soporta múltiples browsers de forma nativa y no requiere una cuenta cloud para ejecutarse en GitHub Actions. Para un proyecto de esta escala, Playwright es más simple de integrar.

**ESLint** para lint. Es el estándar de la industria para JavaScript/React. Configuramos las reglas de `react-hooks` (previene bugs comunes como dependencias faltantes en useEffect) y `react-refresh` (consistencia con el dev server de Vite).

**GitHub Actions** para CI/CD. Es la integración más directa con GitHub, no requiere configurar un servicio externo, y el tier gratuito es suficiente para este proyecto.

**Vercel** para deploy. La integración con GitHub Actions es trivial y el deploy de proyectos Vite es automático sin configuración de servidor.

---

## Tests desarrollados

### Tests unitarios (`src/__tests__/sneakersApi.test.js`)

1. **Búsqueda por nombre**: verifica que al buscar "jordan" los resultados incluyen solo sneakers cuyo nombre o marca contiene "jordan". Valida que el filtro funciona correctamente.

2. **Búsqueda por marca**: igual que el anterior pero con "nike". Confirma que el filtro no solo busca en el nombre sino también en el campo `brand`.

3. **Case-insensitivity**: busca "ADIDAS" y "adidas" y verifica que los resultados son idénticos. Protege contra bugs de comparación de strings.

4. **Fallback a 6 resultados**: cuando la query no matchea ningún sneaker, la función debe devolver los primeros 6 del catálogo. Este es el comportamiento de fallback documentado en el código.

5. **Query vacía**: verifica que una búsqueda vacía no rompe la función y devuelve resultados (matchea todo).

6. **Estructura de datos**: cada sneaker devuelto debe tener `id`, `name`, `brand` y `sku`. Protege contra cambios en la estructura del mock que rompan el renderizado de las cards.

### Test E2E (`e2e/sneakerrank.spec.js`)

1. **Carga inicial**: verifica que al abrir la app se muestra el título "SneakerRank", el input de búsqueda y el botón buscar.

2. **Sneakers por defecto**: verifica que sin interacción del usuario, la app ya muestra cards de sneakers (la búsqueda inicial "air jordan" funciona).

3. **Búsqueda completa**: el usuario escribe "yeezy", hace click en buscar, y aparecen cards. Cubre el flujo principal de uso de la app.

4. **Estado sin sesión**: verifica que cuando no hay usuario logueado, el AuthBox muestra la opción de iniciar sesión.

5. **Fallback E2E**: buscar algo que no existe ("zzznomatch999") muestra exactamente 6 cards, confirmando que el fallback funciona de punta a punta.

---

## Casos de uso críticos

**La búsqueda de sneakers** es el flujo más importante de la app. Es la funcionalidad central: sin ella la app no tiene sentido. Por eso recibe la mayor cobertura: tests unitarios sobre la lógica de filtrado y un test E2E sobre el flujo completo.

**El fallback de resultados vacíos** es el segundo más importante porque afecta la experiencia directamente: si un usuario busca algo raro y la app queda en blanco sin explicación, parece rota. El fallback a 6 resultados previene eso.

**El estado de autenticación** es importante porque determina qué puede hacer el usuario (dejar reseñas). No testear el flujo completo de login fue una decisión consciente documentada en la sección de limitaciones.

---

## Pipeline de CI/CD

El pipeline tiene 5 jobs que corren en secuencia estricta, cada uno dependiendo del anterior:

```
lint → test → e2e → build → deploy
```

**Lint**: corre ESLint sobre todo el código. Si hay errores de lint, el pipeline falla y no se ejecuta nada más. La decisión es que código con errores de lint no merece ser testeado.

**Test**: corre los tests unitarios con Vitest. Depende de lint para no correr tests sobre código que ya sabemos tiene problemas.

**E2E**: instala Playwright y los browsers de Chromium, buildea la app y corre los tests end-to-end. Depende de los tests unitarios porque si la lógica de negocio está rota, no tiene sentido probar el browser.

**Build**: buildea la app en modo producción y sube el artefacto. Si el build falla (imports rotos, variables de entorno faltantes), el pipeline para acá.

**Deploy**: es el único job que corre solo en pushes a `main`, no en PRs. La decisión es explícita: los PRs se testean completamente pero no se despliegan a producción. Solo código mergeado a main llega a Vercel. Si cualquier paso anterior falla, el deploy no ocurre.

Las variables de entorno de Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) y de Vercel (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) se configuran como secrets en GitHub y nunca aparecen en el código.

---

## Limitaciones y deuda técnica

**El flujo de login/registro no está testeado E2E.** Esto es la limitación más importante. El proceso de autenticación con Supabase involucra emails de confirmación y redirecciones que son difíciles de automatizar sin un entorno de test de Supabase separado. Aceptamos esto como riesgo consciente porque el flujo de login es de Supabase y no es código nuestro.

**No hay tests de los componentes React.** `SneakerCard` y `AuthBox` no tienen cobertura unitaria. Decidimos priorizar la lógica de negocio sobre el renderizado, pero idealmente tendríamos tests que verifiquen que una card muestra el nombre y la imagen correctos dado un sneaker como prop.

**La API de sneakers es un mock.** En producción, si se conecta a una API real, los tests unitarios actuales seguirán pasando pero no cubrirán errores de red, rate limits ni cambios en el schema de respuesta de la API. Habría que agregar tests con mocks de fetch para esos casos.

**Cobertura de tests.** No llegamos al 60% de cobertura sobre las funciones de negocio porque el único módulo de lógica real es `sneakersApi.js`. Los componentes y el cliente de Supabase son difíciles de testear sin mocking extensivo. La cobertura sobre `src/lib/sneakersApi.js` es del 100%.

**No hay test de regresión visual.** Si alguien cambia el CSS y las cards quedan invisibles, ningún test lo detecta. Playwright tiene capacidad de screenshot comparison pero no lo implementamos por tiempo.
