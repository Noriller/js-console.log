/*
  I was asked at an interview how to print in the console "Hello World" 50 times in as few lines as possible while not using loops.
  I, of course, answered: recursion.

  Well... this lead me to this: in how many ways can you print in the console 50 times ?

  Let's find out!
*/

describe('Printing "Hello World" 50 times', () => {
  const logMock = jest.fn();

  afterEach(() => {
    Expect50Logs();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  test('Brute force', () => {
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
    Log(); Log(); Log(); Log(); Log();
  });

  test('The For Loop', () => {
    for (let i = 0; i < 50; i++) {
      Log();
    }
  });

  test('Classic Recursion', () => {
    function Log50(num = 1) {
      if (num > 50) return;
      Log();
      Log50(num + 1);
    }

    Log50();
  });

  test('Do While Loop', () => {
    let i = 0;
    do {
      Log();
      i++;
    } while (i < 50);
  });

  test('While Loop', () => {
    let i = 0;
    while (i < 50) {
      Log();
      i++;
    }
  });

  test('For of', () => {
    const arr = Array(50).fill(Log);
    for (let x of arr) {
      x();
    }
  });

  test('For in', () => {
    const arr = Array(50).fill(Log);
    const obj = Object.assign({}, arr);
    for (let x in obj) {
      obj[x]();
    }
  });

  test('arr.forEach', () => {
    const arr = Array(50).fill(Log);
    arr.forEach(el => el());
  });

  test('arr.filter', () => {
    const arr = Array(50).fill(Log);
    arr.filter(el => el());
  });

  test('arr.find', () => {
    const arr = Array(50).fill(Log);
    arr.find(el => el());
  });

  test('arr.findIndex', () => {
    const arr = Array(50).fill(Log);
    arr.findIndex(el => el());
  });

  test('arr.map', () => {
    const arr = Array(50).fill(Log);
    arr.map(el => el());
  });

  test('arr.reduce', () => {
    const arr = Array(50).fill(Log);
    arr.reduce((acc, el) => el(), {});
  });

  test('arr.reduceRight', () => {
    const arr = Array(50).fill(Log);
    arr.reduceRight((acc, el) => el(), {});
  });

  test('Array.from', () => {
    Array.from(
      Array(50).fill(Log),
      x => x()
    );
  });

  test('arr.pop', () => {
    const arr = Array.from(Array(50).fill(Log));
    while (arr.length > 0) {
      arr.pop()();
    }
  });

  test('arr.shift', () => {
    const arr = Array.from(Array(50).fill(Log));
    while (arr.length > 0) {
      arr.shift()();
    }
  });

  test('arr.splice', () => {
    const arr = Array.from(Array(50).fill(Log));
    while (arr.length > 0) {
      arr.splice(0, 1)[0]();
    }
  });

  test('arr.every', () => {
    const arr = Array.from(Array(50).fill(Log));
    arr.every(x => !x());
  });

  test('arr.some', () => {
    const arr = Array.from(Array(50).fill(Log));
    arr.some(x => x());
  });

  test('Spread Operator', () => {
    function* generator(num = 0) {
      while (num < 50) {
        num++;
        yield Log();
      }
    }

    [...generator()];
  });

  test('try/catch', () => {
    class CustomError extends Error {
      constructor(...args) {
        super(...args);

        this.Log50();
      }

      Log50(num = 1) {
        if (num > 50) return;
        Log();
        this.Log50(num + 1);
      }

    }

    try {
      throw new CustomError();
    } catch (error) {
    }
  });

  test('setInterval', () => {
    jest.useFakeTimers();
    let i = 1;
    const interval = setInterval(() => {
      if (i > 50) return clearInterval(interval);
      i++;
      Log();
    }, 1000);
    jest.runAllTimers();
  });

  test('setTimeout', () => {
    jest.useFakeTimers();
    let i = 1;
    function timers() {
      const timeout = setTimeout(() => {
        if (i > 50) return;
        i++;
        Log();
        clearTimeout(timeout);
        timers();
      }, 1000);
    }

    timers();
    jest.runAllTimers();
  });

  test('setImmediate', () => {
    jest.useFakeTimers();
    let i = 1;
    function timers() {
      const immediate = setImmediate(() => {
        if (i > 50) return;
        i++;
        Log();
        clearImmediate(immediate);
        timers();
      });
    }

    timers();
    jest.runAllTimers();
  });

  test('console.table', () => {
    // Thanks: https://amy-blankenship.medium.com/
    // For the idea of using console.table to print in the console 50 times
    // See comment in: https://medium.com/@noriller/in-how-many-ways-can-you-print-in-the-console-50-times-javascript-1f863c670078

    // Create an object with a property that will call the log
    const log = () => ({
      get log() {
        return Log();
      }
    });

    /**
     * console.table will call the properties as it prints them
     * but apparently, `console.table` counts (or maybe calls under the hood)
     * `console.log`! So, I had to refactor how I "count" the logs.
     */
    console.table(
      Array.from({ length: 50 })
        .map(log),
      // in this case this is optional
      ['log']
    );
  });

  function Log() {
    return logMock.mockImplementation(
      () => console.log("Hello World!")
    )();
  }

  function Expect50Logs() {
    expect(logMock).toHaveBeenCalledTimes(50);
  }
});
