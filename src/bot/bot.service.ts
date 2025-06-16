import { Injectable } from '@nestjs/common';
import { Context, Markup } from 'telegraf';
import axios from 'axios';

@Injectable()
export class BotService {
  async onStart(ctx: Context) {
    try {
      await ctx.reply(
        `Welcome to the CurrencyMateBot`,
        Markup.keyboard([['View Current Currency', 'Help']])
          .resize()
          .oneTime(),
      );
    } catch (e) {
      console.log(e);
    }
  }

  async onViewCurrency(ctx: Context) {
    try {
      await ctx.reply(
        'View currency:',
        Markup.inlineKeyboard([
          [Markup.button.callback('💵 USD - UZS', 'usd_to_uzs')],
          [Markup.button.callback('💶 EUR - UZS', 'euro_to_uzs')],
          [Markup.button.callback('🇷🇺 RUB - UZS', 'rubl_to_uzs')],
          [Markup.button.callback('All currencies', 'all_currencies')],
          [Markup.button.callback('Back', 'back')],
        ]),
      );
    } catch (e) {
      console.log(e);
    }
  }

  async onCurrencyRate(ctx: Context, base: string, target: string) {
    await ctx.answerCbQuery();

    try {
      const res = await axios.get(
        `https://api.currencyapi.com/v3/latest?apikey=cur_live_4pwzntigJZHR8wxTZBxQYbeJC0TIaCmZ2a1TUJjL&base_currency=${base}&currencies=${target}`,
      );
      const rates = res.data;
      if (!rates) {
        await ctx.reply(`Currency data not found`);
        return;
      }

      const data = rates.data[target.toUpperCase()].value;
      await ctx.reply(`1 ${base} = ${data.toFixed(2)} ${target}`);
    } catch (e) {
      console.log(e);
    }
  }

  async onHelp(ctx: Context) {
    try {
      await ctx.reply(
        `Instruction to use CurrencyMateBot\n
    💵 USD \\- UZS shows current currency 1 dollar to usz
    💶 EUR \\- UZS shows current currency 1 euro to usz
    🇷🇺 RUB \\- UZS shows current currency 1 rubl to usz
        
    If you have any questions or complaints,contact us: [@MarufovD](https://t.me/MarufovD)`,
        { parse_mode: 'MarkdownV2' },
      );
    } catch (e) {
      console.log(e);
    }
  }
}
