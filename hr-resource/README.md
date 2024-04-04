# Kaya HR / Resource module

## Installation

1. Ensure your working directory is `hr_resource/`. If not, `cd` into this directory.

2. Install all dependencies
    
    ```sh
    npm install
    ```

3. Generate GraphQL type definitions with `graphql-codegen`.

    ```sh
    npm run codegen
    ```

4. Build the application

    ```sh
    # If starting fresh, run the below command and proceed to step 4
    npm run build

    # If working on development and migration isn't required run start:dev
    npm run start:dev
    ```

5. Migrate/reset database with `prisma-cli` and generate client.
   
   ```sh
   # To completely reset database and start fresh
   npx prisma migrate reset
   ```

   ```sh
   # To apply new updates (can possibly reset database)
   npx prisma migrate dev
   ```

   ```sh
   # Just to seed default entries
   npx prisma db seed
   ```

6. Run server (prebuild is necessary) using any of the steps stated below:

    - `npm run build` and then `npm start` (Best for a long run or production)
  
    - `npm run start:dev` (Best when developing)