import pypdf

reader = pypdf.PdfReader(r"c:\Users\PC\Desktop\collaborate\eclipse\src\assets\pics\Copy of event poster.pdf")
with open("pdf_output.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(reader.pages):
        f.write(f"--- PAGE {i+1} ---\n")
        f.write(page.extract_text() + "\n")
