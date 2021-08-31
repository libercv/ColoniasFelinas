import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ColoniesModule } from './colonies/colonies.module';
import { ColorsModule } from './colors/colors.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { PubSubModule } from './pubsub.module';
import { SeederModule } from './seeder/seeder.module';
import { TownsModule } from './towns/towns.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PatternsModule } from './patterns/patterns.module';
import appConfig from './configuration';

@Module({
  imports: [
    CatsModule,
    ColoniesModule,
    ColorsModule,
    PatternsModule,
    PubSubModule,
    SeederModule,
    TownsModule,
    UsersModule,
    TypeOrmModule.forRoot(appConfig().orm),
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [appConfig] }),
    GraphQLModule.forRoot({
      include: [CatsModule, ColoniesModule, ColorsModule, PatternsModule, UsersModule],
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
