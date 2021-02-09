import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  authorName: string;
}
