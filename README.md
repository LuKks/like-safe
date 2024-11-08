# like-safe

Inline try-catch error handling

```
npm i like-safe
```

## Usage

```js
const safe = require('like-safe')

// Sync
const [res1, err1] = safe(sum)(2, 2) // => [4, null]
const [res2, err2] = safe(sum)(2, 'two') // => [null, Error]

// Async
const [res3, err3] = await safe(sumAsync)(2, 2) // => [4, null]
const [res4, err4] = await safe(sumAsync)(2, 'two') // => [null, Error]

// Shortcut for Promises
const [res5, err5] = await safe(sumAsync(2, 2)) // => [4, null]
const [res6, err6] = await safe(sumAsync(2, 'two')) // => [null, Error]

function sum (a, b) {
  const out = a + b

  if (isNaN(out)) {
    throw new Error('Invalid')
  }

  return out
}

async function sumAsync (a, b) {
  // (Same as returning a Promise due async)
  return sum(a, b)
}
```

## License

MIT
