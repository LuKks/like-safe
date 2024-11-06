module.exports = function safe (input) {
  if (typeof input === 'function') {
    return tryCatch.bind(null, input)
  }

  if (isPromise(input)) {
    return input.then(onSuccess).catch(onError)
  }

  if (input instanceof Error) {
    return [null, input]
  }

  return [input, null]
}

function tryCatch (input, ...args) {
  try {
    const out = input(...args)

    if (isPromise(out)) {
      return out.then(onSuccess).catch(onError)
    }

    return [out, null]
  } catch (err) {
    return [null, err]
  }
}

function onSuccess (res) {
  return [res, null]
}

function onError (err) {
  return [null, err]
}

function isPromise (p) {
  return !!(p && typeof p.then === 'function')
}
