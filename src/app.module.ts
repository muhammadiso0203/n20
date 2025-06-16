import { Module } from '@nestjs/common';
import config from './config/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: config.BOT_TOKEN,
    }),
    BotModule,
  ],
})
export class AppModule {}
