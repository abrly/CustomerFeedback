/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(feedbackData: Partial<Feedback>): Promise<Feedback> {

    console.log(`Incoming feedback data: ${JSON.stringify(feedbackData)}`);

    // Explicitly set the default values if not provided
    const feedback = this.feedbackRepository.create({
      ...feedbackData,
      Emoji: 0, // Default Emoji value
      CStat: false, // Default CStat as false (boolean)
      CDate: feedbackData.CDate || new Date(), // Ensure CDate is set if not provided
      CommunicationChannel: 'Custom App', // Default CommunicationChannel
    });

    return this.feedbackRepository.save(feedback);
  }
}
