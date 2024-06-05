import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// categories
import categories from './categories/categoriesSlice'
// products
import products from './products/productSlice'
// cart
import cart from './cart/cartSlice'
// wishList
import wishlist from './wishlist/wishlist'
// authSlice
import auth from './auth/authSlice'
// orders
import ordersSlice from './orders/ordersSlice'


// ========== local storage config for persist store  cart all =======
/* const rootPresistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  // blacklist: []
} */
/* const rootReducer = combineReducers({
  categories, 
  products, 
  cart
}) */
//const persistedReducer = persistReducer(rootPresistConfig, rootReducer) ;

// local storage just for items
const cartPresistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
  // blacklist: []
}

// add data to wishlist in local storage
const wishlistPresistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["itemsId"],
  // blacklist: []
}
const rootReducer = combineReducers({
  auth,
  categories, 
  products, 
  ordersSlice,
  cart: persistReducer(cartPresistConfig, cart),
  wishlist: persistReducer(wishlistPresistConfig, wishlist)
})


// my store 
const store = configureStore({
  reducer: rootReducer,
  middleware : (gatDefaultMiddleware) => 
    gatDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
  
 // reducer: persistedReducer,
  // oled code with reducer store
//  reducer: {
 //   categories, 
 //   products, 
 //   cart
//  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)
export  {store, persistor}