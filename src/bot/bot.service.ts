import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import axios from 'axios';

@Injectable()
export class BotService {
  async onStart(ctx: Context) {
    ctx.reply(
      `Botga hush kelibsiz ${ctx.from?.first_name} 😊 \nMen Instagram va Pinterest ilovalaridan video yuklab bera olaman!`,
    );
  }

  async downloadVideo(link: string) {
    try {
      const save = await axios.get(
        'https://instagram-downloader-download-instagram-videos-and-images.p.rapidapi.com/index',
        {
          params: { url: link },
          headers: {
            'X-RapidAPI-Key': '73625be0c1mshec58fada1aa2b39p1068e9jsn58bcfed97a7c',
            'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-and-images.p.rapidapi.com',
          },
        },
      );

      console.log('API javobi:', save.data);
      return save.data?.video || null;
    } catch (error) {
      console.error('Video yuklab olishda xatolik', error.message);
      return null;
    }
  }
}
