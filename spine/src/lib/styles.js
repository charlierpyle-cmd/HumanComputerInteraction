// Each side of a trade has its own color, used for the header stripe, tags and
// the main button, so buying and selling screens never look alike.
export const sides = {
  buying: {
    label: "Buying",
    bg: "bg-buying",
    text: "text-buying",
    tint: "bg-buying/10",
    border: "border-buying",
  },
  selling: {
    label: "Selling",
    bg: "bg-selling",
    text: "text-selling",
    tint: "bg-selling/10",
    border: "border-selling",
  },
};

const buttonBase =
  "block w-full rounded-lg py-3.5 text-center text-[15px] font-semibold";

export const primaryButton = {
  buying: `${buttonBase} bg-buying text-white`,
  selling: `${buttonBase} bg-selling text-white`,
  neutral: `${buttonBase} bg-gold text-white`,
};

export const secondaryButton = `${buttonBase} border border-line bg-card text-ink`;

// A quiet text action that still reads as tappable.
export const textLink = "text-center text-[13px] font-medium underline underline-offset-2";
