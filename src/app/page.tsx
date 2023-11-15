"use client";

import {
  Text,
  Strong,
  Heading,
  Link,
  Avatar,
  Flex,
  Em,
  Box,
  Section,
  Theme,
} from "@radix-ui/themes";
import {
  ArrowRightIcon,
  CounterClockwiseClockIcon,
} from "@radix-ui/react-icons";
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

import { cn } from "@/lib/utils";

import { models, types } from "./data/models";
import { presets } from "./data/presets";

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

const BASE_PATH = "";

const Headline = () => (
  <PageHeader className="page-header pb-8 pt-4">
    <Link
      href="/docs/changelog"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:hidden">Check our paper!</span>
      <span className="hidden sm:inline">Check our paper!</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
    <PageHeaderHeading className="hidden md:block">{TITLE}</PageHeaderHeading>
    <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
    <PageHeaderDescription>
      We propose SymGen, a method enabling easier <Em>validation</Em> of
      LLM&apos;s output.
    </PageHeaderDescription>
    <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
      <Link href="/docs" className={cn(buttonVariants(), "rounded-[6px]")}>
        Details
      </Link>
      <Link
        href="/components"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        Components
      </Link>
    </section>
  </PageHeader>
);

const PlayGround = () => {
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="complete" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
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
                  <TabsTrigger value="complete">
                    {/* <BadgeCheck size={16}/> */}
                    <span className="pl-1">Default</span>
                  </TabsTrigger>

                  <TabsTrigger value="edit">
                    <BadgeCheck size={16} />
                    <span className="pl-1">SymGen</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <ModelSelector types={types} models={models} />
            </div>
            <div className="md:order-1">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <Textarea
                    placeholder="Write a tagline for an ice cream shop"
                    className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                  />
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <CounterClockwiseClockIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="insert" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                    <Textarea
                      placeholder="We're writing to [inset]. Congrats from OpenAI!"
                      className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                    />
                    <div className="rounded-md border bg-muted"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <CounterClockwiseClockIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="edit" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full gap-6 lg:grid-cols-2">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-1 flex-col space-y-2">
                        <Label htmlFor="input">Input</Label>
                        <Textarea
                          id="input"
                          placeholder="We is going to the market."
                          className="flex-1 lg:min-h-[580px]"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea
                          id="instructions"
                          placeholder="Fix the grammar."
                        />
                      </div>
                    </div>
                    <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <CounterClockwiseClockIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </>
  );
};

export default function Home() {
  return (
    <Theme>
      <div className="container min-h-screen relative p-16">
        <Headline />
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <PlayGround />
        </div>
      </div>
    </Theme>
  );
}
