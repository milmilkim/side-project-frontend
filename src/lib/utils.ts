import api from '@/api';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const postToDiscord = async (content: string | object) => {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    return;
  }

  const payload = typeof content === 'string' ? { content } : { content: JSON.stringify(content) };

  if (payload.content.length > 2000) {
    payload.content = `${payload.content.slice(0, 1997)}... (truncated)`;
  }

  try {
    await api.post(process.env.DISCORD_WEBHOOK_URL, payload);
    console.info('Message sent to Discord successfully');
  } catch (error) {
    console.error('Failed to send message to Discord:', error);
  }
};