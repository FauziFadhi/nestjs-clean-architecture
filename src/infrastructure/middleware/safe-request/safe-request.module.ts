import { Module } from '@nestjs/common';
import { SafeRequest } from './safe-request.abstract';
import { SafeRequestService } from './safe-request.service';

@Module({
  imports: [],
  providers: [{ useClass: SafeRequestService, provide: SafeRequest }],
  exports: [SafeRequest],
})
export class SafeRequestModule {}
