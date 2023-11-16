"use client";
import Link from "next/link";

import React, { RefObject, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BadgeCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./components/page-header";
import { CodeViewer } from "./components/code-viewer";
import { PresetSave } from "./components/preset-save";
import { PresetShare } from "./components/preset-share";
import { PresetActions } from "./components/preset-actions";
import { PresetSelector } from "./components/preset-selector";
import { ModelSelector } from "./components/model-selector";
import { ExampleSelector } from "./components/example-selector";

import { JsonDisplay, SymgenTextRender } from "./symgen";
import { cn } from "@/lib/utils";

import { models, types } from "./data/models";
import { presets, examples, Example, Preset } from "./data/presets";

const TITLE = "Towards Verifiable Text Generation with Symbolic References";

const AUTHORS = [
  {
    name: "Lucas Torroba Hennigen",
    affiliation: "Massachusetts Institute of Technology",
    email: "lucastor@mit.edu",
    website: "https://ltorroba.github.io",
    avatar: "/images/lucas.jpg",
  },
  {
    name: "Shannon Shen",
    affiliation: "Massachusetts Institute of Technology",
    email: "zjshen@mit.edu",
    website: "https://szj.io",
    avatar: "/images/shannon.jpg",
  },
  {
    name: "Ani Nrusimha",
    affiliation: "Massachusetts Institute of Technology",
    email: "anin@mit.edu",
    website: "https://anin.dev",
    avatar: "/images/ani.png",
  },
  {
    name: "Bernhard Gapp",
    affiliation: "Good Data Initiative",
    email: "bernhard.gapp@gooddatainitiative.com",
    website:
      "https://www.gooddatainitiative.com/our-team-profiles/bernhard-gapp",
    avatar: "/images/bernhard.jpg",
  },
  {
    name: "David Sontag",
    affiliation: "Massachusetts Institute of Technology",
    email: "dsontag@mit.edu",
    website: "https://people.csail.mit.edu/dsontag/",
    avatar: "/images/david.jpg",
  },
  {
    name: "Yoon Kim",
    affiliation: "Massachusetts Institute of Technology",
    email: "yoonkim@mit.edu",
    website: "https://people.csail.mit.edu/yoonkim/",
    avatar: "/images/yoon.jpg",
  },
];

const PAPER_URL = "https://arxiv.org/abs/2311.09188";
const BASE_PATH = "";

const AuthorHoverCard = (author: (typeof AUTHORS)[0]) => (
  <HoverCard openDelay={100} closeDelay={100}>
    <HoverCardTrigger className="pr-4" style={{ marginLeft: 0 }}>
      {/* <a href={author.website} target="_blank"> */}
      <Button
        className="px-0"
        variant="link"
        onClick={() => {
          open(author.website, "_blank");
        }}
      >
        {author.name}
      </Button>
      {/* </a> */}
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex justify-between">
        <Avatar className="mr-4">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{author.name}</h4>
          <p className="text-sm">{author.affiliation}</p>
          <div className="flex items-center pt-2 overflow-wrap break-words">
            <strong>Email: </strong>{" "}
            <Link className="pl-0.5" href={`mailto:${author.email}`}>
              {author.email}
            </Link>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

const Headline = () => (
  <PageHeader className="page-header pb-2 pt-0">
    <Link
      href={PAPER_URL}
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:hidden">Check our paper!</span>
      <span className="hidden sm:inline">Check our paper!</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
    <PageHeaderHeading className="tracking-tight">{TITLE}</PageHeaderHeading>
    <PageHeaderDescription>
      We propose SymGen, a method enabling easier{" "}
      <em className="font-serif	">validation</em> of LLM&apos;s output.
    </PageHeaderDescription>
    <Separator className="mb-0.25 mt-2" />
    <div className="flex flex-wrap justify-start items-start align-start space-x-4">
      {AUTHORS.map((author, index) => (
        <React.Fragment key={index}>{AuthorHoverCard(author)}</React.Fragment>
      ))}
    </div>
    <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
      <Link
        href="#interactive-demo"
        className={cn(buttonVariants(), "rounded-[6px]")}
      >
        Interactive Demo
      </Link>
      <Link
        href={PAPER_URL}
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        Paper
      </Link>
    </section>
  </PageHeader>
);

function getFlattenedKeys(
  obj: any,
  prefix: (string | number)[] = []
): (string | number)[][] {
  if (typeof obj !== "object" || obj === null) {
    return [prefix];
  }

  let keys: (string | number)[][] = [];
  for (const [k, v] of Object.entries(obj)) {
    const newPrefix = [...prefix, k];
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        keys = keys.concat(getFlattenedKeys(v[i], newPrefix.concat(i)));
      }
    } else if (typeof v === "object" && v !== null) {
      keys = keys.concat(getFlattenedKeys(v, newPrefix));
    } else {
      keys.push(newPrefix);
    }
  }
  return keys;
}

function getFlattenedStringKeys(obj: any): string[] {
  return getFlattenedKeys(obj).map((key) => key.toString());
}

interface SymGenComponentProps {
  symGenData?: Example;
  isSymGen: boolean;
}

const SymGenComponent = ({ symGenData, isSymGen }: SymGenComponentProps) => {
  let items = symGenData
    ? getFlattenedStringKeys(symGenData["data"])
    : getFlattenedStringKeys(examples[0]["data"]);
  const jsonFieldRef = useRef<Record<string, RefObject<HTMLDivElement>>>(
    items.reduce((acc, item) => {
      acc[item] = React.createRef();
      return acc;
    }, {} as Record<string, RefObject<HTMLDivElement>>)
  );

  useEffect(() => {
    const newRefs = {} as Record<string, RefObject<HTMLDivElement>>;
    items.forEach((item) => {
      // Retain the ref for any item that still exists, otherwise create a new one
      newRefs[item] = jsonFieldRef.current[item] || React.createRef();
    });
    jsonFieldRef.current = newRefs;
  }, [items]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 max-h-[500px] w-full">
        <Label htmlFor="input">JSON</Label>
        <ScrollArea className="h-72 w-full p-6 rounded-md border text-sm">
          {symGenData ? (
            <JsonDisplay
              data={symGenData["data"]}
              entryId={symGenData["id"]}
              jsonFieldRef={jsonFieldRef}
            />
          ) : null}
        </ScrollArea>
      </div>

      <div className="grid h-full gap-6 lg:grid-cols-2">
        <div className="flex flex-1 flex-col space-y-2">
          <Label htmlFor="input">Prompt</Label>
          <Textarea
            id="input"
            value={symGenData ? symGenData["prompt"] : ""}
            className="flex-auto lg:max-h-80"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="instructions">Generation</Label>
          <ScrollArea className="lg:min-h-80 rounded-md border px-3 py-2 text-sm h-80">
            {/* {symGenData["symgenText"]} */}
            {symGenData ? (
              <SymgenTextRender
                symgenText={symGenData["symgenText"]}
                data={symGenData["data"]}
                isSymGen={isSymGen}
                entryId={symGenData["id"]}
                jsonFieldRef={jsonFieldRef}
              />
            ) : null}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

const Playground = () => {
  const [selectedExample, setSelectedExample] = useState<Example>(examples[0]);

  return (
    <div className="">
      <div className="h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold w-full" id="interactive-demo">
            SymGen Interactive Demo
          </h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <ExampleSelector
              examples={examples}
              selectedExample={selectedExample}
              setSelectedExample={setSelectedExample}
            />
            {/* <div className="hidden space-x-2 md:flex">
              <CodeViewer />
            </div>
            <PresetActions /> */}
          </div>
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="symgen" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="flex-col space-y-4 sm:flex md:order-2">
              <div className="grid gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Choose Mode
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Choose between the default and the SymGen generation mode.
                  </HoverCardContent>
                </HoverCard>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="symgen">
                    <BadgeCheck size={16} />
                    <span className="pl-1">SymGen</span>
                  </TabsTrigger>
                  <TabsTrigger value="default">
                    {/* <BadgeCheck size={16}/> */}
                    <span className="pl-1">Default</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <ModelSelector types={types} models={models} />
            </div>
            <div className="md:order-1">
              <TabsContent value="default" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <SymGenComponent
                    symGenData={selectedExample}
                    isSymGen={false}
                  />
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow h-9 px-4 py-2 opacity-50">
                          Submit
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs overflow-wrap whitespace-normal text-left">
                          <p>
                            Direct interaction with OpenAI models will be
                            supported soon.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="symgen" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <SymGenComponent
                    symGenData={selectedExample}
                    isSymGen={true}
                  />
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow h-9 px-4 py-2 opacity-50">
                          Submit
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs overflow-wrap whitespace-normal text-left">
                          <p>
                            Direct interaction with OpenAI API models will be
                            supported soon.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default function Home() {
  return (
    <div className="container min-h-screen relative p-16">
      <Headline />
      <div className="rounded-[0.5rem] border bg-background shadow">
        <Playground />
      </div>
    </div>
  );
}
