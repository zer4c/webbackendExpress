const pad = (n: number) => String(n).padStart(2, "0");

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "Sin fecha";

  const d = new Date(dateStr);
  const dd = pad(d.getUTCDate());
  const mm = pad(d.getUTCMonth() + 1);
  const yyyy = d.getUTCFullYear();
  const hh = pad(d.getUTCHours());
  const min = pad(d.getUTCMinutes());

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export function toInputDatetimeLocal(
  dateStr: string | null | undefined,
): string {
  if (!dateStr) return "";

  const d = new Date(dateStr);
  const yyyy = d.getUTCFullYear();
  const mm = pad(d.getUTCMonth() + 1);
  const dd = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const min = pad(d.getUTCMinutes());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
