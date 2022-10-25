import { singleUserQuery,userCreatedPostsQuery,userLikedPostsQuery } from './../../../utils/queries';
import { client } from './../../../utils/client';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === "GET") { 
    const {id} = req.query ;

    const query = singleUserQuery(id) ;
    const userVideoQuery = userCreatedPostsQuery(id) ;
    const userLikedVideoQuery = userLikedPostsQuery(id) ;

    const user  = await client.fetch(query) ;
    const userVideos = await client.fetch(userVideoQuery);
    const userLikedVideos = await client.fetch(userLikedVideoQuery);
    
    res.status(200).json({user: user[0],userVideos,userLikedVideos})


    
  }
}
 