"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Preset, Example, types } from "../data/presets";

export const useMutationObserver = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: MutationCallback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [ref, callback, options]);
};

interface ExampleSelectorProps extends PopoverProps {
  examples: Example[];
  selectedExample: Example | undefined;
  setSelectedExample: (example: Example) => void;
}

export function ExampleSelector({
  examples,
  selectedExample,
  setSelectedExample,
  ...props
}: ExampleSelectorProps) {
  const allExampleNames = Array.from(new Set(examples.map((example) => example.name)));
  const [open, setOpen] = React.useState(false);
  const [peekedExample, setPeekedExample] = React.useState<Preset>(examples[0]);

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedExample
              ? selectedExample.prompt
              : "Select a task with generated examples..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <Command loop>
            <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
              <CommandInput placeholder="Search Examples..." />
              <CommandEmpty>No Example found.</CommandEmpty>
              {allExampleNames.map((name) => (
                <CommandGroup key={name} heading={name}>
                  {examples
                    .filter((example) => example.name === name)
                    .map((example) => {
                      return (
                        <ModelItem
                          key={example.id}
                          model={example}
                          isSelected={selectedExample?.id === example.id}
                          onPeek={(example) => setPeekedExample(example)}
                          onSelect={() => {
                            setSelectedExample(example);
                            setOpen(false);
                          }}
                        />
                      );
                    })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Example;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Preset) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground text-xs"
    >
      {model.prompt}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}
