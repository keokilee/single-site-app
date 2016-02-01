import expect, { spyOn } from 'expect'
import proxyquire from 'proxyquire'

import { ipcMain } from 'electron'

describe('handleMessages', () => {
  describe('get-config', () => {
    function createStubbed (stubbedModules) {
      return proxyquire('../../app/messages', stubbedModules)
    }

    describe('ipcMain', () => {
      const stubs = {
        electron: {
          ipcMain: { on: () => true }
        }
      }
      const messages = createStubbed(stubs)

      it('calls ipcMain to set up an event', () => {
        const spy = spyOn(stubs.electron.ipcMain, 'on')

        messages.handleMessages()
        expect(spy).toHaveBeenCalled()
      })

      it('listens for the "get-config" event', () => {
        const spy = spyOn(stubs.electron.ipcMain, 'on')
        messages.handleMessages()
        const args = spy.calls[0].arguments

        expect(args[0]).toEqual('get-config')
      })
    })

    describe('readFile', () => {
      function createAndTrigger (stubs) {
        const messages = createStubbed(stubs)
        messages.handleMessages()
        ipcMain.emit('get-config')
      }

      it('reads the JSON file from the app directory', (done) => {
        let spy
        const stubs = {
          fs: {
            readFile: () => {
              expect(spy.calls[0].arguments[0]).toEqual('./app/config.json')
              done()
            }
          }
        }

        spy = spyOn(stubs.fs, 'readFile').andCallThrough()
        createAndTrigger(stubs)
      })
    })
  })
})
