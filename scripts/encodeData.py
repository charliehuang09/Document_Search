import os
import threading

from tqdm import tqdm, trange
import numpy as np
from dotenv import load_dotenv

from langchain_community.document_loaders import TextLoader, UnstructuredPDFLoader, UnstructuredRSTLoader, UnstructuredMarkdownLoader
from pypdf import PdfReader
from langchain_openai.embeddings import OpenAIEmbeddings

from langchain.text_splitter import TokenTextSplitter

from unstructured.cleaners.core import replace_unicode_quotes
from unstructured.cleaners.core import clean
from unstructured.cleaners.core import clean_extra_whitespace
from unstructured.cleaners.core import clean_non_ascii_chars

def clean(text):
    text.replace("\t", " ")
    return text

def main():
    path = "../data/TheHateYouGive.txt"
    output_path = "../data/TheHateYouGive.npy"
    chunk_size = 500
    text_splitter = TokenTextSplitter(chunk_size=chunk_size,
        chunk_overlap=10)
    embeddings_model = OpenAIEmbeddings(
            model="text-embedding-3-large", dimensions=3072)

    loader = TextLoader(path)
    text = loader.load()

    for i in trange(len(text)):
        text[i].page_content = clean(text[i].page_content)
    texts = text_splitter.split_documents(text)

    documents = [] 

    for text in tqdm(texts):
        vector = embeddings_model.embed_query(text.page_content)
        documents.append({"vector": vector, "document": text})

    np.save(output_path, np.asarray(documents, dtype=object))

if __name__ == "__main__":
    main()

