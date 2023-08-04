import { connectionDb } from '@utils/dataBase';
import Prompt from '@model/PromptModel';
import { TryOutlined } from '@mui/icons-material';

export const GET = async (req, { params }) => {
  console.log('we are at get');
  console.log(params.id);
  try {
    await connectionDb();
    const data = await Prompt.findById(params.id);
    return new Response(JSON.stringify(data), { status: '200' });
  } catch (error) {}
};

export const POST = async (req, { params }) => {
  const body = await req.json();
  const headers = req.headers;
  const authorization = headers.get('Authorization');
  console.log({ HEADER: authorization });
  try {
    await connectionDb();
    const data = await Prompt.findByIdAndUpdate(params.id, {
      prompt: body.prompt,
      tag: body.tag,
    });
    return new Response(JSON.stringify(data), { status: '200' });
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};

export const DELETE = async (req, { params }) => {
  console.log(params.id);
  console.log('delete');
  try {
    await connectionDb();
    await Prompt.findByIdAndDelete(params.id);
    return new Response('post deleted succesfully', { status: '200' });
  } catch (error) {
    return new Response(error, { status: '400' });
  }
};
