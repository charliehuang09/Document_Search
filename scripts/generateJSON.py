from pypdf import PdfReader
import json
from tqdm import tqdm

reader = PdfReader("../data/TheHateYouGive.pdf")
pages = []
indexes = []
book = ''
for i, page in enumerate(tqdm(reader.pages)):
    text = page.extract_text()
    text = text.replace("\t", " ")
    pages.append({
        'data': text,
        'idx': i
    })
    book = book + text + "\n"
    indexes.append(len(book))

with open('../data/page.json', 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=4)

with open('../data/book.json', 'w', encoding='utf-8') as f:
    json.dump({
        'text': book,
        'pages_numbers': indexes
    }, f, ensure_ascii=False, indent=4)

