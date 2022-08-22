import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async ({ method, query }, res) => {
  if (method === 'GET') {
    try {
      const prisma = new PrismaClient();
      const { email, username } = query;
      const where: Prisma.UserWhereInput = {};

      if (typeof email === 'string') {
        where.email = email;
      }

      if (typeof username === 'string') {
        where.username = username;
      }

      const users = await prisma.user.findMany({
        where,
      });

      return res.json(users);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json(err.message);
      }
    }
  }

  return res.status(405).json('Method not allowed');
};

export default handler;
