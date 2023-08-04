import Messages from '@/model/message';
import { connectionDb } from '@/utils/dataBase';

export const GET = async (req, { params }) => {
  const { userId } = params;

  try {
    await connectionDb();
    const data = await Messages.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate('senderId receiverId')
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(data), {
      status: '200',
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: '400',
    });
  }
};
