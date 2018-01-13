import * as process from "process";

// Pulled and adapted from https://github.com/yargs/yargs/blob/master/test/helpers/utils.js
// This method runs a function and captures console output and whether process.exit was called.

export function checkOutput(f, argv = global.process.argv) {
  let exit = false;
  var process: any = global.process;

  const _exit = process.exit;
  const _argv = process.argv;
  const _error = console.error;
  const _log = console.log;
  const _warn = console.warn;

  process.exit = () => {
    exit = true;
  };

  process.argv = argv;

  const errors = [];
  const logs = [];
  const warnings = [];

  console.error = msg => {
    errors.push(msg);
  };
  console.log = msg => {
    logs.push(msg);
  };
  console.warn = msg => {
    warnings.push(msg);
  };

  let result;

  try {
    result = f();
  } finally {
    reset();
  }

  return done();

  function reset() {
    process.exit = _exit;
    process.argv = _argv;

    console.error = _error;
    console.log = _log;
    console.warn = _warn;
  }

  function done() {
    reset();

    return {
      errors,
      logs,
      warnings,
      exit,
      result
    };
  }
}
