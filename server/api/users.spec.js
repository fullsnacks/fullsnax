/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@poppybook.com'

    beforeEach(() => {
      return User.create({
        email: 'cody@poppybook.com',
        password: 'bones',
        firstName: 'Cody',
        lastName: 'Codington',
        streetAddress: '123 Pine St.',
        city: 'New York',
        state: 'NY',
        zip: '10024',
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
