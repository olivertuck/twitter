import { NextApiHandler } from 'next';
import { withSessionRoute } from '../../utils';

const handler: NextApiHandler = async (req, res) => {
  req.session.user = {
    id: '1',
  };

  await req.session.save();

  return res.status(200);
};

export default withSessionRoute(handler);
