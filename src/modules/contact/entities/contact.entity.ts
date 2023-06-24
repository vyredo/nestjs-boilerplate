import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: true})
    phone: string;

    @Column()
    email: string;

    @OneToOne(() => Employee, 
        employee => employee.contactInfo,
        {onDelete: 'CASCADE'})
    @JoinColumn() // create employeeId
    employee: Employee;

}
