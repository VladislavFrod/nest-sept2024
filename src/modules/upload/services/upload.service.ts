import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  async processFile(file: Express.Multer.File) {
    const outputFilePath = path.join('uploads', `compressed-${file.filename}`);

    await sharp(file.path)
      .resize(800) // Змінюємо розмір до 800px по ширині
      .toFormat('jpeg') // Конвертуємо в JPEG
      .jpeg({ quality: 80 }) // Стискаємо до 80%
      .toFile(outputFilePath);

    // Видаляємо оригінал, залишаємо тільки оптимізоване зображення
    fs.unlinkSync(file.path);

    return { url: `/uploads/compressed-${file.filename}` };
  }
}
