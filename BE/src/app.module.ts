import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { jobModule } from './job/job.module';
import { applicationModule } from './application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_DB_CONNECT}`),
    UserModule,
    jobModule,
    applicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
