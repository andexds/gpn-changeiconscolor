import showUI from './showui';

// Функция рекурсия, которая пробегает по всем нодам
const iterOfNode = (child, paint) => {
  // Если нода имеет детей, то запускаем для каждого снова эту функцию
  if ('children' in child) {
    const children = child.children;
    for (let child of children) {
      iterOfNode(child, paint);
    }
  } else {
    // Пока не точно, но если родитель имеет в названии слово icon (это прям костыль)
    // то типа красим его, а если нет то не красим, но кажетс это тупо.
    // if (child.parent.name.includes('icon') && child.type !== 'TEXT') {
      child.fillStyleId = paint.id;
    // }
  }
}

// Смена цвета в ручную
const changeColor = (paint) => {
  const selections = figma.currentPage.selection;

  if (selections.length === 0) return;

  // Для всех выделенных элементов запускаем функцию рекурсии и отправляем нужный цвет
  for (let selection of selections) {
    iterOfNode(selection, paint);
  }

  figma.closePlugin();
}

// Смена цвета автоматически
const changeColorAutomaticaly = () => {
  const selections = figma.currentPage.selection;

  if (selections.length === 0) figma.closePlugin();

  // Если выбран 1 элемент (думаем, что это иконка в кнопке или типо того)
  if (selections.length === 1) {
    const node = selections[0];
    const icon = 'children' in node ? node.children[0] : null;
    const parent = node.parent;
    const children = parent.findAll();
    
    // Пытаемся найти в кнопке текст и взять его цвет
    for(const child of children) {
      if (child.type  === "TEXT" && 'fills' in node && 'fills' in icon) {
          icon.fills = child.fills;
          figma.closePlugin();
          figma.notify("You are awersome 🥰");
          return;
      }
    }

    // Если ничего не вышло покрасить, то вызываем UI
    showUI();
  }
  // Если выбрано больше 1 элемента, то тоже вызываем UI
  showUI();
}
export { changeColor, changeColorAutomaticaly };