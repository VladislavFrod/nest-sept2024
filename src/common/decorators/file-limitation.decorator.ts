import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { permitImageRegexp } from '../constants/permit-image-regexp';

export const FileLimitation = (
  file_name: string,
  file_size: number,
): MethodDecorator => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(file_name, {
        limits: { fileSize: file_size },
        fileFilter: (req, file, callback) => {

          if (!file.mimetype.match(permitImageRegexp)) {
            return callback(
              new BadRequestException(
                'Only .jpg, .jpeg, .png, .gif, or .webp files are allowed!',
              ),
              false,
            );
          }
          callback(null, true);
        },
      }),
    ),
  );
};
