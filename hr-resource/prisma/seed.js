import prisma from "../dist/lib/prisma.js";
import { Seed } from "../dist/config/environment.js";

async function main() {
  // seed default organization
  const defaultOrganizationUpsert = await prisma.organizations.upsert({
    where: { id: 1 },
    create: {
      name: Seed.defaultOrganizationName,
      summary: Seed.defaultOrganizationSummary,
      webLink: Seed.defaultOrganizationWebsiteUrl.href
    },
    update: {
      name: Seed.defaultOrganizationName,
      summary: Seed.defaultOrganizationSummary,
      webLink: Seed.defaultOrganizationWebsiteUrl.href
    }
  });

  // Seed default role
  const defaultRoleUpsertPromise = prisma.roles.upsert({
    where: { code: Seed.defaultRoleCode },
    create: {
      code: Seed.defaultRoleCode,
      title: Seed.defaultRoleTitle,
      description: Seed.defaultRoleDescription,
      hourlyWage: Seed.defaultRoleHourlyWage
    },
    update: {
      title: Seed.defaultRoleTitle,
      description: Seed.defaultRoleDescription,
      hourlyWage: Seed.defaultRoleHourlyWage
    }
  });

  // Seed default user
  const defaultUserUpsertPromise = prisma.users.upsert({
    where: { email: Seed.defaultUserEmail },
    create: {
      email: Seed.defaultUserEmail,
      firstName: Seed.defaultUserFirstName,
      lastName: Seed.defaultUserLastName,
      dateOfBirth: Seed.defaultUserDateOfBirth,
      streetName: Seed.defaultUserStreetName,
      city: Seed.defaultUserCity,
      pincode: Seed.defaultUserPincode,
      province: Seed.defaultUserProvince,
      phone: Seed.defaultUserPhone,
      country: Seed.defaultUserCountry,
      dateJoined: Seed.defaultUserDateJoined,
      organizationId: defaultOrganizationUpsert.id,
    },
    update: {
      firstName: Seed.defaultUserFirstName,
      lastName: Seed.defaultUserLastName,
      dateOfBirth: Seed.defaultUserDateOfBirth,
      streetName: Seed.defaultUserStreetName,
      city: Seed.defaultUserCity,
      pincode: Seed.defaultUserPincode,
      province: Seed.defaultUserProvince,
      phone: Seed.defaultUserPhone,
      country: Seed.defaultUserCountry,
      dateJoined: Seed.defaultUserDateJoined
    }
  });

  const [defaultRoleUpsert, defaultUserUpsert] = await Promise.all([
    defaultRoleUpsertPromise,
    defaultUserUpsertPromise
  ]);

  // Link both user and role
  await prisma.userRoles.upsert({
    where: { userId_roleId: { userId: defaultUserUpsert.id, roleId: defaultRoleUpsert.id } },
    create: {
      userId: defaultUserUpsert.id,
      roleId: defaultRoleUpsert.id
    },
    update: {}
  });
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
