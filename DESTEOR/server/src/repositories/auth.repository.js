const prisma = require('../config/db');

const publicUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
};

function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });
}

function findUserWithPrivateFieldsById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

function findUserByResetTokenHash(resetPasswordTokenHash) {
  return prisma.user.findFirst({
    where: {
      resetPasswordTokenHash,
      resetPasswordTokenExpiry: {
        gt: new Date(),
      },
    },
  });
}

function createUser(data) {
  return prisma.user.create({
    data,
    select: publicUserSelect,
  });
}

function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select: publicUserSelect,
  });
}

function updateUserPrivateFields(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByResetTokenHash,
  findUserWithPrivateFieldsById,
  publicUserSelect,
  updateUser,
  updateUserPrivateFields,
};
