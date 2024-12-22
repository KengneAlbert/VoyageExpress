export const formatDate = (date: Date | string, format: string = 'dd/MM/yyyy'): string => {

  const d = new Date(date);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  

  return format

    .replace('dd', d.getDate().toString().padStart(2, '0'))

    .replace('MM', (d.getMonth() + 1).toString().padStart(2, '0'))

    .replace('yyyy', d.getFullYear().toString())

    .replace('MMMM', months[d.getMonth()]);

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