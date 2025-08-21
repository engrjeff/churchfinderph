import { SignUp } from '@clerk/nextjs';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col py-10 gap-6 items-center justify-center">
      <h1 className="text-center font-bold text-2xl">
        Welcome to ChurchFinder PH
      </h1>
      <SignUp />
    </div>
  );
}
