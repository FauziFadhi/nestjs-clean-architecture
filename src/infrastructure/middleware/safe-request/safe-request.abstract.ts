import { AxiosResponse } from 'axios';
import * as CircuitBreaker from 'opossum';
import { CONFIG } from './safe-request.interface';

export abstract class SafeRequest {
  abstract get<T>(url: string, config?: CONFIG): Promise<AxiosResponse<T>>;
  abstract delete<T>(url: string, config?: CONFIG): Promise<AxiosResponse<T>>;
  abstract head<T>(url: string, config?: CONFIG): Promise<AxiosResponse<T>>;
  abstract get circuitInstance(): Record<string, CircuitBreaker>;
  abstract patch<T>(
    url: string,
    data?: unknown,
    config?: CONFIG,
  ): Promise<AxiosResponse<T>>;
  abstract put<T>(
    url: string,
    data?: unknown,
    config?: CONFIG,
  ): Promise<AxiosResponse<T>>;
  abstract post<T>(
    url: string,
    data?: unknown,
    config?: CONFIG,
  ): Promise<AxiosResponse<T>>;
}
