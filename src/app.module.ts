import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { botUpdate } from './bot/bot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7229210857:AAGBbK3z08GW3BgjrzJoZeUxsoppEzDezjc'
    }),
    BotModule,
  ],
})
export class AppModule {}
