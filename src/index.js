import src from './seededRandomColor.js'
import getVector from './getVector.js'

let regionCache = []
const vectorAccessor = region => region.vector

function getRegionByVector(vector) {
  let region = regionCache.find(({ vector: {x, y, z}}) =>
    x === vector.x
    && y === vector.y
    && z === vector.z
  )
  if(!region) {
    let regionNotFound = true
    for(let nextId = regionCache.length; regionNotFound; nextId++) {
      const newRegion = getRegionById(nextId)
      const newRegionVector = newRegion.vector
      if(
        newRegionVector.x === vector.x
        && newRegionVector.y === vector.y
        && newRegionVector.z === vector.z
      ) {
        region = newRegion
        regionNotFound = false
      }
    }
  }
  return region
}

function getRegionById(num) {
  if(regionCache.length <= num) {
    regionCache.push({
      id: num,
      name: `region-${num}`,
      color: src(`${num}`),
      vector: getVector(num, regionCache, vectorAccessor),
    })
  }
  return regionCache[num]
}

// TODO const objects = []

//[...Array(200).keys()].map(getRegionById)
const region0 = getRegionById(0)
const region1 = getRegionById(1)
const region199 = getRegionById(199)
//regions.forEach(({ vector }) => console.log(vector))

/*
const region0 = getRegionByVector({x: 0, y: 0, z: 0})
const region1 = getRegionByVector({x: -1, y: -1, z: -1})
const region199 = getRegionByVector({x: -1, y: -3, z: -2})
*/

console.log(region0)
console.log(region1)
console.log(region199)

console.log('cache length', regionCache.length)
