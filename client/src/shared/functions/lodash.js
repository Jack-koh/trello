const _ = {
  debounce: (func, time) => {
    let timer;
    const debouncedFunc = (args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(args), time);
    };
    return debouncedFunc;
  },
  difference: (mainArray, subArray) => {
    return mainArray.filter((el) => !subArray.includes(el));
  },
  intersection: (mainArray, subArray) => {
    return mainArray.filter((el) => subArray.includes(el));
  },
  differenceBy: (mainArray, subArray, key) => {
    const difference = mainArray.filter(
      (mainItem) =>
        !subArray.some((subItem) => {
          // if (typeof subItem === 'object') {
          //   if (mainItem[key] === subItem[key]) return mainItem;
          // } else if (mainItem[key] === subItem) return mainItem;

          if (typeof mainItem === 'object' && typeof subItem === 'object') {
            if (mainItem[key] === subItem[key]) return mainItem;
          }

          if (typeof mainItem === 'object' && typeof subItem !== 'object') {
            if (mainItem[key] === subItem) return mainItem;
          }

          if (typeof mainItem !== 'object' && typeof subItem === 'object') {
            if (mainItem === subItem[key]) return mainItem;
          }

          return null;
        })
    );
    return difference;
  },
  intersectionBy: (mainArray, subArray, key) => {
    const intersection = mainArray.filter((mainItem) =>
      subArray.some((subItem) => {
        if (typeof mainItem === 'object' && typeof subItem === 'object') {
          if (mainItem[key] === subItem[key]) return mainItem;
        }

        if (typeof mainItem === 'object' && typeof subItem !== 'object') {
          if (mainItem[key] === subItem) return mainItem;
        }

        if (typeof mainItem !== 'object' && typeof subItem === 'object') {
          if (mainItem === subItem[key]) return mainItem;
        }

        return null;
      })
    );
    return intersection;
  },
  isEqual: (a, b) => {
    const comparize = (object) =>
      Object.entries(object)
        .sort()
        .map((item) => {
          if (item[1] instanceof Object) item[1] = comparize(item[1]);
          return item;
        });

    return JSON.stringify(comparize(a)) === JSON.stringify(comparize(b));
  },
};

export default _;
