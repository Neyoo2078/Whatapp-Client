import { connectionDb } from '@/utils/dataBase';
import Users from '@/model/User';
import data from '../../../../lib/data';

export const GET = async (req, { params }) => {
  try {
    await connectionDb();
    const data = await Users.find({})
      .sort({
        displayName: 1,
      })
      .select('_id displayName avatar about email');

    const removerActiveUser = data.filter(
      (items) => items._id.toString() !== params.id
    );

    const groupedUsers = {};
    if (removerActiveUser) {
      for (const user of removerActiveUser) {
        const firstLetter = user.displayName.charAt(0).toLowerCase();

        if (!groupedUsers[firstLetter]) {
          groupedUsers[firstLetter] = [];
        }

        groupedUsers[firstLetter].push(user);
      }
      return new Response(JSON.stringify({ removerActiveUser, groupedUsers }), {
        status: '200',
      });
    }
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};

export const POST = async () => {
  try {
    await connectionDb();
    await Users.insertMany();
  } catch (error) {}
};
