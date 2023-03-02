/**
 * Проверка на мобильное устройство
 * @param {number} checkpoint Ширина при которой переходит в мобильный вид - по умолчанию 1200
 * @returns {boolean} Возвращает boolean значение
 */
export const isOzonMobile = (checkpoint = 1200) => {
  if (typeof window !== 'object') return false;

  return window.innerWidth < checkpoint;
};

/**
 * Заглушка. Возвращает какая сейчас платформа у клиента. Может вернуть false, если ничего не найдено
 * <pre>
 *   site -> web desktop
 *   mobile_site -> web mobile
 *   ios || android -> webview mobile
 * </pre>
 * @return {false | 'site' | 'mobile_site' | 'ios' | 'android'}
 */

export function getPlatform() {
  if (typeof window !== 'object') return false;
  return process.env.PLATFORM;
}
