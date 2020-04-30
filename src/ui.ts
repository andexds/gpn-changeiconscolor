import './ui.scss'
import defaultColor from './components/defaultColor';
import darkColor from './components/darkColor';

const listOfDefaultColor = document.querySelector('.list_type-default');
const listOfDarkColor = document.querySelector('.list_type-dark');

const makeList = (list, {name, id, color}) => {
  const li = document.createElement('li');
  li.dataset.id = id;
  li.innerHTML =`
  <div class="color" style="background-color: rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b *  255)})"></div>
  <p>${name}</p>`;

  list.append(li);
}

defaultColor.forEach((color) => {
  makeList(listOfDefaultColor, color);
});

darkColor.forEach((color) => {
  makeList(listOfDarkColor, color);
});