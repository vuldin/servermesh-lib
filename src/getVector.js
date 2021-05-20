//function getVector(id, startingVector = { x: 0, y: 0, z: 0 }) {
function getVector(id, cache, vectorAccessor) {
  // returns a vector ({x,y,z}) given any positive integer
  // used for generating coordinates of regions in a 3d space
  // vector coordinates are incremented out from a given starting point
  // ex: { x: 0, y: 0, z: 0 }, { x:-1, y:-1, z:-1 }, { x:-1, y:-1, z: 0 }...
  if(!Number.isInteger(id)) {
    throw new TypeError(`id must be an integer (input: ${id})`)
  }

  function handleMetBounds(vector, thisBounds) {
    // check if vector has reached max increment within current bounds
    // if so then increment bounds and ensure we stop incrementing up
    // the vector will be set to minimum value within new bounds
    if(metBounds(vector, thisBounds)) {
      bounds += 1
      needsIncrement = false
    } else {
      needsIncrement = true
    }
  }

  const initialVector = { x: 0, y: 0, z: 0 }
  let pass = 0
  let bounds = 0 // bounds the x/y/z values (negative and positive)
  let foundInCache = false
  let needsIncrement = false

  if(cache.length > 0) {
    if(cache.length > id) {
      // requested value is cached, skip calculation
      foundInCache = true
    } else {
      // start calculating at end of cache
      pass = cache.length
      const latestVector = vectorAccessor(cache[cache.length - 1])
      bounds = Math.max(Math.abs(latestVector.x), Math.abs(latestVector.y), Math.abs(latestVector.z))
      handleMetBounds(latestVector, bounds)
    }
  }

  let resultingVector

  if(!foundInCache) {
    for(; pass < id + 1; pass++) {
      if(!needsIncrement) { // reset vector
        if(bounds === 0) { // only on initial pass, prevents -0
          resultingVector = initialVector
        } else { // set to lowest value within bounds
          resultingVector = {
            x: parseInt(`-${bounds}`),
            y: parseInt(`-${bounds}`),
            z: parseInt(`-${bounds}`),
          }
        }
      } else { // increment vector
        const latestVector = vectorAccessor(cache[cache.length - 1])
        resultingVector = addWithinBounds(latestVector, bounds)
      }
      handleMetBounds(resultingVector, bounds)
    }
  }

  /*
  // handle startingVector offset
  return {
    x: cache[id].x + startingVector.x,
    y: cache[id].y + startingVector.y,
    z: cache[id].z + startingVector.z
  }
  */

  return resultingVector
}

function metBounds({ x, y, z }, bounds) {
  return x === bounds
    && y === bounds
    && z === bounds
    ? true
    : false
}

function addWithinBounds(vector, bounds) {
  // continuously add to vector, skipping over any values not within bounds
  let foundIncrement = false
  let currentValue = vector
  while(!foundIncrement) {
    currentValue = add(currentValue, bounds)
    if(isWithinBounds(currentValue, bounds)) {
      foundIncrement = true
    }
  }
  return currentValue
}

function isWithinBounds({ x, y, z }, bounds) {
  // does the vector contain a value that is within bounds?
  // within bounds means the absolute value of a number is greater or equal to a bounding number
  return Math.abs(x) >= bounds
    || Math.abs(y) >= bounds
    || Math.abs(z) >= bounds
    ? true
    : false
}

function add({ x, y, z }, limit) {
  const lowerLimit = limit - limit * 2
  if(z < limit) {
    return { x, y, z: z + 1 }
  } else {
    if(y < limit) {
      return { x, y: y + 1, z: lowerLimit }
    } else {
      if(x < limit) {
        return { x: x + 1, y: lowerLimit, z: lowerLimit }
      }
      else {
        throw new Error(`${{x, y, z}} cannot be incremented`)
      }
    }
  }
}

export default getVector
