import { client } from './../../utils/client';
import { allUsersQuery } from './../../utils/queries';
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
    const data = await client.fetch(allUsersQuery()) ;

    if(data) {
       res.status(200).json(data) 
    }
    else {
      res.json([])
    }
    
  }
  
}
 