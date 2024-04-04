import { hash } from "bcrypt";
import prisma from "../dist/lib/prisma.js";
import { Bcrypt, Seed } from "../dist/config/environment.js";

async function main() {
  // Seed default user
  const defaultUserUpsertPromise = prisma.users.upsert({
    where: { email: Seed.defaultUserEmail },
    create: {
      email: Seed.defaultUserEmail,
      firstName: Seed.defaultUserFirstName,
      lastName: Seed.defaultUserLastName,
      password: await hash(Seed.defaultUserPassword, Bcrypt.saltRounds),
    },
    update: {}
  });

  // Seed default application
  const defaultApplicationUpsertPromise = prisma.applications.upsert({
    where: { id: Seed.defaultApplicationId },
    create: {
      name: Seed.defaultApplicationName,
      secret: Seed.defaultApplicationSecret,
    },
    update: {
      name: Seed.defaultApplicationName,
      secret: Seed.defaultApplicationSecret,
    },
  });

  // Resolve both promises
  const [defaultUserUpsert, defaultApplicationUpsert] = await Promise.all([
    defaultUserUpsertPromise,
    defaultApplicationUpsertPromise
  ]);

  // Link both user and application
  await prisma.userApplicationMap.upsert({
    where: {
      userId_applicationId: {
        userId: defaultUserUpsert.id,
        applicationId: defaultApplicationUpsert.id,
      },
    },
    create: {
      userId: defaultUserUpsert.id,
      applicationId: defaultApplicationUpsert.id,
    },
    update: {}
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });