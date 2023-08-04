import { connectionDb } from '@/utils/dataBase';
import Users from '@/model/User';

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectionDb();
    const data = await Users.findById(id);
    return new Response(JSON.stringify(data), { status: '200' });
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};
