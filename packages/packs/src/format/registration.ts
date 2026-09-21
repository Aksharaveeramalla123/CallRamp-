export function formatRegistration(plate: string): string {
    const normalized = plate.replace(/\s+/g, '').toUpperCase();
  
    if (normalized.length <= 3) {
      return normalized;
    }
  
    return `${normalized.slice(0, -3)} ${normalized.slice(-3)}`;
  }