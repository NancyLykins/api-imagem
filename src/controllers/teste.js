import Sistema from '../models/SistemaModel';
import jwt from "jsonwebtoken";

const sistema = async (nomeSistema) => {
    try {
      if (!nomeSistema) {
        sistema = await Sistema.create({ nomeSistema });
      }
  
      let token = jwt.sign(
        { id: sistema.id }, //payload - dados utilizados na criacao do token
        process.env.SECRET_KEY, //chave PRIVADA da aplicação
      );
  
      sistema.token = token;
      await sistema.save();
  
      console.log(token);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

sistema("ceom");