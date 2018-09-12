const db = require('./server/db/db')
const Product = require('./server/db/models/product')
const User = require('./server/db/models/user')

const products = [
  {
    name: 'Cheetos',
    price: 500,
    inventory: 10,
    description: 'You know what Cheetos are.',
    category: 'chips'
  },
  {
    name: 'Freetos',
    price: 500,
    inventory: 10,
    description: 'These are Freetos. (Note: these are not Cheetos)',
    category: 'chips'
  },
  {
    name: 'Oreos',
    price: 1000,
    inventory: 5,
    description: 'Chocolate cookies surround a wonderful, creamy center.',
    category: 'cookies'
  },
  {
    name: 'Ring-Pop',
    price: 100,
    inventory: 100,
    description: 'This 90s classic is simultaneously jewelery and candy.',
    category: 'candy'
  },
  {
    name: 'Snufflebars',
    price: 25000,
    inventory: 10,
    description: 'No one knows what these are.',
    category: 'other'
  },
  {
    name: 'Hot Cheetos',
    price: 600,
    inventory: 10,
    description: 'Like regular Cheetos, but hotter and more expensive.',
    category: 'chips'
  },
  {
    name: 'Doritos',
    price: 250,
    inventory: 20,
    description: 'The healthiest product we sell.',
    category: 'chips'
  },
  {
    name: 'Pringles',
    price: 200,
    inventory: 15,
    description:
      'We only carry original Pringles because we exclusively serve snacks to sociopaths.',
    category: 'chips'
  },
  {
    name: 'String Cheese',
    price: 300,
    inventory: 10,
    description: 'Made from 100% string cows.',
    category: 'other'
  },
  {
    name: 'Raisinets',
    price: 400,
    inventory: 10,
    description: 'Really old grapes dunked in chocolate.',
    category: 'chocolate'
  },
  {
    name: `Welch's Fruit Snacks`,
    price: 100,
    inventory: 100,
    description: 'You thought these were sold exclusively on the subway, huh?',
    category: 'candy'
  },
  {
    name: 'Gummy Bears',
    price: 300,
    inventory: 25,
    description:
      'Raised in the Gummy Forest without antibiotics and harvested in a humane way',
    category: 'candy'
  },
  {
    name: 'Swedish Fish',
    price: 250,
    inventory: 30,
    description: 'Sweden is famous for these boneless, red fish.',
    category: 'candy'
  },
  {
    name: 'Chocolate Chip Cookies',
    price: 500,
    inventory: 130,
    description:
      'A collaboration with Paula Deen that calls for a stick of butter per cookie.',
    category: 'cookies'
  },
  {
    name: 'Twizzlers',
    price: 300,
    inventory: 100,
    description: 'Does anyone actually like these?',
    category: 'candy'
  }
]

const users = [
  {
    email: 'bob@email.com',
    password: 'passW',
    firstName: 'Bob',
    lastName: 'Smith',
    streetAddress: '123 Pine St.',
    city: 'New Jersey',
    state: 'NJ',
    zip: '01245'
  },

  {
    email: 'sam@email.com',
    password: 'passWO',
    firstName: 'Sam',
    lastName: 'Jones',
    streetAddress: '312 Pine St.',
    city: 'Santa Fe',
    state: 'NM',
    zip: '56274'
  },

  {
    email: 'jane@email.com',
    password: 'passWOW',
    firstName: 'Jane',
    lastName: 'Doe',
    streetAddress: '55 Center St.',
    city: 'New York',
    state: 'NY',
    zip: '10002'
  },

  {
    email: 'fred@email.com',
    password: 'passWOR',
    firstName: 'Fred',
    lastName: 'Freddington',
    streetAddress: '65 Plymouth Ave.',
    city: 'Providence',
    state: 'RI',
    zip: '06457'
  },

  {
    email: 'geoff@email.com',
    password: 'passDROW',
    firstName: 'Geoff',
    lastName: 'Washington',
    streetAddress: '53 Pine Pl.',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210'
  },

  {
    email: 'sally@email.com',
    password: 'passrd',
    firstName: 'Sally',
    lastName: 'Sallington',
    streetAddress: '55 8th St.',
    city: 'Denver',
    state: 'CO',
    zip: '60124'
  },

  {
    email: 'jamie@email.com',
    password: 'passWdd',
    firstName: 'Jamie',
    lastName: 'Jamison',
    streetAddress: '88 Ford Ave.',
    city: 'Boston',
    state: 'MA',
    zip: '12536'
  },

  {
    email: 'alex@email.com',
    password: 'wordpass',
    firstName: 'Alex',
    lastName: 'Alexington',
    streetAddress: '83 Super Cir.',
    city: 'Hartford',
    state: 'CT',
    zip: '23451'
  },

  {
    email: 'corey@email.com',
    password: 'passWdrd',
    firstName: 'Corey',
    lastName: 'Greenwald',
    streetAddress: '55 88th St',
    city: 'New York',
    state: 'NY',
    zip: '10028'
  },

  {
    email: 'matt@email.com',
    password: 'shortShorts',
    firstName: 'Matt',
    lastName: 'Short',
    streetAddress: '12 Smith Ave.',
    city: 'Ossining',
    state: 'NY',
    zip: '10523'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(products.map(product => Product.create(product)))
    await Promise.all(users.map(user => User.create(user)))
    console.log('Seeding success!')
  } catch (error) {
    console.log(error)
  }
  db.close()
}

seed();
