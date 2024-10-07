const parseArgs = () => {
  const argv = process.argv;
  const argumnets = argv.slice(2, argv.length);

  argumnets.map((item, index) => {
    if (index % 2 === 0) {
      process.stdout.write(item.slice(2) + " is ");
    } else {
      process.stdout.write(item + (index === argumnets.length - 1 ? "" : ", "));
    }
  });
};

parseArgs();
