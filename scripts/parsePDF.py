import pypdf
from pypdf import PdfReader
from tqdm import tqdm

reader = PdfReader("../data/TheHateYouGive.pdf")
book = ""
for pages in tqdm(reader.pages):
    text = pages.extract_text()
    text = text.replace("\t", " ")
    book = book + text

writer = open("../data/TheHateYouGive.txt", "w")
writer.write(book)
writer.close()