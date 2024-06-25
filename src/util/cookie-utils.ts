export class CookieUtils {
  constructor() {}

  public getCookie = (name: string): string | null => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  public setCookie = (name: string, value: string, hours: number) => {
    let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = ';expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${value ? value : ''}${expires};path=/`;
  };

  public deleteCookie = (name: string) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;Path=/;';
  };
}

export const cookieUtils = new CookieUtils();
