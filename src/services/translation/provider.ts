import { TranslationResult } from '@/types';

export interface TranslationProvider {
  translateSanskrit(text: string): Promise<TranslationResult>;
}

export class APITranslationProvider implements TranslationProvider {
  async translateSanskrit(text: string): Promise<TranslationResult> {
    const apiUrl = process.env.ML_API_URL || 'https://sanskritai.onrender.com/translate';
    const apiKey = process.env.MODEL_API_KEY || 'your_api_key_here';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`ML API Error: ${response.status} ${response.statusText}`);
    }

    const data: TranslationResult = await response.json();
    return data;
  }
}

export class MockTranslationProvider implements TranslationProvider {
  async translateSanskrit(text: string): Promise<TranslationResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const cleanText = text.trim();

    if (cleanText === 'रामः वनं गच्छति।') {
      return {
        input: cleanText,
        transliteration: 'Rāmaḥ vanaṃ gacchati.',
        translation: 'Rama goes to the forest.',
        meaning: 'This sentence describes the action of Lord Rama traveling towards the forest. It is a simple subject-object-verb construction.',
        words: [
          {
            sanskrit: 'रामः',
            transliteration: 'Rāmaḥ',
            meaning: 'Rama',
            role: 'Subject',
            gender: 'Masculine',
            number: 'Singular',
            case: 'Nominative / Prathamā',
            root: 'Rāma',
            partOfSpeech: 'Noun',
          },
          {
            sanskrit: 'वनं',
            transliteration: 'vanaṃ',
            meaning: 'forest',
            role: 'Object/Destination',
            gender: 'Neuter',
            number: 'Singular',
            case: 'Accusative / Dvitīyā',
            root: 'vana',
            partOfSpeech: 'Noun',
          },
          {
            sanskrit: 'गच्छति',
            transliteration: 'gacchati',
            meaning: 'goes',
            role: 'Verb',
            person: 'Third Person (Prathama Purusha)',
            number: 'Singular',
            tense: 'Present (Laṭ Lakāra)',
            voice: 'Active (Kartari)',
            root: 'gam (गम्)',
            partOfSpeech: 'Verb',
          },
        ],
        grammar: {
          notes: 'Standard kartari prayoga (active voice) sentence.',
        },
        sandhi: [],
        samasa: [],
        structure: [
          { word: 'रामः', role: 'SUBJECT', transliteration: 'Rāmaḥ' },
          { word: 'वनं', role: 'OBJECT', transliteration: 'vanaṃ' },
          { word: 'गच्छति', role: 'VERB', transliteration: 'gacchati' },
        ],
        confidence: 0.99,
      };
    } else if (cleanText.includes('देवालयः')) {
        return {
            input: cleanText,
            transliteration: 'Devālayaḥ',
            translation: 'The temple',
            meaning: 'Refers to a temple or a house of gods.',
            words: [
                {
                    sanskrit: 'देवालयः',
                    transliteration: 'Devālayaḥ',
                    meaning: 'temple',
                    role: 'Subject',
                    gender: 'Masculine',
                    number: 'Singular',
                    case: 'Nominative / Prathamā'
                }
            ],
            grammar: { notes: '' },
            sandhi: [
                {
                    combined: 'देवालयः',
                    split: 'देव + आलयः',
                    type: 'Dīrgha Sandhi',
                    explanation: 'When "a" (अ) is followed by "ā" (आ), they combine to form a long "ā" (आ).',
                    isProbable: true
                }
            ],
            samasa: [
                {
                    compound: 'देवालयः',
                    split: 'देवानाम् आलयः',
                    type: 'Ṣaṣṭhī Tatpuruṣa',
                    explanation: 'A tatpurusha compound where the first word is in the genitive case (of the gods).',
                    meaning: 'Abode of the gods',
                    isProbable: true
                }
            ],
            structure: [
                { word: 'देवालयः', role: 'SUBJECT', transliteration: 'Devālayaḥ' }
            ],
            confidence: 0.95
        };
    }

    // Default mock response for other inputs
    return {
      input: cleanText,
      transliteration: 'Mocāḥ anuvādaḥ.',
      translation: '[Mock Translation] The sentence has been processed.',
      meaning: 'This is a mock meaning since no actual ML model is connected. In a production environment, this would contain the actual explanation of the sentence.',
      words: [
        {
          sanskrit: cleanText.split(' ')[0] || 'Unknown',
          transliteration: 'Unknown',
          meaning: 'Unknown mock word',
          role: 'Unknown',
        },
      ],
      grammar: {
        notes: 'Probabilistic grammatical analysis will be available here when the transformer model is connected.',
      },
      sandhi: [],
      samasa: [],
      structure: [],
      confidence: 0.5,
    };
  }
}

// Factory to get the translation provider
export function getTranslationProvider(): TranslationProvider {
  // Hardcoded to ALWAYS use the live Render API
  return new APITranslationProvider();
}
