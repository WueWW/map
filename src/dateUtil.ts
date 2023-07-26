export function formatDate(d: string): string {
    return new Date(d).toLocaleDateString("de-de", {
        weekday: "short",
        year: undefined,
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}
