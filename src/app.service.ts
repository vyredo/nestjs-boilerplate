import { Body, Inject, Injectable, Logger, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './modules/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { Contact } from './modules/contact/entities/contact.entity';
import { Task } from './modules/task/entities/task.entity';
import { Meeting } from './modules/meeting/entities/meeting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository <Meeting>,

  ){} 

  async seed(){
    Logger.log('here')

    const ceo = this.employeeRepo.create({ name: "MR CEO"})
    await this.employeeRepo.save(ceo)

    const ceoContactInfo = this.contactRepo.create({ email: 'email@email.com'})
    Logger.log('here 2')
    ceoContactInfo.employee = ceo;
    await this.contactRepo.save(ceoContactInfo)

    const manager = this.employeeRepo.create({
      name: "Marius",
      manager: ceo
    })

    const task1 = this.taskRepo.create({ name: "Hire Propel"});
    await this.taskRepo.save(task1)
    const task2 = this.taskRepo.create({ name: "Present to CEO"})
    await this.taskRepo.save(task2)

    manager.tasks = [task1, task2]

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com'});
    meeting1.attendees = [ceo]
    await this.meetingRepo.save(meeting1)

    // because of relationship, we just need to assign meeting1 to manager.meetings
    // meeting1.attendees should have ceo and manager now
    manager.meetings = [meeting1];
    Logger.log('here2')

    await this.employeeRepo.save(manager)
  }

  getHello(): string {
    return JSON.stringify({
      message: 'Hello World!',
    });
  }

  healthCheck(): string {
    return JSON.stringify({
      message: 'up',
    });
  }
}
