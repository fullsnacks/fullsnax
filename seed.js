const db = require("./server/db/db");
const Product = require("./server/db/models/product");
const User = require("./server/db/models/user");

const products = [
  {}
];

const users = [
  {email: 'bob@email.com',
  password: 'passW',
  firstName: 'Bob',
  lastName: 'Smith',
  streetAddress: '123 Pine St.',
  city: 'New Jersey',
  state: 'NJ',
  zip: 01245,
 },
 
 {
  email: 'sam@email.com',
  password: 'passWO',
  firstName: 'Sam',
  lastName: 'Jones',
  streetAddress: '312 Pine St.',
  city: 'Santa Fe',
  state: 'NM',
  zip: 56274,
 },
 
 {
  email: 'jane@email.com',
  password: 'passWOW',
  firstName: 'Jane',
  lastName: 'Doe',
  streetAddress: '55 Center St.',
  city: 'New York',
  state: 'NY',
  zip: 10002,
 },
 
 {
  email: 'fred@email.com',
  password: 'passWOR',
  firstName: 'Fred',
  lastName: 'Freddington',
  streetAddress: '65 Plymouth Ave.',
  city: 'Providence',
  state: 'RI',
  zip: 06457,
 },
 
 {
  email: 'geoff@email.com',
  password: 'passDROW',
  firstName: 'Geoff',
  lastName: 'Washington',
  streetAddress: '53 Pine Pl.',
  city: 'Beverly Hills',
  state: 'CA',
  zip: 90210,
 },
 
 {
  email: 'sally@email.com',
  password: 'passrd',
  firstName: 'Sally',
  lastName: 'Sallington',
  streetAddress: '55 8th St.',
  city: 'Denver',
  state: 'CO',
  zip: 60124,
 },
 
 {
  email: 'jamie@email.com',
  password: 'passWdd',
  firstName: 'Jamie',
  lastName: 'Jamison',
  streetAddress: '88 Ford Ave.',
  city: 'Boston',
  state: 'MA',
  zip: 12536,
 },
 
 {
  email: 'alex@email.com',
  password: 'wordpass',
  firstName: 'Alex',
  lastName: 'Alexington',
  streetAddress: '83 Super Cir.',
  city: 'Hartford',
  state: 'CT',
  zip: 23451,
 },
 
 {
  email: 'corey@email.com',
  password: 'passWdrd',
  firstName: 'Corey',
  lastName: 'Greenwald',
  streetAddress: '55 88th St',
  city: 'New York',
  state: 'NY',
  zip: 10028,
 },
 
 {
  email: 'matt@email.com',
  password: 'shortShorts',
  firstName: 'Matt',
  lastName: 'Short',
  streetAddress: '12 Smith Ave.',
  city: 'Ossining',
  state: 'NY',
  zip: 10523,
 }
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(products.map(product => Product.create(product)));
    await Promise.all(users.map(user => User.create(user)));
    console.log("Seeding success!");
    db.close();
  } catch (error) {
    console.log(error);
  }
};

seed().catch(err => {
  console.error("Oh noes! Something went wrong!");
  console.error(err);
  db.close();
});