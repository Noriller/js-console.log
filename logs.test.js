/*
  I was asked at an interview how to print in the console "Hello World" 50 times in as few lines as possible while not using loops. I, of course, answered: recursion.

  Well... this lead me to this: in how many ways can you print in the console 50 times?

  Let's find out!
*/


describe('Printing "Hello World" 50 times', () => {
  beforeEach(() => jest.spyOn(console, console.log.name));

  afterEach(() => {
    Expect50Logs();
    jest.restoreAllMocks();
  });

  test('Brute force', () => {
    Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log(); Log();
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
  })


});

function Expect50Logs() {
  expect(console.log).toHaveBeenCalledTimes(50);
}

function Log() {
  console.log("Hello World!");
}
