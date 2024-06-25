export function convertToDateTimeFormat(date: Date) {
  return getDateTimeFormat().format(date);
}

export function convertToDateFormat(date: Date) {
  return getDateFormat().format(date);
}

export function convertToTimeFormat(date: Date) {
  return getTimeFormat().format(date);
}

const dateFormat: Intl.DateTimeFormatOptions = {
  timeZone: 'CET',
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
};

const timeFormat: Intl.DateTimeFormatOptions = {
  timeZone: 'CET',
  hour: 'numeric',
  minute: 'numeric',
};
const dateTimeFormat: Intl.DateTimeFormatOptions = {
  timeZone: 'CET',
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

function getDateTimeFormat() {
  return new Intl.DateTimeFormat(
    'da-DK',
    dateTimeFormat,
  );
}

function getDateFormat() {
  return new Intl.DateTimeFormat(
    'da-DK',
    dateFormat,
  );
}

function getTimeFormat() {
  return new Intl.DateTimeFormat(
    'da-DK',
    timeFormat,
  );
}