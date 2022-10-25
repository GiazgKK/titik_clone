import { topicPostsQuery } from './../../../utils/queries';
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
    const {topic} = req.query ;

    const videosQuery = topicPostsQuery(topic) ;

    const videos = await client.fetch(videosQuery) ;

    res.status(200).json(videos)
    
    
  }
}
 