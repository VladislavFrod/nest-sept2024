import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  async processFile(file: Express.Multer.File) {
    const outputFilePath = path.join('uploads', `compressed-${file.filename}`);

    await sharp(file.path)
      .resize(800)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(outputFilePath);


    fs.unlinkSync(file.path);

    return { url: `/uploads/compressed-${file.filename}` };
  }
}
