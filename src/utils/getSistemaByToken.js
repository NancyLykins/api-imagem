import Sistema from "../models/SistemaModel.mjs";
import jwt from "jsonwebtoken";

const getSistemaByToken = async (authorization) => {
  try {
    if (!authorization) {
      return null;
    }
  
    const token = authorization.split(' ')[1] || null;
    const decodedToken = jwt.decode(token);
    
    if (!decodedToken) {
      return null;
    }
  
    let sistema = await Sistema.findOne({
      where: {
        id: decodedToken.id
      }
    })
  
    if (!sistema) {
      return null;
    }
  
    return sistema;

  } catch (error) {
    return null
  }
}

export default {
    getSistemaByToken
};