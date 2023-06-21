import { Contact } from 'src/contact/entities/contact.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Contact, 
        contact => contact.employee)
    contactInfo: Contact
  
    @OneToMany(() => Task, task => task.employee)
    tasks: Task[];

    @ManyToOne(() => Employee, employee => employee.directReports, {onDelete: "SET NULL"})
    manager: Employee
    
    @OneToMany(() => Employee, employee => employee.manager)
    directReports: Employee[];

    @ManyToMany(() => Meeting, meeting => meeting.attendees)
    @JoinTable()
    meetings: Meeting[]

}
