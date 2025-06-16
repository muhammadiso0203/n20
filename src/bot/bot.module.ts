import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { botUpdate } from './bot.update';

@Module({
  providers: [BotService, botUpdate],
})
export class BotModule {}
