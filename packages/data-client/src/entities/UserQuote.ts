import { Entity, Column } from 'typeorm';
import { Quote } from './Quote';

@Entity()
export class UserQuote extends Quote {
  @Column()
  userId: string;
}
