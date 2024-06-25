/**
 * Abstract class to extend when creating entity services.
 * @author Jais Christiansen
 */

import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { AbstractService } from './abstract-service';
import { ResponseCodes } from '@/util/enums/response-codes';

export class EntityService<T> extends AbstractService{

  constructor(api: string, config: CreateAxiosDefaults) {
    super(api, config);
  }

  protected getArray = async (
    url: string = '',
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T[]>> => {
    return await this.axiosInstance
      .get<T[]>(url, config)
      .then((value) => {
        return value;
      })
      .catch((value) => {
        return value;
      });
  };

  protected getSingle = async (
    url: string = '',
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return await this.axiosInstance
      .get<T>(url, config)
      .then((value) => {
        return value;
      })
      .catch((value) => {
        return value;
      });
  };

  protected getById = async (
    id: number,
    url: string = '',
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return await this.getSingle(`${url}/${id}`, config);
  };

  protected post = async <T>(
    url: string = '',
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return await this.axiosInstance.post(url, body, config).then((value) => {
      return value;
    });
  };

  protected put = async <T>(
    url: string = '',
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return await this.axiosInstance.put(url, body, config).then((value) => {
      return value;
    });
  };

  protected delete = async <T>(
    url: string = '',
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return await this.axiosInstance.delete<T>(url, config).then((value) => {
      return value;
    });
  };

  public getResponse = <R>(response: AxiosResponse<R>): R => {
    if (response != null) {
      if (ResponseCodes.is2xx(response.status)) {
        return this.success(response);
      }
      throw response.status;
    }
    throw ResponseCodes.INTERNAL_SERVER_ERROR;
  };

  public success = <R>(response: AxiosResponse<R>): R => {
    return response.data;
  };
}