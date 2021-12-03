function makeObjectDeepCopy(originalObject) {
  let newObject = {};
  for (let key of Object.keys(originalObject)) {
    if (typeof originalObject[key] === 'object') {
      newObject[key] = makeObjectDeepCopy(originalObject[key]);
    } else {
      newObject[key] = originalObject[key];
    }
  }
  return newObject;
}

const testObject = {
  one: 1,
  func: function() { return 'func'},
  first: 'first',
  arr: [1, 'second', {1: 1.1, 2: 2.2}],
  two: 2,
  "2": 'TWO',
  "1": 'ONE',
  obj: {
    a: 'a',
    b: 'b',
    three: 3,
    o: {
      I: 'one',
      II: 'two',
      III: 'three'
    }
  },
  truth: true,
}

const copyObject = makeObjectDeepCopy(testObject);
console.log(copyObject);
