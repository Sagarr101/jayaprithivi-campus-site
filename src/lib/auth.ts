import { cookies } from 'next/headers';

export async function getAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'true';
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', 'true', {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}