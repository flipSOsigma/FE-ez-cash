import { ReactNode } from "react"
import Cookies from "js-cookie"

export const getToday = ( format? : boolean ) => {
  const date = new Date()
  const days = date.getDate()
  const months = date.getMonth() + 1
  const years = date.getFullYear()
  const today = days + "/" + months + "/" + years

  var [day, month, year] = today.split('/')
  const formattedToday = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${year}-${month}-${day}`));
  return format ? today : formattedToday
}

export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

export const LimitedText = ({ children, limit = 50 }: {children: ReactNode, limit?: number}) => {
const text = children as string
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
}


export const MoneyFixing = ({ children, format, rpext }: { children: ReactNode, format?: boolean, rpext?: boolean}) => {
  const amount = Number(children)
  const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  if( !rpext ) {
    const currency = formatted.replace(',00', '');
    if( format ) {
      return currency.replace('Rp', 'IDR')
    }else{
      return currency.replace('Rp', '')
    }
  }
  return format ? formatted.replace('Rp', 'IDR') : formatted.replace('Rp', '')
}

export const DateFixing = ({ children }: { children: string}) => {
  var [day, month, year] = children.split('/')
  const formatted = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${year}-${month}-${day}`));
  return formatted === getToday() ? '' : formatted;
}

export const makeCookie = (value: string ) => {
  Cookies.set('token', value)
  return true
}

export const encodeBase64 = (text: string): string  => {
  return Buffer.from(text, 'utf8').toString('base64');
}

export const decodeBase64 = (base64Text: string): string => {
  return Buffer.from(base64Text, 'base64').toString('utf8');
}

export const setSession = () => {
  if (!sessionStorage.getItem('user-data')) {
    fetch(window.location.href)
    .then((response) => {
      const userData = response.headers.get('x-user-data');
      if (userData) {
        sessionStorage.setItem('user-data', userData);
      }
    })
    .catch((error) => console.error('Failed to fetch middleware data:', error));
  }
}