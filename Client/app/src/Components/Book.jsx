import React, { useState, useEffect } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import HTMLFlipBook from 'react-pageflip';
import axios from 'axios';
import './Book.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Book = () => {
  const [numPages, setNumPages] = useState(null);
  const [pdf, setPdf] = useState(null);

 
    // Fetch the PDF file 
    useEffect(() => {
        const fetchPdf = async () => {
          try {
            const response = await axios.get('book.pdf', { responseType: 'blob' });
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            setPdf(fileURL);
          } catch (error) {
            console.error('Error fetching the PDF:', error);
          }
        };
        fetchPdf();
      }, []);
      
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

 return (
  <div className="book-container">
    {pdf && (
      <HTMLFlipBook    width={400} 
      height={700} 
      size="stretch" 
      minWidth={200} 
      maxWidth={1000} 
      minHeight={400} 
      maxHeight={1500} 
      maxShadowOpacity={0.5} 
      showCover={true} 
      mobileScrollSupport={false} > 
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} className="page">
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} />
            </Document>
          </div>
        ))}
      </HTMLFlipBook>
    )}
  </div>
);
};

export default Book;
