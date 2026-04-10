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
    pricingTableCard: 'rounded-2xl border border-blue-200 bg-white shadow-sm dark:border-blue-500/40 dark:bg-slate-900',
    pricingTableCardHeader: 'border-b border-blue-100 bg-white dark:border-blue-500/30 dark:bg-slate-900',
    pricingTableCardContent: 'bg-transparent',
    pricingTableCardFooter: 'border-t border-blue-100 bg-white dark:border-blue-500/30 dark:bg-slate-900',
    pricingTableButton:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
    pricingTableButton__primary:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
  },
} as const;
