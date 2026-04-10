export const clerkPricingTableAppearance = {
  variables: {
    colorPrimary: '#2563eb',
    colorText: '#e5e7eb',
    colorTextOnPrimaryBackground: '#ffffff',
    colorBackground: '#0b1220',
    colorInputBackground: '#0f172a',
    borderRadius: '0.75rem',
  },
  elements: {
    pricingTable: 'text-gray-100',
    pricingTableCard: 'rounded-2xl border border-blue-500/40 bg-slate-900/90 text-gray-100 shadow-sm',
    pricingTableCardHeader: 'border-b border-blue-500/30 bg-transparent',
    pricingTableCardTitle: 'text-lg font-semibold text-white',
    pricingTableCardDescription: 'text-sm text-blue-100/90',
    pricingTableCardFee: 'text-3xl font-bold text-white',
    pricingTableCardFeePeriod: 'text-sm text-blue-100/90',
    pricingTableCardFeePeriodNotice: 'text-xs text-blue-100/70',
    pricingTableCardBody: 'bg-transparent',
    pricingTableCardFeaturesList: 'text-sm text-gray-100',
    pricingTableCardFeaturesListItem: 'text-sm text-gray-100',
    pricingTableCardFeaturesListItemTitle: 'text-sm text-gray-100',
    pricingTableCardStatus: 'bg-blue-600 text-white',
    pricingTableCardFooter: 'border-t border-blue-500/30 bg-transparent',
    pricingTableCardFooterNotice: 'text-xs text-blue-100/80',
    pricingTableCardFooterButton:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
    pricingTableButton:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
    pricingTableButton__primary:
      'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
  },
} as const;
