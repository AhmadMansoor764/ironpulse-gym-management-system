import prisma from "./config/prisma.js";

const deleteTrainer = async () => {
  try {
    const deletedTrainer = await prisma.trainer.delete({
      where: {
        email: "john@example.com",
      },
    });

    console.log("✅ Test trainer deleted!");
    console.log(deletedTrainer);
  } catch (error) {
    console.error("❌ Error deleting trainer:", error);
  } finally {
    await prisma.$disconnect();
  }
};

deleteTrainer();
