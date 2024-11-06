const test = require('brittle')
const safe = require('./index.js')

test('sync', function (t) {
  const [res1, err1] = safe(synchronous)(true)
  const [res2, err2] = safe(synchronous)(false)

  t.is(res1, 'Ok')
  t.is(err1, null)

  t.is(res2, null)
  t.is(err2.message, 'Errored')
})

test('async', async function (t) {
  const [res1, err1] = await safe(asynchronous)(true)
  const [res2, err2] = await safe(asynchronous)(false)

  t.is(res1, 'Ok')
  t.is(err1, null)

  t.is(res2, null)
  t.is(err2.message, 'Errored')
})

test('Promise', async function (t) {
  const [res1, err1] = await safe(asynchronous(true))
  const [res2, err2] = await safe(asynchronous(false))

  t.is(res1, 'Ok')
  t.is(err1, null)

  t.is(res2, null)
  t.is(err2.message, 'Errored')
})

test('input is an error', function (t) {
  const [response, err] = safe(new Error('Errored'))

  t.is(response, null)
  t.is(err.message, 'Errored')
})

test('any other value', function (t) {
  t.alike(safe('Hello'), ['Hello', null])
  t.alike(safe(123), [123, null])
  t.alike(safe(null), [null, null])
  t.alike(safe(undefined), [undefined, null])
  t.alike(safe({ a: 'b' }), [{ a: 'b' }, null])
  t.alike(safe(['a', 'b']), [['a', 'b'], null])
})

test('no args', function (t) {
  t.alike(safe(), [undefined, null])
})

function synchronous (shouldReturn) {
  if (shouldReturn) {
    return 'Ok'
  }

  throw new Error('Errored')
}

async function asynchronous (shouldResolve) {
  return synchronous(shouldResolve)
}
