import Ember from 'ember';

let originalLoggerError;
let originalTestAdapterException;

function intercept(f = () => {}) {
  originalLoggerError = Ember.Logger.error;
  originalTestAdapterException = Ember.Test.adapter.exception;
  Ember.Logger.error = f;
  Ember.Test.adapter.exception = () => {};
}

function restore() {
  Ember.Logger.error = originalLoggerError;
  Ember.Test.adapter.exception = originalTestAdapterException;
}

export default function asyncThrows(context, f, expectedText) {
  let done = this.async();
  let loggedErrorArgs;

  intercept((...args) => {
    loggedErrorArgs = args;
  });

  return f()
    .then(() => {
      let errorText = loggedErrorArgs.join(' ');

      if (expectedText) {
        let result = errorText.match(expectedText);

        this.pushResult({
          result,
          expected: expectedText,
          actual: errorText,
          message: `Expected to see error '${expectedText}'`
        });
      } else {
        
        this.pushResult({
          result: false,
          expected: '',
          actual: errorText,
          message: `You're using asyncThrows but you didn't add text to the assertion. Add some text as the second argument so the actual exception being thrown is what you expect it is.`
        });
      }

      return done();
    })
    .then(() => {
      return restore();
    });
}
