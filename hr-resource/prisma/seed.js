import prisma from "../dist/lib/prisma.js";
import { Seed } from "../dist/config/environment.js";

async function main() {
  // seed default organization
  const defaultOrganizationUpsert = await prisma.organization.upsert({
    where: { id: 1 },
    create: {
      name: Seed.defaultOrganizationName,
      summary: Seed.defaultOrganizationSummary,
      webUrl: Seed.defaultOrganizationWebsiteUrl.href,
      logoUrl: Seed.defaultOrganizationLogoUrl,
      bannerUrl: Seed.defaultOrganizationBannerUrl
    },
    update: {}
  });

  // Seed default user
  const defaultUserUpsert = await prisma.user.upsert({
    where: { email: Seed.defaultUserEmail },
    create: {
      firstName: Seed.defaultUserFirstName,
      lastName: Seed.defaultUserLastName,
      email: Seed.defaultUserEmail,
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

  // Link both user and role
  await prisma.userRoleMap.upsert({
    where: { userId_role: { userId: defaultUserUpsert.id, role: "SUPER" } },
    create: {
      userId: defaultUserUpsert.id,
      role: "SUPER"
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
