const db = require('./server/db/db')
const Product = require('./server/db/models/product')
const User = require('./server/db/models/user')

const products = [
  {
    name: 'Cheetos',
    price: 500,
    inventory: 10,
    description: 'You know what Cheetos are.',
    category: 'chips',
    imageUrl: 'https://target.scene7.com/is/image/Target/13326809_Alt02?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: 'Freetos',
    price: 500,
    inventory: 10,
    description: 'These are Freetos. (Note: these are not Cheetos)',
    category: 'chips',
    imageUrl: 'https://www.fritolay.com/images/default-source/blue-bag-image/fritos-original.png?sfvrsn=b704563a_2'
  },
  {
    name: 'Oreos',
    price: 1000,
    inventory: 5,
    description: 'Chocolate cookies surround a wonderful, creamy center.',
    category: 'cookies',
    imageUrl: 'https://images.csmonitor.com/csm/2013/10/1016-oreos-addictive.jpg?alias=standard_900x600'
  },
  {
    name: 'Ring-Pop',
    price: 100,
    inventory: 100,
    description: 'This 90s classic is simultaneously jewelery and candy.',
    category: 'candy',
    imageUrl: 'https://sep.yimg.com/ay/candy-crate/ring-pops-24ct-6.gif'
  },
  {
    name: 'Snufflebars',
    price: 25000,
    inventory: 10,
    description: 'No one knows what these are.',
    category: 'other',
    imageUrl: 'http://fishtownbeerrunners.com/wp-content/uploads/2013/09/WC8Or71o13c2832333739383C8Or71oq_1266122155.jpg'
  },
  {
    name: 'Hot Cheetos',
    price: 600,
    inventory: 10,
    description: 'Like regular Cheetos, but hotter and more expensive.',
    category: 'chips',
    imageUrl: 'https://target.scene7.com/is/image/Target/12992238?wid=488&hei=488&fmt=pjpeg'
  },
  {
    name: 'Doritos',
    price: 250,
    inventory: 20,
    description: 'The healthiest product we sell.',
    category: 'chips',
    imageUrl: 'https://media.glamour.com/photos/5a788e516a41a70bc017a59d/master/w_644,c_limit/GettyImages-91692426.jpg'
  },
  {
    name: 'Pringles',
    price: 200,
    inventory: 15,
    description:
      'We only carry original Pringles because we exclusively serve snacks to sociopaths.',
    category: 'chips',
    imageUrl: 'http://stuffpoint.com/pringles/image/44131-pringles-original.jpg'
  },
  {
    name: 'String Cheese',
    price: 300,
    inventory: 10,
    description: 'Made from 100% string cows.',
    category: 'other',
    imageUrl: 'http://s3.envato.com/files/243799501/_00A4433.jpg'
  },
  {
    name: 'Raisinets',
    price: 400,
    inventory: 10,
    description: 'Really old grapes dunked in chocolate.',
    category: 'chocolate',
    imageUrl: 'https://sep.yimg.com/ay/candy-crate/raisinets-theater-size-box-3-5oz-6.gif'
  },
  {
    name: `Welch's Fruit Snacks`,
    price: 100,
    inventory: 100,
    description: 'You thought these were sold exclusively on the subway, huh?',
    category: 'candy',
    imageUrl: 'https://www.kroger.com/product/images/xlarge/front/0003485615040'
  },
  {
    name: 'Gummy Bears',
    price: 300,
    inventory: 25,
    description:
      'Raised in the Gummy Forest without antibiotics and harvested in a humane way',
    category: 'candy',
    imageUrl: 'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/g/o/gold_bears__12117.jpg'
  },
  {
    name: 'Swedish Fish',
    price: 250,
    inventory: 30,
    description: 'Sweden is famous for these boneless, red fish.',
    category: 'candy',
    imageUrl: 'https://cdn.influenster.com/media/product/image/swedish-fish-red-theater-size-boxes-12ct-3.jpg.750x750_q85ss0_progressive.jpg'
  },
  {
    name: 'Chocolate Chip Cookies',
    price: 500,
    inventory: 130,
    description:
      'A collaboration with Paula Deen that calls for a stick of butter per cookie.',
    category: 'cookies',
    imageUrl: 'https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg'
  },
  {
    name: 'Twizzlers',
    price: 300,
    inventory: 100,
    description: 'Does anyone actually like these?',
    category: 'candy',
    imageUrl: 'https://i.ytimg.com/vi/TkImmx8aV2c/maxresdefault.jpg'
  },
  {
    name: `Chester's Hot Fries`,
    price: 200,
    inventory: 50,
    description: `FLAMIN' HOTTTTTTTT (Wait...isn't that the Cheetos guy?)`,
    category: 'chips',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/919m6aEGt3L._SL1500_.jpg'
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

seed()
