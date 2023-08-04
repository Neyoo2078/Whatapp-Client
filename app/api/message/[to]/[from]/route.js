import { connectionDb } from '@/utils/dataBase';
import Messages from '@/model/message';

export const POST = async (req, { params }) => {
  const { to, from } = params;
  const { message } = await req.json();

  if (message && to && from) {
    await connectionDb();
    const data = await Messages.create({
      senderId: from,
      receiverId: to,
      message,
      messageStatus: 'sent',
    });

    return new Response(JSON.stringify(data), { status: '200' });
  }
};

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

    const unReadMessages = [];
    data.forEach((items, index) => {
      if (items.messageStatus !== 'read' && items.senderId.toString() === to) {
        data[index].messageStatus = 'read';
        unReadMessages.push(items._id);
      }
    });

    const UpdateData = await Messages.updateMany(
      {
        _id: { $in: unReadMessages },
      },
      { $set: { messageStatus: 'read' } },
      { new: true }
    );
    return new Response(JSON.stringify(data), {
      status: '200',
    });
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};
