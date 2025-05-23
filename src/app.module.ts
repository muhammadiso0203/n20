import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/models/user.model';
import { CountryModule } from './country/country.module';
import { Country } from './country/model/country.model';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal:true, envFilePath:'.env'}),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host:process.env.PG_HOST,
      port:Number(process.env.PG_PORT),
      username:process.env.PG_USER,
      password:String(process.env.PG_PASS),
      database:process.env.PG_DB,
      autoLoadModels:true,
      logging:false,
      models:[User, Country]
    }),
    UserModule,
    CountryModule
  ],
})
export class AppModule {}
