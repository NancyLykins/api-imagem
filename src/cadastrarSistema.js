import jwt from 'jsonwebtoken';
import Sistema from './models/SistemaModel.js';

const cadastrarSistema = async (nomeSistema) => {
  try {
    const sistema = await Sistema.create({ nomeSistema });
    const token = jwt.sign({ id: sistema.id }, process.env.SECRET_KEY);
    sistema.token = token;
    await sistema.save();
    console.log(token);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
cadastrarSistema('ceom');
