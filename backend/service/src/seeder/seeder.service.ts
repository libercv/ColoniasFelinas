import { Cat, Gender } from 'src/cats/entities/cat.entity';
import { CeaseCause } from 'src/cats/entities/cease-cause.entity';
import { Colony } from 'src/colonies/entities/colony.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Environment } from 'src/colonies/entities/environment.entity';
import { Eyes } from 'src/cats/entities/eyes.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { LocationType } from 'src/colonies/entities/location-type.entity';
import { Pattern } from 'src/patterns/entities/pattern.entity';
import { Town } from 'src/towns/entities/town.entity';
// import { Annotation } from 'src/cats/entities/annotation.entity';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    await this.seedTowns();
    await this.seedColors();
    await this.seedPatterns();
    await this.seedEyes();
    await this.seedCeaseCauses();
    await this.seedLocationTypes();
    await this.seedEnvironments();
    await this.seedColonies();
    await this.seedCats();
  }

  private async seedTowns(): Promise<any> {
    return Promise.all([
      Town.create({ id: 1, name: 'Alicante' }).save(),
      Town.create({ id: 2, name: 'Albatera' }).save(),
      Town.create({ id: 3, name: 'Alhama de Granada' }).save(),
      Town.create({ id: 4, name: 'Almoradí' }).save(),
    ]);
  }

  private async seedColors(): Promise<any> {
    return Promise.all([
      Color.create({ id: 1, description: 'Negro' }).save(),
      Color.create({ id: 2, description: 'Rojo' }).save(),
      Color.create({ id: 3, description: 'Azul' }).save(),
      Color.create({ id: 4, description: 'Chocolate' }).save(),
      Color.create({ id: 5, description: 'Blanco' }).save(),
      Color.create({ id: 6, description: 'Crema' }).save(),
      Color.create({ id: 7, description: 'Gris' }).save(),
      Color.create({ id: 8, description: 'Tricolor' }).save(),
      Color.create({ id: 9, description: 'Tricolor diluído' }).save(),
    ]);
  }

  private async seedPatterns(): Promise<any> {
    return Promise.all([
      Pattern.create({ id: 1, description: 'Sólido' }).save(),
      Pattern.create({ id: 2, description: 'Tabby' }).save(),
      Pattern.create({ id: 3, description: 'Punteado' }).save(),
      Pattern.create({ id: 4, description: 'Particolor' }).save(),
      Pattern.create({ id: 5, description: 'Point' }).save(),
      Pattern.create({ id: 6, description: 'Carey' }).save(),
      Pattern.create({ id: 7, description: 'Cálico' }).save(),
    ]);
  }

  private async seedEyes(): Promise<any> {
    return Promise.all([
      Eyes.create({ id: 1, description: 'Ojos 1' }).save(),
      Eyes.create({ id: 2, description: 'Ojos 2' }).save(),
      Eyes.create({ id: 3, description: 'Ojos 3' }).save(),
      Eyes.create({ id: 4, description: 'Ojos 4' }).save(),
    ]);
  }

  private async seedCeaseCauses(): Promise<any> {
    return Promise.all([
      CeaseCause.create({ id: 1, description: 'Adoptado' }).save(),
      CeaseCause.create({ id: 2, description: 'Desaparecido' }).save(),
      CeaseCause.create({ id: 3, description: 'Atropellado' }).save(),
      CeaseCause.create({ id: 4, description: 'Abducido' }).save(),
    ]);
  }

  private async seedLocationTypes(): Promise<any> {
    return Promise.all([
      LocationType.create({ id: 1, description: 'Solar privado' }).save(),
      LocationType.create({ id: 2, description: 'Campo' }).save(),
    ]);
  }

  private async seedEnvironments(): Promise<any> {
    return Promise.all([
      Environment.create({ id: 1, description: 'Urbano' }).save(),
      Environment.create({ id: 2, description: 'Periferia' }).save(),
    ]);
  }

  private async seedColonies(): Promise<any> {
    return Promise.all([
      Colony.create({
        id: 1,
        createdAt: new Date(),
        address: 'calle 1',
        locationTypeId: 1,
        environmentId: 1,
        townId: 1,
      }).save(),
      Colony.create({
        id: 2,
        createdAt: new Date(),
        address: 'calle 2',
        locationTypeId: 2,
        environmentId: 2,
        townId: 2,
      }).save(),
      Colony.create({
        id: 3,
        createdAt: new Date(),
        address: 'calle 3',
        locationTypeId: 1,
        environmentId: 1,
        townId: 3,
      }).save(),
      Colony.create({
        id: 4,
        createdAt: new Date(),
        address: 'calle 4',
        locationTypeId: 2,
        environmentId: 2,
        townId: 4,
      }).save(),
    ]);
  }

  private async seedCats(): Promise<any> {
    return Promise.all([
      Cat.create({
        id: 1,
        createdAt: new Date(),
        sterilized: true,
        sterilizedAt: new Date(),
        birthYear: 2015,
        colonyId: 1,
        colorId: 1,
        patternId: 1,
        gender: Gender.Male,
        imageURL:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ueMqYHUuxXOm8RK_rHF62AHaHa%26pid%3DApi&f=1',
      }).save(),
      Cat.create({
        id: 2,
        createdAt: new Date(),
        sterilized: false,
        birthYear: 2016,
        colonyId: 1,
        colorId: 1,
        patternId: 1,
        gender: Gender.Female,
      }).save(),
      Cat.create({
        id: 3,
        createdAt: new Date(),
        sterilized: false,
        birthYear: 2017,
        colonyId: 2,
        colorId: 2,
        patternId: 2,
        gender: Gender.Male,
        eyesId: 2,
      }).save(),
      Cat.create({
        id: 4,
        createdAt: new Date(),
        sterilized: true,
        birthYear: 2017,
        colonyId: 3,
        colorId: 1,
        patternId: 1,
        gender: Gender.Female,
        kitten: true,
      }).save(),
      Cat.create({
        id: 5,
        createdAt: new Date(),
        sterilized: true,
        birthYear: 2017,
        colonyId: 4,
        colorId: 1,
        patternId: 1,
        ceasedAt: new Date(),
        ceaseCauseId: 1,
        gender: Gender.Male,
        eyesId: 1,
      }).save(),
    ]);
  }
}
