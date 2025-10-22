/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: { email: "buyer@example.com", name: "Buyer Demo", role: "buyer" }
  });

  const expertUser = await prisma.user.upsert({
    where: { email: "expert@example.com" },
    update: {},
    create: { email: "expert@example.com", name: "Expert Demo", role: "expert" }
  });

  await prisma.expert.upsert({
    where: { userId: expertUser.id },
    update: {},
    create: {
      userId: expertUser.id,
      headline: "Growth Lead",
      bio: "Escala tu adquisición con playbooks probados.",
      // 👇 ahora CSV en vez de arrays
      categoriesCsv: "Growth,Ads,Analytics",
      languagesCsv: "es,en",
      pricePerHour: 120,
      status: "approved"
    }
  });

  console.log("Seed OK:", { buyer: buyer.email, expert: expertUser.email });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
