import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VideoModule } from './modules/video/video.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ContactModule } from './modules/contact/contact.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import configuration from './config';
import { Employee } from './modules/employee/entities/employee.entity';
import { Contact } from './modules/contact/entities/contact.entity';
import { Meeting } from './modules/meeting/entities/meeting.entity';
import { Task } from './modules/task/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Employee, Contact, Meeting, Task]),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    TaskModule,
    VideoModule,
    EmployeeModule,
    ContactModule,
    TaskModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
