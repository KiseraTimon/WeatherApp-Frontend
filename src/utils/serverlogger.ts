import fs from 'fs';
import path from 'path';

function message(text: string): void {
    let msg = '';

    if (text === 'err') {
        msg = '\n***\n[CRITICAL ERROR]...Try again later\n***\n';
    } else if (text === 'x') {
        msg = '\n***\n[SYSTEM IS CLOSING]...Goodbye\n***\n';
    } else {
        msg = `\n***\n${text}\n***\n`;
    }

    console.log(msg);
}

function timestamp(): string {
    const now = new Date();
    return now.toLocaleString('en-GB').replace(',', '');
}

function extractError(err: Error): string {
    const type = err.name;
    const msg = err.message;
    const stack = err.stack || '';

    const traceLine = stack.split('\n')[1] || '';
    const match = traceLine.match(/\((.*):(\d+):\d+\)/) || [];

    const file = match[1] || 'Unknown';
    const line = match[2] || 'Unknown';

    return `Type:\n${type}\n\nError Message:\n${msg}\n\nOrigin:\n${file}\n\nLine:\n${line}`;
}

export function handleError(err: Error, logger: string = 'frontend_log.txt'): void {
    const logDir = path.resolve('./logs');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    const filePath = path.join(logDir, logger);
    const details = extractError(err);
    const time = timestamp();

    fs.appendFileSync(
        filePath,
        `***\n--------------------------------------------------\nTIME OF OCCURENCE:---\n${time}\n\nERROR DETAILS:---\n${details}\n---\n--------------------------------------------------\n\n`
    );

    message('err');
}
