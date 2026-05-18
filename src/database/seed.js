const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const { Usuario, Empleado, TipoProducto, Proveedor, Almacen, Bodega, Cliente } = require('../models');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');

    // Sincronizar modelos (crea tablas si no existen)
    await sequelize.sync({ alter: false });
    console.log('Tablas sincronizadas');

    // --- Usuario admin por defecto ---
    const adminExists = await Usuario.findOne({ where: { email: 'admin@sistema.com' } });
    if (!adminExists) {
      const password_hash = await bcrypt.hash('admin123', 10);
      const admin = await Usuario.create({
        cedula: '1234567890',
        nombre: 'Admin',
        apellido: 'Sistema',
        email: 'admin@sistema.com',
        telefono: '3001234567',
        rol: 'ADMIN',
        password_hash
      });
      console.log('Admin creado: admin@sistema.com / admin123');
    } else {
      console.log('El admin ya existe');
    }

    // --- Tipos de producto por defecto ---
    const tipos = ['ELECTRÓNICO', 'HERRAMIENTA', 'MATERIAL OFICINA', 'SEGURIDAD', 'OTROS'];
    for (const t of tipos) {
      const exists = await TipoProducto.findOne({ where: { nombre: t } });
      if (!exists) {
        await TipoProducto.create({ nombre: t });
        console.log(`Tipo creado: ${t}`);
      }
    }

    // --- Almacén por defecto ---
    let almacen = await Almacen.findOne({ where: { nombre: 'ALMACÉN PRINCIPAL' } });
    if (!almacen) {
      almacen = await Almacen.create({ nombre: 'ALMACÉN PRINCIPAL', ubicacion: 'Sede Central' });
      console.log('Almacén principal creado');
    }

    // --- Bodega por defecto ---
    const bodegaExists = await Bodega.findOne({ where: { nombre: 'BODEGA PRINCIPAL' } });
    if (!bodegaExists) {
      await Bodega.create({ nombre: 'BODEGA PRINCIPAL', estado: 'ACTIVO', id_almacen: almacen.id_almacen });
      console.log('Bodega principal creada');
    }

    // --- Proveedor por defecto ---
    const provExists = await Proveedor.findOne({ where: { nit: '900000001-1' } });
    if (!provExists) {
      await Proveedor.create({
        nombre: 'PROVEEDOR GENÉRICO',
        nit: '900000001-1',
        telefono: '3100000000',
        email: 'proveedor@email.com'
      });
      console.log('Proveedor genérico creado');
    }

    // --- Cliente por defecto ---
    const cliExists = await Cliente.findOne({ where: { numero_documento: '800000001-1' } });
    if (!cliExists) {
      await Cliente.create({
        nombre: 'CLIENTE GENÉRICO',
        tipo_documento: 'NIT',
        numero_documento: '800000001-1',
        telefono: '3200000000'
      });
      console.log('Cliente genérico creado');
    }

    console.log('\nSeed completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error.message);
    process.exit(1);
  }
}

seed();
