import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'dashboard',
        children: [
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class DashboardModule {}

