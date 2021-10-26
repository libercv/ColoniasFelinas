import { CreatePictureInput } from 'src/domain/pictures/dto/create-picture.input';
import { FileMetadata } from './dto/file-upload.input';
import { Injectable } from '@nestjs/common';
import { PicturesService } from 'src/domain/pictures/pictures.service';
import { v4 as uuid } from 'uuid';
import * as Minio from 'minio';
import * as Path from 'path';
import * as sharp from 'sharp';
import SettingsService from 'src/settings/settings.service';

@Injectable()
export class FileUploadService {
  minioClient: Minio.Client;

  constructor(private readonly settings: SettingsService, private readonly pictures: PicturesService) {
    this.minioClient = new Minio.Client({
      useSSL: settings.storage.ssl,
      endPoint: settings.storage.endPoint,
      port: settings.storage.port,
      accessKey: settings.storage.accessKey,
      secretKey: settings.storage.secretKey,
    });
  }

  async uploadPicture(catId: number, file: FileMetadata) {
    const imageExt = Path.extname(file.originalname).toLowerCase();
    const thumbExt = '.png';

    const imageId = uuid();

    const imageFilename = `${catId}-${imageId}${imageExt}`;
    const thumbnailFilename = `${catId}-${imageId}-thumb${thumbExt}`;

    const image = file.buffer;
    const thumbnail = sharp(image)
      .rotate()
      .resize({
        width: this.settings.pictures.thumbnail.width,
        height: this.settings.pictures.thumbnail.height,
        fit: sharp.fit.contain,
      })
      .png();

    const metadata: CreatePictureInput = {
      catId,
      createdAt: new Date(),
      originalFilename: file.originalname,
      image: imageFilename,
      thumbnail: thumbnailFilename,
    };

    const bucket = this.settings.pictures.bucket;

    await Promise.all([
      this.minioClient.putObject(bucket, imageFilename, image, file.size),
      this.minioClient.putObject(bucket, thumbnailFilename, thumbnail, file.size),
    ]);

    await this.pictures.create(metadata);
  }
}
