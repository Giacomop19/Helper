# Helper project made by
@Giacomo Pumapillo

# Client side project --- (React Native)

## Explanation of dependencies imports ---
    * expo
    * react-native
    * watchman
    
## Explanation of devDependencies imports ---
    * @babel/core
    * @types/react
    * jest
    * typescript
    
## Tools needed
    * npm install -g eas-cli ---> used for build the project (i've set up it for iOS)
    / you must have an Apple Developer account to proceed (paid one)


## Explanation of scripts needed --- 
    | npm run test -> stats jest
    | npm run start-client -> starts expo and watchman, also starts emulator


# Server side project --- (Express)

## Explanation of dependencies imports ---
    * express
    * dotenv
    * bcrypt
    * jsonwebtoken
    * mongoose
    
## Explanation of devDependencies imports ---
    * ts-node
    * typescript
    * @types/express
    * @types/bcrypt
    * @types/jsonwebtoken
    * @types/node
    * nodemon
    * concurrently
    

## Explanation of scripts needed --- 
    | npm run build (npx tsc) -> transpile server side into js inside /dist folder
    | npm run start-server -> read dist/server.js and run server / does not track changes
    | npm run dev -> starts server with nodemon and concurrently and refresh when changes are made ()
