import { SUCCESS_CODE } from './constants';

/**
 * 统一封装返回体
 */
export const responseBody = <T>(data: T) => {
  return {
    code: SUCCESS_CODE,
    data,
    message: 'ok',
  };
};
