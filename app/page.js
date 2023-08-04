'use client';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from '@/components/Nav';
import GoogleIcon from '@mui/icons-material/Google';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-center p-24">
      <Image width={250} height={250} src="/whatsapp.gif" alt="whatapp logo" />
      <button
        onClick={() => {
          signIn('google');
        }}
        className="bg-white border-none flex items-center gap-1 rounded-md p-3"
      >
        <FcGoogle className="text-[#4285F4] w-7 h-7" />
        LogIn with Google
      </button>
    </main>
  );
}
