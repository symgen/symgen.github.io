"use client";

import { Button } from "@/components/ui/button";

import {
  Separator,
  Text,
  Strong,
  Heading,
  HoverCard,
  Link,
  Avatar,
  Flex,
  Box,
  Section,
  Theme,
} from "@radix-ui/themes";

import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("../components/no-ssr"), { ssr: false });

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

const AuthorHoverCard = (author: (typeof AUTHORS)[0]) => (
  <HoverCard.Root>
    <HoverCard.Trigger>
      <Link href={author.website} target="_blank">
        {author.name}
      </Link>
    </HoverCard.Trigger>
    <HoverCard.Content>
      <Flex gap="4">
        <Avatar size="3" fallback="R" radius="large" src={author.avatar} />
        <Box>
          <Heading size="3" as="h3">
            {author.name}
          </Heading>
          <Text as="div" size="2" color="gray">
            {author.affiliation}
          </Text>

          <Text as="div" size="2" style={{ maxWidth: 300 }} mt="3">
            <Strong>Email:</Strong>{" "}
            <Link href={`mailto:${author.email}`}>{author.email}</Link>
          </Text>
        </Box>
      </Flex>
    </HoverCard.Content>
  </HoverCard.Root>
);

const Headline = () => (
  <Section size="2">
    <Text size="4">
      <Heading size="8">{TITLE}</Heading>
      <Separator my="3" size="4" />
      <Flex gap="3" align="center">
        {AUTHORS.map((author, index) => (
          <Box key={index} mr="5">
            {AuthorHoverCard(author)}
          </Box>
        ))}
      </Flex>
    </Text>
  </Section>
);

export default function Home() {
  return (
    <Theme>
      <main className="flex min-h-screen flex-col items-center p-24">
        <Headline />
        <Button className="mt-5">Demo coming soon</Button>
      </main>
    </Theme>
  );
}
