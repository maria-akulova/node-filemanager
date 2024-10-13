export const exitGracefully = (rl) => {
  rl.close();
  process.exit(0);
};

export const displayCurrentDirectory = (currentDirectory) => {
  console.log(`You are currently in ${currentDirectory}`);
};

export const welcome = (username) => console.log(`Welcome to the File Manager, ${username}!`);
