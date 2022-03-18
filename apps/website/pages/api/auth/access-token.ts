import {
  withApiAuthRequired,
  getAccessToken,
  getSession,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

// TODO: If we want to increase the security, we can avoid returning the token to the client side.
//  If so, we have to create a proxy API route here, to call our external APIs on behalf of the user.
//  See https://github.com/auth0/nextjs-auth0/blob/main/examples/kitchen-sink-example/pages/api/shows.ts
async function accessTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const session = getSession(req, res);
    console.log('session', session);
    const { accessToken } = await getAccessToken(req, res);

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
