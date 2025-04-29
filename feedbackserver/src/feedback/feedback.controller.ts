/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body() feedbackData: Partial<Feedback>) {

    console.log(`did you reach here ${JSON.stringify(feedbackData)}`);

    return this.feedbackService.create(feedbackData);
  }


}
