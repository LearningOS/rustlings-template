import * as core from '@actions/core'
import * as github from '@actions/github'
import * as axios from 'axios'
import {setCheckRunOutput} from './output'
import * as os from 'os'
import chalk from 'chalk'
import {readFileSync, readdirSync} from 'fs'
import path from 'path'

const color = new chalk.Instance({level: 1})

export type TestComparison = 'exact' | 'included' | 'regex'

export interface TestConfig {
  readonly externalFile?: string
}

const log = (text: string): void => {
  process.stdout.write(text + os.EOL)
}

let resultPoints = {};

export const runAll = async (testConfig: TestConfig, cwd: string, testFile: string
  , scriptsPath: string): Promise<void> => {
  let points = 0
  let availablePoints = 0

  // https://help.github.com/en/actions/reference/development-tools-for-github-actions#stop-and-start-log-commands-stop-commands
  log('::os autograding::')

  const fileValue = readFileSync(path.join(cwd, testFile)).toString()
  // const classRoomPath = path.join(cwd, '.github/classroom/');
  const scriptPath = path.join(cwd, scriptsPath);

  // const scriptPath = path.join(cwd, core.getInput('scriptPath'));
  let gradeFiles = readdirSync(scriptPath);

  let details = "";
  for(let i = 0;i < gradeFiles.length; i++) {
    if(gradeFiles[i] == testConfig.externalFile) continue;
    let scriptFilePath = path.join(scriptPath, gradeFiles[i])
    if(scriptFilePath.endsWith(".js")) {
      let scriptFile = await import(scriptFilePath)
      
      let result = scriptFile.judge(fileValue)
      resultPoints = {resultPoints, ...result}

      // output the result
      for(let key in result) {
        points += result[key][0];
        availablePoints += result[key][1];

        if (result[key][0] == result[key][1]) {
          let text = `✅ ${key} pass`;
          log(color.green(text))
          // core.setOutput('details', text);
          details += `${text}\n`;
        } else {
          let text = `❌ ${key} points ${result[key][0]}/${result[key][1]}`;
          // core.setOutput('details', text);
          log(color.red(text))
          details += `${text}\n`;
        }
      }
    }
  }

  // Output details
  core.setOutput('details', details);

  log('handle external result')
  // handle external result
  if (testConfig.externalFile) {
    let externalFile = await import(path.join(scriptPath, testConfig.externalFile));
    await externalFile.run({points, availablePoints}, {
      log: core.info,
      github,
      axios
    });
  }

  // Set the number of points
  const text = `Points ${points}/${availablePoints}`
  log(color.bold.bgCyan.black(text))
  core.setOutput('Points', `${points}/${availablePoints}`)
  await setCheckRunOutput(text)

  if (points == availablePoints) {
    log('')
    log(color.green('All tests passed'))
    log('')
    log('✨🌟💖💎🦄💎💖🌟✨🌟💖💎🦄💎💖🌟✨')
    log('')
  }
}
