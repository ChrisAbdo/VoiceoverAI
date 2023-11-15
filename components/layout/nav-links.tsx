import Link from "next/link";
import React from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const socials = [
  {
    name: "GitHub",
    href: "https://www.github.com/ChrisAbdo",
    icon: GitHubLogoIcon,
  },
  {
    name: "Twitter",
    href: "https://www.twitter.com/abdo_eth",
    icon: TwitterLogoIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/christopher-abdo/",
    icon: LinkedInLogoIcon,
  },
];

export default function NavLinks() {
  return (
    <div className="flex items-center space-x-1">
      {socials.map((social) => (
        <Button variant="ghost" size="icon" key={social.name} asChild>
          <Link href={social.href} rel="noopener noreferrer" target="_blank">
            <social.icon className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">{social.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
