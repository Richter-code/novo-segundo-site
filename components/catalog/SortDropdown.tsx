'use client';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

const sortOptions = [
  { id: 'newest', label: 'Mais Relevantes' },
  { id: 'priceAsc', label: 'Menor Preço' },
  { id: 'priceDesc', label: 'Maior Preço' },
  { id: 'nameAsc', label: 'A - Z' },
  { id: 'nameDesc', label: 'Z - A' },
];

interface SortDropdownProps {
  onSortChange: (sortId: string) => void;
  defaultSort?: string;
}

export default function SortDropdown({
  onSortChange,
  defaultSort = 'newest',
}: SortDropdownProps) {
  const initialOption =
    sortOptions.find((opt) => opt.id === defaultSort) || sortOptions[0];
  const [selected, setSelected] = useState(initialOption);

  return (
    <div className="w-48">
      <Listbox
        value={selected}
        onChange={(opt) => {
          setSelected(opt);
          onSortChange(opt.id);
        }}
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-900 dark:text-gray-100'
                    }`
                  }
                  value={option}
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          isSelected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {isSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
