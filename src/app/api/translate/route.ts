import { NextResponse } from 'next/server';
import { getTranslationProvider } from '@/services/translation/provider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.text || typeof body.text !== 'string') {
      return NextResponse.json(
        { error: 'Valid text field is required' },
        { status: 400 }
      );
    }
    
    const text = body.text.trim();
    
    if (text.length === 0) {
      return NextResponse.json(
        { error: 'Text cannot be empty' },
        { status: 400 }
      );
    }
    
    if (text.length > 500) {
      return NextResponse.json(
        { error: 'Text exceeds maximum length of 500 characters' },
        { status: 400 }
      );
    }
    
    const provider = getTranslationProvider();
    const result = await provider.translateSanskrit(text);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'The translation service is temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
