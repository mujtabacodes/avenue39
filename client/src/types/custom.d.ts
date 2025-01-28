import React from "react";

declare namespace JSX {
    interface IntrinsicElements {
      ambientLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }