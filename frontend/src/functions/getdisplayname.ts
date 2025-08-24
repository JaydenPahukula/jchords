export function getDisplayName(displayName: string | undefined | null): string {
  return displayName?.trim() ?? 'Anonymous';
}
