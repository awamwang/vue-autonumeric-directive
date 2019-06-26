export let getProp = function getProp(obj, path) {
  var arr = path.split('.');
  while (arr.length > 1) {
    obj = obj[arr.shift()];
  }
  return obj[arr[0]];
}

export let setProp = function setProp(obj, path, value) {
  var arr = path.split('.');
  while (arr.length > 1) {
    obj = obj[arr.shift()];
  }
  obj[arr[0]] = value;
}

export let includes = (arr, target) => {
  let included = false
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let e = arr[i]
    if (e === target) {
      included = true
    }
  }
  return included
}
