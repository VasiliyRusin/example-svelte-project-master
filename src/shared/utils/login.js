import Cookies from 'js-cookie';

/**
 * Заглушка для авторизации
 * @param {Element} target - любой элемент внутри block
 * @returns {void|boolean|*}
 */
export function openLoginAllPlatform(target) {
  if (!target || !(target instanceof Element)) {
    throw new Error('You need to pass target element to openLoginAllPlatform');
  }

  try {
    Cookies.set('user_id', '111');
    location.reload();
  } catch (e) {}
};
