import fs from "fs";
import Arquivo from "../models/ArquivoModel";
import Sistema from "../models/SistemaModel";

  async function create(req, res){
    const data = req.body;
    const systemName = data.nomeSistema;
    const file = data.file;

    const system = verifySystem(systemName);
    if(!system){
      return res.status(404).send({
        error: "system not found",
      });
    }

    const fileType = verifyTypeFile(file);

    if(!fileType){
      return res.status(404).send({
        error: "file type not valid",
      });
    }

    try {
      const filePath = await uploadFile(file, fileType, file.name);

      const response = await Arquivo.create({
        nomeArquivo: file.name,
        formatoArquivo: file.type,
        tamanhoArquivo: file.size,
        caminhoArquivo: filePath,
        idTipoArquivo: fileType.id,
        idSistema: system.id,
      });
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send({});
    }
 }

  async function uploadFile(file, fileType, fileName){
    const types = {
      'png': 'images',
      'jpg': 'images',
      'jpeg': 'images',
      'svg': 'images',
      'pdf': 'docs',
      'doc': 'docs',
      'docx': 'docs',
      'xls': 'docs',
      'xlsx': 'docs',
      'ppt': 'docs',
      'pptx': 'docs',
      'txt': 'docs',
    };
    fileType = types[fileType];
    const timeStamp = new Date().getTime();
    const uploadDir = `${systemName}/${fileType}`;
    const uploadPath = `${__dirname}/../../public/${uploadDir}`;

    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const path = `${uploadPath}/${timeStamp}_${fileName}`;
    file.mv(path);
    return path;
  }

  function verifySystem(systemName){
    //exemplo

    
    const formatedsystemName = systemName.toLowerCase().replace(' ', '_');
    const response = select * from system where systemName = formatedSystemName;
    if(systemName){
      return response;
    } else {
      return false;
    }
  }

  function verifyTypeFile(file){
    const fileType = file.type;
    const response = select * from fileType where fileType = fileType;
    if(response){
      return response;
    } else {
      return false;
    }
  }