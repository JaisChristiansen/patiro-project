export class StringUtils {
  constructor() {}

  public isNumeric = (text: string | undefined | null, notNull = true): boolean => {
    if (typeof text !== 'string') {
      return false;
    }

    if (notNull && (text == null || !text || text.trim() === '')) {
      return false;
    }

    return !Number.isNaN(Number(text));
  };

  public includesNumber = (text: string): boolean => {
    if (typeof text !== 'string') {
      return false;
    }

    if (text.trim() === '') {
      return false;
    }

    return /\d/.test(text);
  };

  public includesSpecialCharacter = (text: string): boolean => {
    const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    return format.test(text);
  };
}

export const stringUtils = new StringUtils();
