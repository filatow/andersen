function concatStrings(firstString, separator) {
  const strings = [];
  let canAddStrings = true;
  let result = '';

  if (typeof separator !== 'string') {
    separator = '';
  }

  function recursionFunc(newString) {
    if (typeof newString !== 'string') {
      result = strings.join(separator);
      canAddStrings = false;
    } else if (canAddStrings) {
      strings.push(newString);
    }

    return recursionFunc;
  }
  
  recursionFunc[Symbol.toPrimitive] = () => result;

  return recursionFunc(firstString);
}


console.log(concatStrings('first')('second')('third')() == 'firstsecondthird');
console.log(concatStrings('first', null)('second')()('third') == 'firstsecond');
console.log(concatStrings('first', null)('second')()('third')() == 'firstsecond');
console.log(concatStrings('first', '123')('second')('third')() == 'first123second123third');
console.log(concatStrings('some-value')('')('')(null) == 'some-value');
console.log(concatStrings('some-value')(2) == 'some-value');
console.log(concatStrings('some-value')('333')(123n)('end')  == 'some-value333');
