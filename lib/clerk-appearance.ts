export const clerkPricingTableAppearance = {
  variables: {
    colorPrimary: '#2563eb',
    colorText: '#111827',
    colorTextOnPrimaryBackground: '#ffffff',
    colorBackground: '#f8fafc',
    colorInputBackground: '#ffffff',
    borderRadius: '0.75rem',
  },
  elements: {
    pricingTableCard: 'rounded-2xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900',
    pricingTableCardHeader: 'border-b border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-950/60',
    pricingTableCardContent: 'bg-transparent',
    pricingTableCardFooter: 'border-t border-gray-200 bg-white/70 dark:border-gray-700 dark:bg-gray-950/50',
    pricingTableButton:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
    pricingTableButton__primary:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
  },
} as const;
