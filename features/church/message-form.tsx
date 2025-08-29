'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';

export function MessageForm({
  churchName,
  churchEmail,
  hideSubtitle,
}: {
  churchName: string;
  churchEmail: string;
  hideSubtitle?: boolean;
}) {
  return (
    <Card className="shadow-none">
      <CardHeader className="items-center gap-0">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Send {churchName} a message</h2>
          {hideSubtitle ? null : (
            <p className="text-muted-foreground">
              Let them know you are visiting their church.
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form>
          <fieldset className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Enter your name here"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email here"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                placeholder="Enter your message here"
                className="h-10"
                rows={6}
                required
              />
            </div>
            <div className="pt-6">
              <SubmitButton type="submit" size="lg" className="w-full">
                Send Message <SendIcon />
              </SubmitButton>
            </div>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
}
