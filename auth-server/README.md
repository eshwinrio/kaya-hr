# Kaya HR / Authentication module

## Installation

1. Ensure your working directory is `auth_server/`. If not, `cd` into this directory.

2. Install all dependencies with `npm install`.

3. Migrate database with Prisma and generate Prisma Client.
   
   ```sh
    prisma migrate dev --name <migration_name>
   ```

4. Run server (prebuild is necessary) using any of the steps stated below:

    - `npm run build` and then `npm start` (Best for a long run or production)
  
    - `npm run start:dev` (Best when developing)