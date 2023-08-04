'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiOutlineCamera } from 'react-icons/ai';
import { useState, useRef } from 'react';
import MenuItem from '@/components/menuItem';
import { SiWhatsapp } from 'react-icons/si';
import { RiWhatsappFill } from 'react-icons/ri';
import PhotoPicker from '@/components/PhotoPicker';
import { useEffect } from 'react';

const page = () => {
  const { data: session, status } = useSession();
  const [Hover, setHover] = useState(false);
  const [Coordinate, setCoodinate] = useState({ x: 0, y: 0 });
  const [Menu, seMenu] = useState(false);
  const [showContextMenu, setshowContextMenu] = useState(false);
  const [image, setimage] = useState('/default_avatar.png');
  const [GrabPhoto, setGrabPhoto] = useState(false);
  console.log({ Bsession: session });

  useEffect(() => {
    if (GrabPhoto) {
      const data = document.getElementById('photo-picker');
      data.click();
      document.body.onfocus = (e) => {
        setGrabPhoto(false);
      };
    }
  }, [GrabPhoto]);
  const options = [
    {
      name: 'Take Photos',
    },
    { name: ' Choose from Library' },
    { name: 'Upload Photo' },
    { name: 'Remove Photo' },
  ];

  const photoPickChange = async (e) => {
    console.log('we here');
    console.log(e);
    const file = e.target.files[0];
  };

  return (
    <div className="flex min-h-screen  w-[60%] m-auto flex-col items-center justify-center p-24">
      <div className="flex gap-3 w-full items-center justify-center ">
        <RiWhatsappFill className="w-[200px] h-[150px] text-[#25D366]" />
        <h1 className="text-white text-[50px]">WhatsApp</h1>
      </div>
      <h1 className="text-white text-[20px]">Create your Profile</h1>
      <div className="flex gap-3 items-center justify-center">
        <form className="flex flex-col gap-2">
          <label className="text-white text-[12px]">Display Name:</label>
          <input className=" p-2 rounded-sm" placeholder="Display Name" />
          <label className="text-white text-[12px]">About:</label>
          <input className=" p-2 rounded-sm" placeholder="About" />
        </form>
        <div
          onMouseLeave={() => {
            setHover(false);
          }}
          onMouseEnter={() => {
            setHover(true);
          }}
          className="relative flex items-center  justify-center w-[300px] h-[300px]"
          id="context-opener"
        >
          <Image src={image} width={256} height={128} />
          <div
            onClick={(e) => {
              setCoodinate({ x: e.pageX, y: e.pageY });
              setshowContextMenu(!showContextMenu);
            }}
            className={`absolute ${
              Hover ? 'bg-black/40' : 'bg-transparent'
            } cursor-pointer opacity-50 rounded-full flex flex-col items-center justify-center text-white p-3 m-auto inset-0`}
          >
            <AiOutlineCamera className="w-[45px] h-[45px]" />
            <h1 className="font-semibold text-[20px] text-white">
              Add your avatar{' '}
            </h1>
          </div>
        </div>
      </div>
      {GrabPhoto && <PhotoPicker change={photoPickChange} />}
      {showContextMenu && (
        <MenuItem
          Coordinate={Coordinate}
          options={options}
          showContextMenu={showContextMenu}
          setshowContextMenu={setshowContextMenu}
          setGrabPhoto={setGrabPhoto}
        />
      )}
    </div>
  );
};

export default page;
