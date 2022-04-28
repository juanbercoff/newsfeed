import {
  withApiAuthRequired,
  getAccessToken,
  getSession,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

async function accessTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const session = getSession(req, res);
    //console.log('session', session);
    const { accessToken } = await getAccessToken(req, res, {
      refresh: true,
    });

    res.status(200).json({ accessToken });
  } catch (error: any) {
    console.error(error);
    res.status(error?.status || 500).json({
      code: error?.code,
      error: error?.message,
    });
  }
}

export default withApiAuthRequired(accessTokenHandler);
