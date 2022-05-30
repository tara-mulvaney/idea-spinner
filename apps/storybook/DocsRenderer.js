import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

export const DocsRenderer = ({ docs }) => (
  React.createElement(
    ReactMarkdown,
    {
      remarkPlugins: [remarkGfm],
      linkTarget: "_blank",
      components: {
        code({ node, inline, className, children, ...props }) {
          const [, language] = /language-(\w+)/.exec(className ?? "") ?? [];

          return !inline && language
            ? React.createElement(SyntaxHighlighter, { language, PreTag: "div", ...props }, String(children).replace(/\n$/, ""))
            : React.createElement("code", { className, ...props }, children);
        }
      }
    },
    docs
  )
);