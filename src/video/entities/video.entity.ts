import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    video_name: string;
  
    @Column()
    video_url: string;
}
