/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';

import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private readonly mailerService: MailerService,
    private configService:ConfigService
  ) {}

  async create(feedbackData: Partial<Feedback>): Promise<Feedback> {

    console.log(`Incoming feedback data: ${JSON.stringify(feedbackData)}`);

    // Explicitly set the default values if not provided
    const feedback = this.feedbackRepository.create({
      ...feedbackData,
      Emoji: 0, // Default Emoji value
      CStat: false, // Default CStat as false (boolean)
      CDate: feedbackData.CDate || new Date(), // Ensure CDate is set if not provided
      CommunicationChannel: 'KIOSK', // Default CommunicationChannel
    });

    
    const savedFeedback = await this.feedbackRepository.save(feedback);

    let emailRecepient = this.configService.get<string>('OtherFeedbackRecepientEmailAddress');

    if (feedbackData.feedbackType.toLocaleLowerCase()==="suggestion"){
      emailRecepient = this.configService.get<string>('SuggestionsFeedbackRecepientEmailAddress');
    } else if (feedbackData.feedbackType.toLocaleLowerCase()==="complaint"){
      emailRecepient = this.configService.get<string>('ComplaintFeedbackRecepientEmailAddress');
    }

    
      await this.mailerService.sendMail({
        to:emailRecepient,
        subject: 'New Customer Feedback',
        template: 'feedback-notification',
        context: {
          CustomerName: feedbackData.name,
          EmailAddress: feedbackData.Remarks,
          MobileNumber: feedbackData.ContNo,
          ServiceName: feedbackData.serviceType,
          FeedbackType: feedbackData.feedbackType,
          FeedbackText: feedbackData.feedbackText,
        },
      });


    return savedFeedback;
  }

}
