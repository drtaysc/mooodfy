import { sql } from './db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

export interface User {
  id: string | number;
  email: string;
  role: string;
}

// 生成会话令牌
export function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

// 验证密码
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 哈希密码
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// 创建会话
export async function createSession(userId: string | number): Promise<string> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7天后过期

  await sql`
    INSERT INTO sessions (user_id, session_token, expires_at)
    VALUES (${userId}, ${sessionToken}, ${expiresAt.toISOString()})
  `;

  return sessionToken;
}

// 获取当前用户
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const result = await sql`
      SELECT u.id, u.email, u.role
      FROM users u
      INNER JOIN sessions s ON u.id = s.user_id
      WHERE s.session_token = ${sessionToken}
        AND s.expires_at > NOW()
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// 删除会话
export async function deleteSession(sessionToken: string): Promise<void> {
  await sql`
    DELETE FROM sessions
    WHERE session_token = ${sessionToken}
  `;
}

// 验证用户凭据
export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, password_hash, role
      FROM users
      WHERE email = ${email}
    `;

    if (result.length === 0) {
      return null;
    }

    const user = result[0] as { id: string | number; email: string; password_hash: string; role: string };
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return null;
  }
}

