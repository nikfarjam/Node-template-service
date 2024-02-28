function print(msg: string) {
    process.stdout.write(`${msg}\n`);
}

function showErrorMessage(msg: string) {
    process.stderr.write(`Error: ${msg}\n`);
}

export { print, showErrorMessage }