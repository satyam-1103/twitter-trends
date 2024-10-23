"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";

import { frameworks } from "@/utils/common.js";
import { useCountry } from "@/context/countrySelect.js";

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);
  const { selectedCountry, setSelectedCountry } = useCountry(); // Use context here
  const [value, setValue] = React.useState(selectedCountry.value); // Initialize with context value

  const handleSelectCountry = (currentValue) => {
    const selectedFramework = frameworks.find(
      (framework) => framework.value === currentValue
    );
    setValue(selectedFramework.label); // Set local value for display
    setSelectedCountry({
      value: currentValue,
      placeId: selectedFramework.placeId,
    }); // Update context
    setOpen(false); // Close the popover
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between md:w-[550px]"
        >
          {value || "Select your country..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country." className="h-9" />
          <CommandList>
            <CommandEmpty>No Country found...</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelectCountry(framework.value)}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.label ? "opacity-100" : "opacity-0"
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

export function DesktopSidebar() {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { selectedCountry, setSelectedCountry } = useCountry(); // Use context here
  const [value, setValue] = React.useState(selectedCountry.value); // Initialize with context value

  const handleSelectCountry = (framework) => {
    setValue(framework.value === value ? "" : framework.value);
    setSelectedCountry({
      value: framework.value,
      placeId: framework.placeId,
    }); // Update context
    setOpen(false); // Close the sidebar
  };

  return (
    <ScrollArea className="h-screen w-[400px] md:w-[250px] rounded-md p-4 bg-white ">
      <input
        type="text"
        placeholder="Search country."
        className="h-9 w-full mb-2 p-2 border rounded-md"
        onChange={(e) => {
          const searchValue = e.target.value.toLowerCase();
          setSearch(searchValue);
        }}
      />
      <div className="h-full">
        {frameworks
          .filter((framework) =>
            framework.label.toLowerCase().includes(search.toLowerCase())
          )
          .map((framework) => (
            <div
              key={framework.value}
              className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCountry(framework)}
            >
              {framework.label}
              {framework.value === value && (
                <CheckIcon className="h-4 w-4 opacity-100" />
              )}
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}
