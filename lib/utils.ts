import { logout } from "@/actions/auth.actions";
import { type ClassValue, clsx } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertUrlToFile = async (url: string) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const blob = new Blob([buffer], { type: getMimeTypeFromUrl(url) });
  return new File([blob], getFileNameFromUrl(url), { type: getMimeTypeFromUrl(url) });
}

const getFileNameFromUrl = (url: string): string => {
  return url.split('/').pop() || '';
}

const getMimeTypeFromUrl = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'pdf':
      return 'application/pdf';
    // می‌توانید فرمت‌های دیگری نیز اضافه کنید
    default:
      return 'application/octet-stream'; // نوع پیش‌فرض برای فایل‌های ناشناخته
  }
}

export const isEmptyObject = (obj: object) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getRandomFourDigit() {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

export async function sendSms(data: object) {
  await fetch("http://ippanel.com/api/select", {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function handleLogout() {
  await toast.promise(
    logout(),
    {
      loading: 'در حال خروج از حساب کاربری',
      success: ({ message }) => message!,
      error: ({ error }) => error!,
    }
  )
    .then(() => window.location.href = "/login")
}