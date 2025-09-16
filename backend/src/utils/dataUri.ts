import DataUriParser from 'datauri/parser.js';
import path from 'path';
import type { Express } from 'express';

const parser = new DataUriParser();

const getDataUri = (file: Express.Multer.File): string => {
  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer).content as string;
};

export default getDataUri;
