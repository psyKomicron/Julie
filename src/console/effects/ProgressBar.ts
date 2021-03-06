import readline = require('readline');
import { Printer } from '../Printer';

export class ProgressBar
{
    private max: number;
    private title: string;
    private started: boolean = false;

    constructor(max: number, title: string)
    {
        this.max = max;
        this.title = title;
    }

    public start(): void
    {
        if (!this.started)
        {
            this.started = true;
            readline.cursorTo(process.stdout, 50 - Math.round(this.title.length / 2));
            process.stdout.write(this.title + "\n");
            let bar = "[";
            for (let i = 0; i < 100; i++)
            {
                bar += " ";
            }
            readline.moveCursor(process.stdout, 106, 0);
            process.stdout.write("]");
            bar += "\n";
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(bar);
        }
        else
        {
            // make it to restart the bar
            throw "Cannot start bar again";
        }
    }

    public update(value: number): void
    {
        if (this.started)
        {
            let round = Math.round((value / this.max) * 100);
            let border = round < 100 ? round : 100;
            readline.moveCursor(process.stdout, 1, -1);
            let text = "";
            for (let i = 0; i < border; i++)
                text += "=";
            process.stdout.write(`${Printer.info(text)} ${round}%\n`);
        }
        else throw "Bar has not been started";
    }
}