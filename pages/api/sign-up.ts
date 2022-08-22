import * as bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';
import { signUpSchema } from '../../schemas';

const handler: NextApiHandler = async ({ body, method }, res) => {
  if (method === 'POST') {
    try {
      signUpSchema.parse(body);

      const prisma = new PrismaClient();
      const password = await bcrypt.hash(body.password, 10);
      const { id } = await prisma.user.create({
        data: {
          ...body,
          password,
        },
      });

      return res.json({
        id,
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json(err.message);
      }

      return res.status(400).json(err);
    }
  }

  return res.status(405).json('Method not allowed');
};

export default handler;
