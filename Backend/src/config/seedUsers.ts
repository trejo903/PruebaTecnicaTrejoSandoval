// src/config/seedUsers.ts
import fs from 'fs/promises';
import path from 'path';
import { db } from './db';
import Usuario from '../models/Usuario';
import Address from '../models/Address';

(async () => {
  try {
    await db.sync();

    const filePath = path.join(__dirname, 'usuarios_seed.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const usuarios = JSON.parse(jsonData);

    const defaultPic = 'https://res.cloudinary.com/dgpd2ljyh/image/upload/v1748920792/default_nlbjlp.jpg';

    for (const usuario of usuarios) {
      const newAddress = await Address.create(usuario.address);
      await Usuario.create({
        firstName:      usuario.firstName,
        lastName:       usuario.lastName,
        email:          usuario.email,
        phoneNumber:    usuario.phoneNumber,
        role:           usuario.role,
        status:         usuario.status,
        profilePicture: defaultPic,        // 🔥 aquí
        addressId:      newAddress.id,
      });
    }

    console.log('✔️ Usuarios importados correctamente desde JSON');
    await db.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al importar datos:', error);
    process.exit(1);
  }
})();
