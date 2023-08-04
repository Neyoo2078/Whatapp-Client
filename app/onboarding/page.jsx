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
import PhotoLib from '@/components/PhotoLib';
import { useFormik } from 'formik';
import Camera from '@/components/Camera';
import Validate from '@/components/Validate';
import { useRouter } from 'next/navigation';
import { RoundaboutRightSharp } from '@mui/icons-material';

const page = () => {
  const { data: session, status } = useSession();

  console.log({ session });

  const [Hover, setHover] = useState(false);
  const [Coordinate, setCoodinate] = useState({ x: 0, y: 0 });

  const [showContextMenu, setshowContextMenu] = useState(false);
  const [image, setimage] = useState('/default_avatar.png');
  const [GrabPhoto, setGrabPhoto] = useState(false);
  const [ShowPhotoLib, setShowPhotoLib] = useState(false);
  const [ShowCamera, setShowCamera] = useState(false);

  const [updateData, setupDate] = useState({
    avatar: '/default_avatar.png',
  });

  const router = useRouter();

  useEffect(() => {
    if (session) {
      const {
        user: { newUser },
      } = session;
      if (!newUser) {
        router.push('/chat');
      }
    }
  }, [session]);

  useEffect(() => {
    setupDate({ ...updateData, avatar: image });
  }, [image]);
  const formik = useFormik({
    initialValues: {
      displayName: '',
      about: '',
    },
    onSubmit: async (values) => {
      const res = await fetch(`/api/update/${session.user.id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...updateData,
          newUser: false,
          displayName: values.displayName,
          about: values.about,
        }),
      });
      const data = await res.json();

      router.push('/chat');
    },
    validate: Validate,
  });

  useEffect(() => {
    if (GrabPhoto) {
      const data = document.getElementById('photo-picker');
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [GrabPhoto]);
  const options = [
    {
      name: 'Take Photos',
    },
    { name: 'Choose from Library' },
    { name: 'Upload Photo' },
    { name: 'Remove Photo' },
  ];

  const photoPickChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute('data-src', event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setimage(data.src);
    }, 100);
  };

  return (
    <div className="flex min-h-screen  w-[60%] m-auto flex-col items-center justify-center p-24">
      <div className="flex gap-3 w-full items-center justify-center ">
        <RiWhatsappFill className="w-[200px] h-[150px] text-[#25D366]" />
        <h1 className="text-white text-[50px]">WhatsApp</h1>
      </div>
      <h1 className="text-white text-[20px]">Create your Profile</h1>
      <div className="flex gap-3 items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <label className="text-white text-[12px]">Display Name:</label>
          {formik.errors.displayName && formik.touched.displayName && (
            <h1 className="text-[#d52626]">{formik.errors.displayName}</h1>
          )}
          <input
            value={formik?.values.displayName}
            className=" p-2 rounded-sm"
            placeholder="Display Name"
            {...formik.getFieldProps('displayName')}
          />
          <label className="text-white text-[12px]">About:</label>
          {formik.errors.about && formik.touched.about && (
            <h1 className="text-[#d52626]">{formik.errors.about}</h1>
          )}
          <input
            value={formik?.values.about}
            className=" p-2 rounded-sm"
            placeholder="About"
            {...formik.getFieldProps('about')}
          />
          <button
            type="submit"
            className="p-2 text-white bg-[#25D366]/50 rounded-sm"
          >
            Update Profile
          </button>
        </form>
        <div
          onMouseLeave={() => {
            setHover(false);
          }}
          onMouseEnter={() => {
            setHover(true);
          }}
          className="relative flex items-center  justify-center w-[200px] h-[200px]"
          id="context-opener"
        >
          <Image
            src={image}
            width={256}
            height={256}
            className="rounded-full w-[200px]  h-[200px]"
          />
          <div
            onClick={(e) => {
              setCoodinate({ x: e.pageX, y: e.pageY });
              setshowContextMenu(!showContextMenu);
            }}
            className={`absolute ${
              Hover ? 'bg-black/40' : 'bg-transparent'
            } cursor-pointer opacity-50 rounded-full flex flex-col items-center justify-center text-white p-3 m-auto inset-0`}
          >
            {Hover && (
              <div className=" flex flex-col items-center justify-center">
                <AiOutlineCamera className="w-[45px] h-[45px]" />
                <h1 className="font-semibold text-[20px] text-white">
                  Add your avatar{' '}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      {GrabPhoto && <PhotoPicker change={photoPickChange} />}
      {ShowPhotoLib && (
        <PhotoLib setShowPhotoLib={setShowPhotoLib} setimage={setimage} />
      )}
      {ShowCamera && (
        <Camera setShowCamera={setShowCamera} setimage={setimage} />
      )}

      {showContextMenu && (
        <MenuItem
          Coordinate={Coordinate}
          options={options}
          showContextMenu={showContextMenu}
          setshowContextMenu={setshowContextMenu}
          setGrabPhoto={setGrabPhoto}
          setimage={setimage}
          setShowPhotoLib={setShowPhotoLib}
          setShowCamera={setShowCamera}
        />
      )}
    </div>
  );
};

export default page;
