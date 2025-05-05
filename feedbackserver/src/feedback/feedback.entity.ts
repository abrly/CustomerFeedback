/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FeedBack') // Exactly match the table name
export class Feedback {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  CDate: Date;

  @Column({ type: 'int' })
  Emoji:number;
  
  @Column({ type: 'bit' })
  CStat:boolean;

  @Column({ type: 'varchar', length: 100 })
  ContNo: string; // Contact Number

  @Column({ type: 'varchar', length: 255 })
  Remarks: string; // Email Address

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', name: 'coulmn1' })
  serviceType: string; 

  @Column({ type: 'text', name: 'column2' })
  feedbackType: string; 

  @Column({ type: 'text', name: 'coulmn3' })
  feedbackText: string; // Actual Feedback

  @Column({ type: 'varchar', length: 100 })
  CommunicationChannel: string; // Custom App


}
