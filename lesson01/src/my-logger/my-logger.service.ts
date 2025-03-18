import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private logFilePath: string;

  constructor() {
    super();
    this.logFilePath = path.join(__dirname, '../../logs/app.log'); // Adjust the path as needed
    this.ensureLogFileExists();
  }

  private async ensureLogFileExists() {
    try {
      await fsPromises.mkdir(path.dirname(this.logFilePath), { recursive: true });
      if (!fs.existsSync(this.logFilePath)) {
        await fsPromises.writeFile(this.logFilePath, '', 'utf-8');
      }
    } catch (error) {
      super.error('Error ensuring log file exists:', error.stack || error);
    }
  }

  private async writeToFile(entry: string) {
    try {
      await fsPromises.appendFile(this.logFilePath, entry + '\n', 'utf-8');
    } catch (error) {
      super.error('Error writing to log file:', error.stack || error);
    }
  }

  log(message: string, context?: string) {
    const entry = `[LOG] ${new Date().toISOString()} [${context || 'Application'}]: ${message}`;
    super.log(message, context);
    this.writeToFile(entry);
  }

  error(message: any, stackOrContext?: string, context?: string) {
    const entry = `[ERROR] ${new Date().toISOString()} [${context || 'Application'}]: ${message} | Stack: ${stackOrContext || 'N/A'}`;
    super.error(message, stackOrContext, context);
    this.writeToFile(entry);
  }

  warn(message: string, context?: string) {
    const entry = `[WARN] ${new Date().toISOString()} [${context || 'Application'}]: ${message}`;
    super.warn(message, context);
    this.writeToFile(entry);
  }

  debug(message: string, context?: string) {
    const entry = `[DEBUG] ${new Date().toISOString()} [${context || 'Application'}]: ${message}`;
    super.debug(message, context);
    this.writeToFile(entry);
  }

  verbose(message: string, context?: string) {
    const entry = `[VERBOSE] ${new Date().toISOString()} [${context || 'Application'}]: ${message}`;
    super.verbose(message, context);
    this.writeToFile(entry);
  }
}
