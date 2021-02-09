import { Entity } from 'typeorm';
import { Quote } from './Quote';

@Entity()
export class PublicQuote extends Quote {}
