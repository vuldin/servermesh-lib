import src from './seededRandomColor.js'
import getVector from './getVector.js'

let regionVectorCache = [] // vectors in order by region id
const vectorAccessor = region => region.vector
let regionCache = []

function generateRegion(num) {
  return {
    id: num,
    name: `region-${num}`,
    color: src(`${num}`),
    vector: getVector(num, regionVectorCache, vectorAccessor),
  }
}
/*
function generateRegion(num) {
  const region = {
    id: num,
    name: `region-${num}`,
    color: src(`${num}`),
  }
  regionCache.push(region)
  region.vector = getVector(num, regionCache, vectorAccessor)
}
*/

// TODO const objects = []

const regions = [...Array(200).keys()].map(generateRegion)
const region0 = generateRegion(0)
const region1 = generateRegion(1)
const region2 = generateRegion(199)
//regions.forEach(({ vector }) => console.log(vector))
console.log(region0)
console.log(region1)
console.log(region2)
