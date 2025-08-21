'use client';

import { CommandList } from 'cmdk';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AutocompleteProps {
  placeholderText: string;
  searchText: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

export function Autocomplete({
  placeholderText,
  searchText,
  value,
  onChange,
  options,
  disabled,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find(
    (option) => option.value.toLowerCase() === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between shadow-none"
          disabled={disabled}
        >
          {value
            ? selectedOption
              ? selectedOption.label
              : placeholderText
            : placeholderText}
          <ChevronDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-h-[400px] overflow-y-auto p-0 w-[var(--radix-popover-trigger-width)]"
        align="start"
      >
        <Command
          filter={(value, search) => {
            if (
              options
                .find((i) => i.value === value)
                ?.label.toLowerCase()
                .includes(search.toLowerCase())
            )
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={searchText} className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) {
                      onChange(currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
