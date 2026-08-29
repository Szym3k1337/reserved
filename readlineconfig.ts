import * as readline from 'readline';
import {ask} from "./src/functions";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
