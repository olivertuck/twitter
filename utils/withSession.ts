import { GetServerSidePropsResult, NextApiHandler } from 'next';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

const options = {
  cookieName: process.env.COOKIE_NAME || '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.PASSWORD || '',
};

export const withSessionRoute = (handler: NextApiHandler) =>
  withIronSessionApiRoute(handler, options);

export const withSessionSsr = <
  P extends {
    [key: string]: unknown;
  } = {
    [key: string]: unknown;
  }
>(
  handler: () =>
    | GetServerSidePropsResult<P>
    | Promise<GetServerSidePropsResult<P>>
) => withIronSessionSsr(handler, options);
