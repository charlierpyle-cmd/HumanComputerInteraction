// Each side of a trade has its own color, used for the header stripe, headings
// and the main button, so buying and selling screens never look alike.
export const sides = {
  buying: {
    label: "Buying",
    bg: "bg-buying",
    text: "text-buying",
    onDark: "text-buying-light",
    tint: "bg-buying/10",
    border: "border-buying",
    radio: "accent-buying",
    checked: "has-checked:border-buying has-checked:bg-buying/10",
  },
  selling: {
    label: "Selling",
    bg: "bg-selling",
    text: "text-selling",
    onDark: "text-selling-light",
    tint: "bg-selling/10",
    border: "border-selling",
    radio: "accent-selling",
    checked: "has-checked:border-selling has-checked:bg-selling/10",
  },
};

// Disabled is how a button looks while its tap is being handled.
const buttonBase =
  "block w-full rounded-lg px-4 py-3.5 text-center text-[15px] font-semibold transition-colors disabled:opacity-70";

export const primaryButton = {
  buying: `${buttonBase} bg-buying text-white hover:bg-buying-dark`,
  selling: `${buttonBase} bg-selling text-white hover:bg-selling-dark`,
};

export const secondaryButton = `${buttonBase} border border-line bg-card text-ink hover:border-ink/50 hover:bg-white`;

// Only for the final tap of something that removes what the student posted.
export const dangerButton = `${buttonBase} bg-danger text-white hover:bg-danger-dark`;

// A quiet text action that still reads as tappable, with a full-size target.
export const textLink =
  "inline-flex min-h-11 items-center justify-center px-2 text-sm font-medium underline underline-offset-2 hover:decoration-2";

// Surfaces. A card that leads somewhere also reacts when hovered.
export const card = "rounded-lg border border-line bg-card";
export const cardLink = `${card} block transition-colors hover:border-ink/50 hover:bg-white`;

// Type scale: screen titles live in ScreenHeader; these cover the rest.
export const sectionHeading = "text-lg font-bold";
export const fieldLabel = "text-sm font-semibold";
export const fieldInput =
  "rounded-lg border border-line bg-white px-3.5 py-3 text-[15px] placeholder:text-muted";
