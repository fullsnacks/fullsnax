/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as UserHome} from './UserHome'
export {Login, Signup} from './AuthForm'
export {default as Users} from './Users'
export {default as SingleUser} from './SingleUser'
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as Home} from './Home'
export {default as Checkout} from './Checkout'
export {default as OrderComplete} from './OrderComplete'
export {default as NoMatch} from './NoMatch'
