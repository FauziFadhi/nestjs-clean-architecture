import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from 'adapter/rest/dashboard/dashbord.module';
import { AppController } from 'app.controller';

import { CONFIG_MODULES } from 'app.provider';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...CONFIG_MODULES,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
