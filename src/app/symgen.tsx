import React, { RefObject, useRef, useState } from "react";
import {
  Theme,
  Button,
  Text,
  Strong,
  Code,
  Heading,
  Grid,
  Box,
  Flex,
  Switch,
  Badge,
  Section,
  Container,
} from "@radix-ui/themes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Handlebars from "handlebars";
import { Example } from "./data/presets";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

interface JsonDisplayProps {
  data: JsonValue;
  entryId: string;
  jsonFieldRef: React.MutableRefObject<Record<string, RefObject<HTMLDivElement>>>
  parentFields?: Array<string | number>;
}

export const JsonDisplay = ({
  data,
  entryId,
  jsonFieldRef,
  parentFields = [],
}: JsonDisplayProps) => {
  const renderValue = (
    key: string,
    value: JsonValue,
    index: number,
    parentFields: Array<string | number> = []
  ): React.ReactNode => {
    if (jsonFieldRef.current[parentFields.toString()] === undefined) {
      jsonFieldRef.current[parentFields.toString()] = React.createRef();
    }
    return (
      <div
        className="flex json-entry"
        ref={jsonFieldRef.current[parentFields.toString()]}
      >
        <div
          key={`${entryId}-${parentFields.toString()}`}
          className="w-1/5 json-field border-t py-2 overflow-wrap break-words text-left pl-2"
        >
          <strong key={`${entryId}-${parentFields.toString()}-key`}>
            {key}
          </strong>
          {/* <Strong>{parentFields.toString()}</Strong> */}
        </div>
        <div className="w-4/5">
          {typeof value === "string" || typeof value === "number" ? (
            <div
              key={`${entryId}-${parentFields.toString()}-value`}
              className="json-value border-t py-2 "
            >
              <code className="font-mono p-1 rounded-md text-xs">
                {value.toString()}
              </code>
            </div>
          ) : Array.isArray(value) ? (
            <JsonDisplay
              data={Object.assign(
                {},
                ...value.map((item, index) => ({ [index]: item }))
              )}
              jsonFieldRef={jsonFieldRef}
              parentFields={parentFields.slice(0, -1).concat([key])}
              entryId={entryId}
            />
          ) : typeof value === "object" && value !== null ? (
            <JsonDisplay
              data={value}
              jsonFieldRef={jsonFieldRef}
              parentFields={parentFields.slice(0, -1).concat([key])}
              entryId={entryId}
            />
          ) : value == null ? (
            <div
              key={`${entryId}-${parentFields.toString()}-value`}
              className="json-value"
            >
              null
            </div>
          ) : (
            <div
              key={`${entryId}-${parentFields.toString()}-value`}
              className="json-value"
            >{`${key}: [Unsupported Type]`}</div>
          )}
        </div>
      </div>
    );
  };

  if (typeof data === "object" && !Array.isArray(data) && data !== null) {
    return (
      <div>
        {Object.entries(data).map(([key, value], index) => (
          <div key={key + index}>
            {renderValue(key, value, index, parentFields.concat([key]))}
          </div>
        ))}
      </div>
    );
  } else {
    return <div>[Provided data is not an object]</div>;
  }
};

type symgenTextSegment = {
  isHandlebar: boolean;
  originalString: string;
  cleanedString?: string;
  variables?: (string | number)[];
};

const normalizeVariableFormat = (handlebarVariable: string) => {
  return handlebarVariable.replace(
    /\[(['"])?([^\1]+?)\1?\]/g,
    (match, quote, property) => {
      return quote ? `.${property}` : `.[${property}]`; // Add dot for quoted properties or dot and brackets for numeric indices
    }
  );
};

const extractFlattenVariables = (
  normalizedVariable: string
): (string | number)[] => {
  return normalizedVariable
    .split(".")
    .reduce<(string | number)[]>((acc, part) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        // Convert part to a number without the surrounding brackets.
        const num = Number(part.slice(1, -1));
        acc.push(isNaN(num) ? part : num);
      } else if (part !== "") {
        acc.push(part);
      }
      return acc;
    }, []);
};

const processHandlebarSpan = (
  handlebarSpan: string,
  remove_heading_data: boolean = false
) => {
  const handlebarRegex = /\{\{\s*(.+?)\s*\}\}/g;
  const handlebarVariable = handlebarRegex.exec(handlebarSpan)?.[1];
  if (remove_heading_data) {
    return handlebarVariable?.replace(/^data\./, "");
  } else {
    return handlebarVariable;
  }
};

const splitHandlebarString = (symgenText: string): symgenTextSegment[] => {
  const handlebarRegex = /(^|[^{])\{\{[^{}]*\}\}(?!\})/g;
  let lastIndex = 0;
  const output = [];
  symgenText.replace(handlebarRegex, (match, prefix, offset) => {
    // Push non-matching string if it exists
    if (lastIndex < offset + prefix.length) {
      output.push({
        originalString: symgenText.slice(lastIndex, offset + prefix.length),
        isHandleBar: false,
      });
    }

    // Push matching handlebars
    let handlebarVariable = processHandlebarSpan(match, true);
    const normalizedVariable =
      handlebarVariable && normalizeVariableFormat(handlebarVariable);
    const flattenVariables =
      normalizedVariable && extractFlattenVariables(normalizedVariable);

    output.push({
      originalString: match.slice(1, match.length),
      isHandlebar: true,
      cleanedString: `{{ ${normalizedVariable} }}`,
      variables: flattenVariables,
    });
    lastIndex = offset + match.length;
    return match;
  });
  // Push remaining string if it exists
  if (lastIndex < symgenText.length) {
    output.push({
      originalString: symgenText.slice(lastIndex),
      isHandlebar: false,
    });
  }
  return output;
};

interface SymGenTextRenderProps {
  symgenText: string;
  data: JsonValue;
  jsonFieldRef: React.MutableRefObject<Record<string, RefObject<HTMLDivElement>>>;
  isSymGen: boolean;
  entryId: string;
}

export const SymgenTextRender = ({
  symgenText,
  data,
  jsonFieldRef,
  isSymGen,
  entryId,
}: SymGenTextRenderProps) => {
  const scrollToRefWithSegment = (segment: symgenTextSegment) => {
    if (isSymGen) {
      let ref =
        segment.variables &&
        jsonFieldRef.current[segment.variables?.toString()];
      ref && ref.current &&
        ref.current.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  const highlightRefWithSegment = (segment: symgenTextSegment) => {
    if (isSymGen) {
      let ref =
        segment.variables &&
        jsonFieldRef.current[segment.variables?.toString()];

      ref && ref.current && ref.current.classList.add("is-highlight");
    }
  };

  const dehighlightRefWithSegment = (segment: symgenTextSegment) => {
    if (isSymGen) {
      let ref =
        segment.variables &&
        jsonFieldRef.current[segment.variables?.toString()];
      ref && ref.current && ref.current.classList.remove("is-highlight");
    }
  };

  const progressiveRender = (): React.ReactNode[] => {
    return splitHandlebarString(symgenText).map((segment, index) => {
      if (segment.isHandlebar) {
        const template = Handlebars.compile(segment.cleanedString);

        let targetRef =
          segment.variables &&
          jsonFieldRef.current[segment.variables?.toString()];

        try {
          if (isSymGen) {
            return (
              <TooltipProvider delayDuration={100} key={`${entryId}-${index}`}>
                <Tooltip>
                  <TooltipTrigger>
                    <code
                      data-reference={targetRef}
                      className="rendered-span font-mono bg-blue-100 py-0.5 px-1 rounded-md hover:bg-blue-600 hover:text-gray-50 cursor-pointer"
                      onMouseEnter={() => {
                        scrollToRefWithSegment(segment);
                        highlightRefWithSegment(segment);
                      }}
                      onMouseLeave={() => {
                        dehighlightRefWithSegment(segment);
                      }}
                      style={{fontSize: "0.8rem"}}
                    >
                      {template(data)}
                    </code>
                  </TooltipTrigger>
                  <TooltipContent className="TooltipContent" sideOffset={5}>
                    {segment.cleanedString}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          } else {
            return <Text key={`${entryId}-${index}`}>{template(data)}</Text>;
          }
        } catch (e: any) {
          return (
            <code key={`${entryId}-${index}`}>{segment.originalString}</code>
          );
        }
      } else {
        return (
          <Text key={`${entryId}-${index}`}>{segment.originalString}</Text>
        );
      }
    });
  };
  return <div className="leading-6">{progressiveRender()}</div>;
};
