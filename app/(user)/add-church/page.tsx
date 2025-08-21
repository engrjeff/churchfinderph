import { Separator } from '@/components/ui/separator';
import { ChurchForm } from '@/features/church/church-form';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Your Church',
};

function AddChurchPage() {
  return (
    <div className="container space-y-6 mx-auto px-4 py-10 max-w-2xl">
      <div>
        <h1 className="text-center text-2xl font-bold">Add your Church.</h1>
        <p className="text-muted-foreground text-center">
          Your church can be a new home for other believers.
        </p>
      </div>
      <Separator />
      <ChurchForm />
    </div>
  );
}

export default AddChurchPage;
