/**
 * ProjectCard Component - Professional project showcase card
 * Follows design system: slate-50 background, blue-800 accents, clean spacing
 */
import React from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "./Card";
import { Heading, Text } from "./Typography";
import { Badge, BadgeGroup } from "./Badge";
import { Button } from "./Button";
import { transitions, cn } from "../../lib/theme";

export const ProjectCard = ({
  title,
  description,
  techStack = [],
  link,
  features = [],
  image,
}) => {
  return (
    <Card
      interactive
      variant="elevated"
      p="lg"
      className="h-full flex flex-col"
    >
      {image && (
        <div className="mb-4 rounded-lg overflow-hidden h-40 bg-slate-100">
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover",
              transitions.default,
              "group-hover:scale-105",
            )}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <Heading as="h4" className="mb-2">
          {title}
        </Heading>

        <Text size="sm" color="slate-600" className="mb-4 flex-1">
          {description}
        </Text>

        {features.length > 0 && (
          <div className="mb-4">
            <Text
              size="xs"
              color="slate-500"
              weight="medium"
              className="mb-2 uppercase"
            >
              Key Features
            </Text>
            <BadgeGroup className="flex flex-wrap gap-2">
              {features.map((feature, idx) => (
                <Badge key={idx} variant="secondary" size="sm">
                  {feature}
                </Badge>
              ))}
            </BadgeGroup>
          </div>
        )}

        {techStack.length > 0 && (
          <div className="mb-4">
            <Text
              size="xs"
              color="slate-500"
              weight="medium"
              className="mb-2 uppercase"
            >
              Tech Stack
            </Text>
            <BadgeGroup className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <Badge key={idx} variant="primary" size="sm">
                  {tech}
                </Badge>
              ))}
            </BadgeGroup>
          </div>
        )}

        {link && (
          <Button
            variant="primary"
            size="sm"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start mt-auto"
          >
            View Project <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

/**
 * CertificateCard Component - Certificate/credential showcase
 */
export const CertificateCard = ({ title, issuer, date, image, link }) => {
  const normalizedSrc = image?.startsWith("/Sertif")
    ? image
    : `/Sertif/${image?.split("/").pop() || ""}`;

  return (
    <a
      href={link || "#"}
      target={link ? "_blank" : undefined}
      rel={link ? "noreferrer" : undefined}
      className="no-underline"
    >
      <Card
        interactive
        variant="default"
        p="md"
        className={cn(
          "h-full flex flex-col cursor-pointer",
          transitions.default,
        )}
      >
        {normalizedSrc && (
          <div className="mb-4 rounded-lg overflow-hidden h-32 bg-slate-200">
            <img
              src={normalizedSrc}
              alt={title}
              className={cn(
                "w-full h-full object-cover",
                transitions.default,
                "group-hover:scale-105",
              )}
              loading="lazy"
            />
          </div>
        )}

        <Heading as="h5" className="mb-1 text-lg">
          {title}
        </Heading>

        <Text size="xs" color="slate-500" className="mb-1">
          {issuer}
        </Text>

        <Text size="xs" color="slate-400" weight="medium">
          {date}
        </Text>

        {link && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <Text
              size="xs"
              color="blue-800"
              weight="semibold"
              className="flex items-center gap-1"
            >
              View Certificate <ExternalLink className="w-3 h-3" />
            </Text>
          </div>
        )}
      </Card>
    </a>
  );
};
