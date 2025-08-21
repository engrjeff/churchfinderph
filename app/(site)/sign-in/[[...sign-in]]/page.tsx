import { SignIn } from '@clerk/nextjs';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-6 py-10 items-center justify-center">
      <h1 className="text-center font-bold text-2xl">
        Welcome to ChurchFinder PH
      </h1>
      <SignIn />
    </div>
  );
}
