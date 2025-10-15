// src/types/custom-request.ts
import type { Express } from 'express';
import type { Request } from 'express';

export interface CustomRequest extends Request {
  file?: Express.Multer.File;
  id?: string;
}
