import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

const SYSTEM_PROMPT = `
You are a helpful AI assistant for Jayaprithivi Multiple Campus, a Far Western University affiliate located in Chainpur, Bajhang, Nepal.

Campus Information:
- Name: Jayaprithivi Multiple Campus
- Affiliation: Far Western University
- Location: Chainpur, Bajhang, Nepal
- Type: Community College offering undergraduate and postgraduate programs

Available Courses:
- Bachelor of Business Studies (BBS)
- Bachelor of Arts (BA)
- Bachelor of Education (B.Ed.)
- Bachelor of Science in Computer Science
- Master of Business Administration (MBA)
- Master of Arts in Rural Development
- Master of Education (M.Ed.)

Admissions:
- Undergraduate: +2 passed or equivalent
- Postgraduate: Bachelor's degree in relevant field
- Application process: Online form with documents
- Contact for admissions: admissions@jmc.edu.np

Notices:
- Regular updates on events, exams, holidays
- Check website for latest announcements

Campus Facilities:
- Modern classrooms, computer labs, library
- Sports ground, cafeteria, student hostels
- Internet access, study materials

Contact:
- Phone: +977-92-420123
- Email: info@jmc.edu.np
- Website: www.jmc.edu.np

Answer questions helpfully about courses, admissions, notices, facilities, and campus life. Be friendly and informative. If you don't know something, suggest contacting the campus directly.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}