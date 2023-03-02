import Cookies from 'js-cookies';

/**
 * Заглушка. Возвращает статус авторизации пользователя
 * @returns {boolean}
 */
export function getAuthStatus() {
  try {
    return !!Cookies.get('user_id');
  } catch (e) {
    return false;
  }
}
