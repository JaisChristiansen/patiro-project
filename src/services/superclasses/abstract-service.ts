/**
 * Abstract class to extend when creating specific services.
 * @author Jais Christiansen
 */

import type { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
// import { cookieUtils } from '@/util/cookie-utils';

export class AbstractService {
  protected axiosInstance: AxiosInstance;
  // private token: string;

  constructor(api: string, config: CreateAxiosDefaults) {
    config.baseURL = `${config.baseURL}/${api}`;
    this.axiosInstance = axios.create(config);
    // this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.getToken()}`;
    // const jwt = cookieUtils.getCookie('session');
    // this.token = jwt ? jwt : '';

    this.axiosInstance.interceptors?.request.use(
      (param) => {
        return {
          ...param,
          params: {
            ...param.params,
            // insert extra params here, like language and domain
          },
        };
      },
      () => {
        // handling error
      },
    );
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // If success, return response as is
        return response;
      },
      (error: AxiosError) => {
        // If error, return the AxiosResponse from the AxiosError
        // throw error;
        return error.response;
      },
    );
  }

  // public getToken(): string {
  //   if (!this.token) {
  //     const jwt = cookieUtils.getCookie('session');
  //     this.token = jwt ? jwt : '';
  //   }
  //   return this.token;
  // }

  // public setToken = (token: string, hours: number) => {
  //   cookieUtils.setCookie('session', token, hours);
  //   this.token = token;
  // };
}