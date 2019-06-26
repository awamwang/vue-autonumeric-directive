export let warn = (msg) => {
  console.warn('[vue numeric] ' + msg)
}
export let error = (msg) => {
  throw new Error('[vue numeric] ' + msg)
}