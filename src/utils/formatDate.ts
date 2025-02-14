export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (time: string): string => {
  return time.replace(":", "h");
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("fr-FR") + " FCFA";
};

export const generateCalendarDays = (date: Date): Date[] => {
  const year = date.getFullYear();

  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);

  const lastDay = new Date(year, month + 1, 0);

  const days: Date[] = [];

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return days;
};
