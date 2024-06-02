import { AppConstants } from "@/utils/resources";
import { Dayjs } from "dayjs";

export function dateToString(date: Dayjs, showTime = false) {
  let format = AppConstants.DATE_FORMAT;
  if (showTime) format = AppConstants.DATE_TIME_FORMAT
  return date.format(format);
}

export function dateToTimeString(date: Dayjs) {
  const format = AppConstants.TIME_FORMAT;
  return date.format(format);
}

export function dateToISOString(date: Dayjs) {
  return date.toISOString();
}

export enum EInvalidDate {
  INVALID_DATE = 'Invalid Date'
}