import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import en from '../locale/en.json';
import ru from '../locale/ru.json';

addMessages('en', en);
addMessages('ru', ru);

init({
  fallbackLocale: 'ru',
  initialLocale: getLocaleFromNavigator(),
});
