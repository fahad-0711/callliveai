export function formatCurrency(value) {
  if (typeof value === 'string') {
    return value; // Already formatted like "₹85L"
  }
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(0)}L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatCompactNumber(num) {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(0)}L`;
  }
  return num.toLocaleString('en-IN');
}
