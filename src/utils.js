"use strict";

module.exports = {
  getRandomInt: (min, max) => {
    const ceiledMin = Math.ceil(min);
    const flooredMax = Math.floor(max);
    return Math.floor(Math.random() * (flooredMax - ceiledMin + 1)) + ceiledMin;
  },
  shuffle: (itemsToShuffle) => {
    const resultItems = itemsToShuffle.slice();
    for (let i = resultItems.length - 1; i > 0; i--) {
      const randomPosition = Math.floor(Math.random() * i);
      [resultItems[i], resultItems[randomPosition]] = [
        resultItems[randomPosition],
        resultItems[i],
      ];
    }

    return resultItems;
  },
};
