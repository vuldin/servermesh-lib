import murmurhash from 'murmurhash'

function src(str) {
  const r = murmurhash.v3(str) % 255
  const g = murmurhash.v3(str, r) % 255
  const b = murmurhash.v3(str, g) % 255
  return `rgb(${r},${g},${b})`
}

export default src