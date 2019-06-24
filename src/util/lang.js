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
