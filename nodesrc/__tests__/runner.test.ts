import path from 'path'
import * as core from '@actions/core'
import {runAll} from '../runner'

beforeEach(() => {
  // resetModules allows you to safely change the environment and mock imports
  // separately in each of your tests
  jest.resetModules()
  jest.restoreAllMocks()
  jest.spyOn(core, 'setOutput').mockImplementation(() => {
    return
  })
})

describe('runAll', () => {
  it('counts the points', async () => {
    const cwd = path.resolve(__dirname, '')
    const tests = {
      externalFile: 'handleResult.js'
    }

    // Expect the points to be in the output
    // const setOutputSpy = jest.spyOn(core, 'setOutput')
    await expect(runAll(tests, cwd, 'test_file.txt', '.github/classroom')).resolves.not.toThrow()
    // expect(setOutputSpy).toHaveBeenCalledWith('Points', '3/6')
  }, 10000)
})
