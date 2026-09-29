import sqlite3

def build_database():
    conn = sqlite3.connect('sanskrit_dictionary.db')
    cursor = conn.cursor()

    # Create table for Sanskrit words
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS dictionary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sanskrit TEXT NOT NULL,
        transliteration TEXT,
        meaning TEXT NOT NULL,
        part_of_speech TEXT,
        root TEXT
    )
    ''')

    # Clear existing data just in case
    cursor.execute('DELETE FROM dictionary')

    # Basic common vocabulary database
    vocabulary = [
        # Pronouns & Basics
        ("अहम्", "aham", "I", "Pronoun", "asmad"),
        ("त्वम्", "tvam", "You", "Pronoun", "yuṣmad"),
        ("सः", "saḥ", "He", "Pronoun", "tad"),
        ("सा", "sā", "She", "Pronoun", "tad"),
        ("तत्", "tat", "That", "Pronoun", "tad"),
        ("एषः", "eṣaḥ", "This (he)", "Pronoun", "etad"),
        ("किम्", "kim", "What", "Pronoun", "kim"),
        
        # Nouns
        ("रामः", "rāmaḥ", "Rama", "Noun", "rāma"),
        ("बालकः", "bālakaḥ", "boy", "Noun", "bālaka"),
        ("नरः", "naraḥ", "man", "Noun", "nara"),
        ("नारी", "nārī", "woman", "Noun", "nārī"),
        ("मित्रम्", "mitram", "friend", "Noun", "mitra"),
        ("वनम्", "vanam", "forest", "Noun", "vana"),
        ("वनं", "vanaṃ", "forest", "Noun", "vana"),
        ("पुस्तकम्", "pustakam", "book", "Noun", "pustaka"),
        ("पुस्तकं", "pustakaṃ", "book", "Noun", "pustaka"),
        ("विद्या", "vidyā", "knowledge", "Noun", "vidyā"),
        ("ज्ञानम्", "jñānam", "knowledge/wisdom", "Noun", "jñāna"),
        ("जलम्", "jalam", "water", "Noun", "jala"),
        ("अग्निः", "agniḥ", "fire", "Noun", "agni"),
        ("सूर्यः", "sūryaḥ", "sun", "Noun", "sūrya"),
        ("चन्द्रः", "candraḥ", "moon", "Noun", "candra"),
        ("देवः", "devaḥ", "god", "Noun", "deva"),
        ("देवालयः", "devālayaḥ", "temple", "Noun", "devālaya"),
        
        # Verbs (Present tense 3rd person singular forms mostly for simplicity)
        ("गच्छति", "gacchati", "goes", "Verb", "gam"),
        ("आगच्छति", "āgacchati", "comes", "Verb", "ā+gam"),
        ("पठति", "paṭhati", "reads", "Verb", "paṭh"),
        ("लिखति", "likhati", "writes", "Verb", "likh"),
        ("पश्यति", "paśyati", "sees", "Verb", "dṛś"),
        ("ददाति", "dadāti", "gives", "Verb", "dā"),
        ("खादति", "khādati", "eats", "Verb", "khād"),
        ("पिबति", "pibati", "drinks", "Verb", "pā"),
        ("वदति", "vadati", "speaks", "Verb", "vad"),
        ("करोति", "karoti", "does/makes", "Verb", "kṛ"),
        ("अस्ति", "asti", "is", "Verb", "as"),
        ("भवति", "bhavati", "becomes/is", "Verb", "bhū"),
        
        # Adverbs / Particles
        ("तत्र", "tatra", "there", "Adverb", "tatra"),
        ("अत्र", "atra", "here", "Adverb", "atra"),
        ("कुत्र", "kutra", "where", "Adverb", "kutra"),
        ("सर्वत्र", "sarvatra", "everywhere", "Adverb", "sarvatra"),
        ("कथम्", "katham", "how", "Adverb", "katham"),
        ("च", "ca", "and", "Particle", "ca"),
        ("अपि", "api", "also/even", "Particle", "api"),
        ("न", "na", "no/not", "Particle", "na"),
        ("एव", "eva", "only/indeed", "Particle", "eva")
    ]

    cursor.executemany('''
        INSERT INTO dictionary (sanskrit, transliteration, meaning, part_of_speech, root)
        VALUES (?, ?, ?, ?, ?)
    ''', vocabulary)

    conn.commit()
    conn.close()
    print("Dictionary database successfully built with base vocabulary!")

if __name__ == "__main__":
    build_database()
