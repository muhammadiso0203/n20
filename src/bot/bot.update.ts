import { Injectable } from '@nestjs/common';
import { Update, Start, Ctx, Hears, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';
import axios from 'axios';

@Injectable()
@Update()
export class BotUpdate {
  constructor(private botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.onStart(ctx);
  }

  @Hears('View Current Currency')
  async onViewCurrency(@Ctx() ctx: Context) {
    return this.botService.onViewCurrency(ctx);
  }

  @Action('usd_to_uzs')
  onUsd(@Ctx() ctx: Context) {
    return this.botService.onCurrencyRate(ctx, 'USD', 'UZS');
  }

  @Action('euro_to_uzs')
  onEuro(@Ctx() ctx: Context) {
    return this.botService.onCurrencyRate(ctx, 'EUR', 'UZS');
  }

  @Action('rubl_to_uzs')
  onRubl(@Ctx() ctx: Context) {
    return this.botService.onCurrencyRate(ctx, 'RUB', 'UZS');
  }

  @Action('all_currencies')
  async onAllCurrencies(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_4pwzntigJZHR8wxTZBxQYbeJC0TIaCmZ2a1TUJjL&base_currency=USD&currencies=UZS,RUB,EUR`;

    try {
      const res = await axios.get(url);
      const rates = res.data.data;

      if (!rates) {
        await ctx.reply(`Currency data not found`);
        return;
      }

      const UZS = rates.UZS.value;
      const RUB = rates.RUB.value;
      const EUR = rates.EUR.value;
      await ctx.reply(
        `1 USD: \n🇺🇿 USZ: ${UZS.toFixed(2)}\n🇷🇺 RUB: ${RUB.toFixed(2)}\n🇪🇺 EUR: ${EUR.toFixed(2)}`,
      );
    } catch (e) {
      console.log(e);
    }
  }

  @Action('back')
  async onBack(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    return this.botService.onStart(ctx);
  }

  @Hears('Help')
  async onHelp(@Ctx() ctx: Context) {
    return this.botService.onHelp(ctx);
  }
}
