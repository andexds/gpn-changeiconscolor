import './ui.scss'
import defaultColor from './components/defaultColor';
import darkColor from './components/darkColor';

const listOfDefaultColor = document.querySelector('.list_type-default');
const listOfDarkColor = document.querySelector('.list_type-dark');

// Событие по клику на цвет
const addEvent = (id) => {
  parent.postMessage({ pluginMessage: { type: 'fill-selection', id } }, '*');
}

// Создание элемента списка с нужным цветом
const makeList = (list, {name, id, color, opacity}) => {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.innerHTML =`
  <div class="color"
        style="background-color: rgba(
          ${Math.round(color.r * 255)},
          ${Math.round(color.g * 255)},
          ${Math.round(color.b *  255)},
          ${Math.round(opacity)});
  "></div>
  <p>${name}</p>`;
  li.addEventListener('click', () => addEvent(id));
  list.append(li);
}

// Цикл по цветам светлой темы
defaultColor.forEach((color) => {
  makeList(listOfDefaultColor, color);
});

// Цикл по цветам темной темы
darkColor.forEach((color) => {
  makeList(listOfDarkColor, color);
});