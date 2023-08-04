import { connectionDb } from '@/utils/dataBase';
import Messages from '@/model/message';

export const GET = async (req, { params }) => {
  const { to, from } = params;
  try {
    await connectionDb();
    const data = await Messages.find({
      $or: [
        { senderId: from, receiverId: to },
        { senderId: to, receiverId: from },
      ],
    });

    return new Response(JSON.stringify(data), {
      status: '200',
    });
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};
