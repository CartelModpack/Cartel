import { spawn } from "child_process";

/** The result of an executed command. */
interface ExecResult {
  /** The exit code. */
  code: number;
  /** The exit signal, may be null. */
  signal: NodeJS.Signals;
  /** A list of errors that have occured. */
  errors: Error[];
}

/** Configuration for Exec */
interface ExecConfig {
  /** The working directory for the shell. Defaults to the current working directory. */
  cwd: string;
  /** If the promise should reject if the subprocess exits with a non-zero code. Reject will still contain a . Defaults to `false`. */
  rejectIfNotZero: boolean;
  /** If errors should be piped to the console. Defaults to `true`. */
  showErrors: boolean;
}

/** Configuration for a multi-exec operation.  */
interface MultiExecConfig extends ExecConfig {
  /** Specifies if commands should be executed in order or all at once. Defaults to `"in-order"`. */
  type: "in-order" | "at-once";
}

/** Default exec config. */
const DEFAULT_CONFIG: ExecConfig = {
  cwd: process.cwd(),
  rejectIfNotZero: false,
  showErrors: true,
};

/** Default exec config. */
const DEFAULT_MULTI_CONFIG: MultiExecConfig = {
  ...DEFAULT_CONFIG,
  type: "in-order",
};

/**
 * Creates an promise executor for shell execution.
 * @param command - The command to execute.
 * @param config - The config for the shell.
 * @returns A function that can be used in a promise.
 */
const createCommandExecutor = (
  command: string,
  config: Partial<ExecConfig>
): PromiseExecutor<ExecResult, ExecResult> => {
  const { cwd, showErrors, rejectIfNotZero }: ExecConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  return (resolve, reject) => {
    const childProc = spawn(command, [], { cwd, shell: true });
    const errors: Error[] = [];

    childProc.on("error", (error) => {
      errors.push(error);

      if (showErrors) console.warn(error);
    });

    childProc.on("exit", (code, signal) => {
      const result: ExecResult = {
        code,
        signal,
        errors,
      };

      if (rejectIfNotZero && code !== 0) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  };
};

/**
 * Executes a command.
 * @param command - The command to execute.
 * @param config - Config options for the execution.
 * @returns A promise that resolves when execution is complete.
 */
export function exec(
  command: string,
  config: Partial<ExecConfig> = {}
): Promise<ExecResult> {
  return new Promise(createCommandExecutor(command, config));
}

/**
 * Executes a collection of commands.
 * @param commands - The commands to execute.
 * @param config - Config options for the execution.
 * @returns A promise that resolves when all executions are complete.
 */
export function execAll(
  commands: string[],
  config: Partial<MultiExecConfig> = {}
): Promise<ExecResult[]> {
  const { type }: MultiExecConfig = { ...DEFAULT_MULTI_CONFIG, ...config };

  return new Promise((resolve, reject) => {
    const execs: PromiseExecutor<ExecResult, ExecResult>[] = [];

    for (const cmd of commands) {
      execs.push(createCommandExecutor(cmd, config));
    }

    Promise[type === "at-once" ? "atOnce" : "inOrder"](execs)
      .then(resolve)
      .catch(reject);
  });
}
