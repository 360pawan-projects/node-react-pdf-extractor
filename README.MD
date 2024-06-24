# node-react-pdf-extractor

A simple npm package to extract text content from PDF files. It supports both local file paths and remote URLs.

## Requirements

- Node.js
- `node-fetch` package
- `pdftotext` utility from the Poppler library

## Installation

1. **Install Node.js** (if not already installed):

   - Download and install from [Node.js official website](https://nodejs.org/).

2. **Install `pdftotext`**:

   - On macOS, install via Homebrew:
     ```bash
     brew install poppler
     ```
   - On Ubuntu/Debian-based systems:
     ```bash
     sudo apt-get update
     sudo apt-get install poppler-utils
     ```
   - On Windows, download and install Poppler from [Poppler for Windows](http://blog.alivate.com.au/poppler-windows/). Ensure the directory containing `pdftotext.exe` is in your PATH.

**Install `PDF Extractor`**:

```bash
npm i node-react-pdf-extractor
```

## Usage

### Extract text from a remote PDF URL

```javascript
import { extractPdf } from "node-react-pdf-extractor";

const url =
  "https://file-examples.com/storage/fed5266c9966708dcaeaea6/2017/10/file-example_PDF_500_kB.pdf";

try {
  const data = extractPdf(url);
  console.log("============== DATA", data);
} catch (error) {
  console.log("============== ERROR", error);
}
```

### Extract text from a local PDF file

```javascript
import { extractPdf } from "node-react-pdf-extractor";

const url = "./test.pdf";

try {
  const data = extractPdf(url);
  console.log("============== DATA", data);
} catch (error) {
  console.log("============== ERROR", error);
}
```
