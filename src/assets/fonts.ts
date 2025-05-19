// Serif fonts
import '@fontsource/playfair-display';
import '@fontsource/merriweather';
import '@fontsource/libre-baskerville';
import '@fontsource/lora';
import '@fontsource/crimson-text';

// Sans-serif fonts
import '@fontsource/inter';
import '@fontsource/roboto';
import '@fontsource/open-sans';
import '@fontsource/poppins';
import '@fontsource/work-sans';

// Monospace fonts
import '@fontsource/jetbrains-mono';
import '@fontsource/fira-code';
import '@fontsource/source-code-pro';
import '@fontsource/ibm-plex-mono';
import '@fontsource/space-mono';

export const fonts = {
  serif: [
    'Playfair Display',
    'Merriweather',
    'Libre Baskerville',
    'Lora',
    'Crimson Text'
  ],
  sans: [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Work Sans'
  ],
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'Source Code Pro',
    'IBM Plex Mono',
    'Space Mono'
  ]
} as const;

export type FontFamily = {
  serif: typeof fonts.serif[number];
  sans: typeof fonts.sans[number];
  mono: typeof fonts.mono[number];
}; 