import Sistema from '../models/SistemaModel.js';
import jwt from "jsonwebtoken";

const acharSistema = async (req, res) => {
    try {
      let { secretKey } = req.body;

      let sistema = await Sistema.findOne({
        where: {
          secretKey
        }
      });
      
      if 
      
  }

sistema("ceom");