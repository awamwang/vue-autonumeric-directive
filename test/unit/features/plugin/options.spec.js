import Plugin from '../../../../dist/vue-autonumeric-directive.common'

describe('Plugin test', () => {
  it('has install method', () => {
    expect(typeof Plugin.install).toBe('function')
  })
})