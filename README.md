# BateriCar - Backend

API REST del sistema de inventario y compras BateriCar.

## Stack

- Node.js + Express 4
- PostgreSQL + Sequelize 6 (ORM)
- Autenticación JWT + bcryptjs
- ESLint para calidad de código

## Requisitos

- Node.js 18+
- PostgreSQL 15+
- npm 10+

## Instalación

```bash
npm install
cp .env.example .env
# Editar .env con las credenciales de PostgreSQL
npm run db:init
npm run db:seed
npm run dev
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia en producción |
| `npm run dev` | Inicia con nodemon |
| `npm run db:init` | Inicializa la BD |
| `npm run db:seed` | Pobla datos de prueba |
| `npm test` | Ejecuta pruebas |
| `npm run lint` | Ejecuta linter |

## Variables de Entorno

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventario_empresa
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=mi_clave_secreta
JWT_EXPIRES_IN=8h
PORT=4000
```

## API

Todas las rutas (excepto `/api/auth/login` y `/api/health`) requieren token JWT en header `Authorization: Bearer <token>`.

### Módulos

- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/register` - Registro de usuario
- `GET /api/auth/perfil` - Perfil del usuario autenticado
- CRUD completo para: tipos-producto, proveedores, almacenes, bodegas, productos, usuarios, empleados, clientes, pedidos-compra, ingresos, salidas, novedades
- `GET /api/productos/stock-bajo` - Productos con stock bajo
- `PUT /api/pedidos-compra/:id/estado` - Cambiar estado de pedido
- `GET /api/health` - Estado del servidor
