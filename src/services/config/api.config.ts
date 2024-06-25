import type { CreateAxiosDefaults } from 'axios';
import { type PathLike } from 'fs';
import qs from 'qs';

/**
 * Abstract general config to use as parameter for Axios API instances (when using axios.create(config))
 * @author Jais Christiansen
 */

const baseURL = import.meta.env.API_URL && import.meta.env.API_PREFIX
  ? import.meta.env.API_URL + import.meta.env.API_PREFIX
  : 'https://patiro-developer.azurewebsites.net/api';

export const apiConfig: Partial<CreateAxiosDefaults> = {
  baseURL,
  withCredentials: false,
  timeout: 0,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  paramsSerializer: {
    encode: (params: PathLike) => qs.stringify(params, { indices: false }),
    // serialize??
    indexes: false,
  },
};
