import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);
    // Aqui você poderia integrar com Mailchimp/Resend/DB. Vamos apenas logar.
    // eslint-disable-next-line no-console
    console.log('Newsletter opt-in:', email);
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'invalid';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
