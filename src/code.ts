import { changeColor, changeColorAutomaticaly } from './components/core';
import showUI from './components/showui';

const fillSelection = (msg) => {
  if (msg.type === 'fill-selection') {
    // Импортируем глобальный цвет
    figma.importStyleByKeyAsync(msg.id).then((paint) => {
      // Красим выделенный объект в рекурсии
      changeColor(paint);
    }).catch(() => {
      figma.notify('Style doesn\'t exist');
    })
  }
}
// Если открыли панель цветов
if (figma.command === 'open-ui') {
  showUI();
  figma.ui.onmessage = msg => {
    // Если кликнули по цвету
    fillSelection(msg);
  }
// Если выбрали пункт попробовать самостоятельно
} else if (figma.command === 'do-by-self') {
  // Пытаемся красить автоматом
  changeColorAutomaticaly();

  // Если автоматом не вышло, то вызываем снова окошко с UI
  figma.ui.onmessage = msg => {
    fillSelection(msg);
  };

}
