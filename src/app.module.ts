import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VideoModule } from './video/video.module';
import { EmployeeModule } from './employee/employee.module';
import { ContactModule } from './contact/contact.module';
import { TaskModule } from './task/task.module';
import { MeetingModule } from './meeting/meeting.module';
import configuration from './config';
import { Employee } from './employee/entities/employee.entity';
import { Contact } from './contact/entities/contact.entity';
import { Meeting } from './meeting/entities/meeting.entity';
import { Task } from './task/entities/task.entity';

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
    TasksModule,
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
