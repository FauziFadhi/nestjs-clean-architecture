import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AreaModule } from './Area/area.module';

@Module({
  imports: [
    AreaModule,
    // RouterModule.register([
    //   {
    //     path: 'dashboard',
    //     children: [
    //       AreaModule,
    //     ],
    //   },
    // ]),
  ],
  controllers: [],
  providers: [],
})
export class DashboardModule {}
