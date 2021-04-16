import { expect } from 'chai'
import * as handler from '../../src/handler'

test('Hello handler', async () => {
  const event = 'event'
  const context = 'context'
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200)
    expect(typeof response.body).toBe('string')
    expect(error).toBe(null)
  }

  await handler.hello(event, context, callback)
})
