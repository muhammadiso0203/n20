import { BotService } from './bot.service';
import { Injectable } from "@nestjs/common";
import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context } from 'telegraf';

@Update()
@Injectable()
export class botUpdate{
    constructor(private readonly botService: BotService){}

    @Start()
    onStart(@Ctx() ctx:Context){
        return this.botService.onStart(ctx);
    }

    @On('text')
    async handleMessage(@Ctx() ctx: Context){
        const message = ctx.message && 'text' in ctx.message ? ctx.message.text : undefined;

        if(message && message.includes('instagram.com')){
            await ctx.reply('📥 Video yuklanmoqda sabr qiling ...')

            const videoUrl = await this.botService.downloadVideo(message);

            if(!videoUrl){
                await ctx.replyWithVideo({ url: videoUrl})
            }else{
                await ctx.reply('Video yuklab olinmadi keyinroq urunib ko`ring')
            }
        } else{
            ctx.reply('Iltimos instagram yoki pinterest link yuboring')
        }
    }
}