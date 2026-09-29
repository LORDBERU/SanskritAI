import sqlite3

def update_database():
    conn = sqlite3.connect('sanskrit_dictionary.db')
    cursor = conn.cursor()

    new_vocabulary = [
        ("ईश्वर्यः", "Īśvaryaḥ", "Ishvarya (Name)", "Noun", "Īśvarya"),
        ("ईश्वर्य", "Īśvarya", "Ishvarya (Name)", "Noun", "Īśvarya"),
        ("आदिलः", "Ādilaḥ", "Adil (Name)", "Noun", "Ādila"),
        ("आदिल", "Ādila", "Adil (Name)", "Noun", "Ādila"),
    ]

    cursor.executemany('''
        INSERT OR IGNORE INTO dictionary (sanskrit, transliteration, meaning, part_of_speech, root)
        VALUES (?, ?, ?, ?, ?)
    ''', new_vocabulary)

    conn.commit()
    conn.close()
    print("Dictionary database successfully updated with names!")

if __name__ == "__main__":
    update_database()
