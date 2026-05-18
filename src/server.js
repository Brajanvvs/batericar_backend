const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const sequelize = require('./config/database');
require('./models');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tipos-producto', require('./routes/tipoProducto'));
app.use('/api/proveedores', require('./routes/proveedor'));
app.use('/api/almacenes', require('./routes/almacen'));
app.use('/api/bodegas', require('./routes/bodega'));
app.use('/api/productos', require('./routes/producto'));
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/empleados', require('./routes/empleado'));
app.use('/api/clientes', require('./routes/cliente'));
app.use('/api/pedidos-compra', require('./routes/pedidoCompra'));
app.use('/api/ingresos', require('./routes/ingreso'));
app.use('/api/salidas', require('./routes/salida'));
app.use('/api/novedades', require('./routes/novedad'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API de Inventario funcionando' });
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: false });
      console.log('Modelos sincronizados');
    }

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar:', error.message);
  }
}

main();
