import { connectionDb } from '@/utils/dataBase';
import Users from '@/model/User';

export const POST = async (req, { params }) => {
  try {
    const body = await req.json();

    await connectionDb();
    const data = await Users.findByIdAndUpdate(params.id, { ...body });
    return new Response(JSON.stringify(data), { status: '200' });
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};
