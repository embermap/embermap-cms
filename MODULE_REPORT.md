## Module Report
### Unknown Global

**Global**: `Ember.Logger`

**Location**: `tests/assertions/async-throws.js` at line 7

```js

function intercept(f = () => {}) {
  originalLoggerError = Ember.Logger.error;
  originalTestAdapterException = Ember.Test.adapter.exception;
  Ember.Logger.error = f;
```

### Unknown Global

**Global**: `Ember.Test`

**Location**: `tests/assertions/async-throws.js` at line 8

```js
function intercept(f = () => {}) {
  originalLoggerError = Ember.Logger.error;
  originalTestAdapterException = Ember.Test.adapter.exception;
  Ember.Logger.error = f;
  Ember.Test.adapter.exception = () => {};
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `tests/assertions/async-throws.js` at line 9

```js
  originalLoggerError = Ember.Logger.error;
  originalTestAdapterException = Ember.Test.adapter.exception;
  Ember.Logger.error = f;
  Ember.Test.adapter.exception = () => {};
}
```

### Unknown Global

**Global**: `Ember.Test`

**Location**: `tests/assertions/async-throws.js` at line 10

```js
  originalTestAdapterException = Ember.Test.adapter.exception;
  Ember.Logger.error = f;
  Ember.Test.adapter.exception = () => {};
}

```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `tests/assertions/async-throws.js` at line 14

```js

function restore() {
  Ember.Logger.error = originalLoggerError;
  Ember.Test.adapter.exception = originalTestAdapterException;
}
```

### Unknown Global

**Global**: `Ember.Test`

**Location**: `tests/assertions/async-throws.js` at line 15

```js
function restore() {
  Ember.Logger.error = originalLoggerError;
  Ember.Test.adapter.exception = originalTestAdapterException;
}

```
