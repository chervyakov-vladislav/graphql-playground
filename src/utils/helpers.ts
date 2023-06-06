import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data &&
    'errors' in error.data &&
    Array.isArray(error.data.errors) &&
    error.data.errors[0] &&
    'message' in error.data.errors[0] &&
    typeof error.data.errors[0].message === 'string'
  );
}

export function millisecondsInSec(time: number) {
  const newNumber = Number((time / 1000).toFixed(2));
  return Math.floor(newNumber) > 0 ? newNumber + 's' : time + 'ms';
}

export function convertBytes(bytes: number) {
  if (bytes < 1024) {
    return bytes + 'B';
  } else {
    return (bytes / 1024).toFixed(1) + 'KB';
  }
}
