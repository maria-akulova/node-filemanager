export const invalidInput = (command) => {
  console.warn(`Unknown command: ${command}. \nCheck your input and try again.`);
}

export const unexpectedError = (input, err) => {
  console.error(`Operation failed: ${input} `, err);
}