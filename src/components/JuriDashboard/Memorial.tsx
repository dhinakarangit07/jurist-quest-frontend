"use client"

import { useState, useEffect, ReactNode, forwardRef, useRef } from "react"
import { Document, Page, pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download, XCircle, ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react"
import useJuryMemorials from "@/hooks/useJuryMemorials"
import { useSearchParams } from 'react-router-dom';
import MemorialUploadSkeleton from "@/components/skeleton/TeamDashboard/MemorialUploadSkeleton"
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Fixed PDFFlipbook Component
type PagesProps = {
  children: ReactNode;
};

const Pages = forwardRef<HTMLDivElement, PagesProps>(({ children }, ref) => (
  <div ref={ref} className="demoPage">
    <div>{children}</div>
  </div>
));
Pages.displayName = 'Pages';

function PDFFlipbook({ pdfUrl, onClose, title }) {
  const [numPages, setNumPages] = useState(0);
  const [flipBookKey, setFlipBookKey] = useState(Date.now());
  const [error, setError] = useState(null);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = window.innerWidth < 768;
  const [showUsageTip, setShowUsageTip] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const flipBookRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowUsageTip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  const goToPreviousPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current && currentPage < numPages - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const handleFlipChange = (e) => {
    setCurrentPage(e.data);
  };

  function onDocumentLoadSuccess({ numPages, ...documentData }) {
    setNumPages(numPages);
    setPdfDocument(documentData);
    setFlipBookKey(Date.now());
    setError(null);
    setIsLoading(false);
    console.log('PDF loaded successfully with', numPages, 'pages');
  }

  function onDocumentLoadError(error) {
    console.error('PDF loading failed:', error);
    setError('Failed to load PDF. Please try downloading the file or contact support.');
    setIsLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-50">
          <div className="text-white">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <div className="flex gap-2">
            {showUsageTip && (
              <div className="bg-white text-black p-3 rounded-lg shadow-lg mr-2 max-w-xs">
                <p className="font-medium">How to use:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Click and drag corners to flip pages</li>
                  <li>Hold Ctrl/Cmd + mouse wheel to zoom in/out</li>
                  <li>Click arrows on sides to navigate</li>
                  <li>Current zoom: {Math.round(zoomLevel * 100)}%</li>
                </ul>
              </div>
            )}
            <Button
              onClick={onClose}
              className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Close
            </Button>
          </div>
        </div>

        <div className="w-screen h-screen flex justify-center items-center relative">
          {/* Navigation Arrows */}
          {!isLoading && !error && numPages > 0 && (
            <>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg transition-all ${
                  currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= numPages - 1}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg transition-all ${
                  currentPage >= numPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}

          {error ? (
            <div className="text-white text-center p-4">
              <p>{error}</p>
              <Button
                onClick={onClose}
                className="mt-4 bg-slate-900 text-white rounded hover:bg-slate-800"
              >
                Close and Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="text-white text-center p-4">
              <p>Loading PDF...</p>
            </div>
          ) : numPages > 0 ? (
            <div 
              className="w-full pl-8 flex items-center justify-center overflow-hidden"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
            >
              <HTMLFlipBook
                key={flipBookKey}
                ref={flipBookRef}
                width={isMobile ? 300 : 550}
                height={isMobile ? 300 : 700}
                size="stretch"
                minWidth={315}
                maxWidth={550}
                minHeight={500}
                maxHeight={1100}
                showCover={true}
                drawShadow={false}
                mobileScrollSupport={false}
                startPage={0}
                usePortrait={isMobile}
                flippingTime={1000}
                maxShadowOpacity={0.5}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                className="flipbook-container"
                style={{ backgroundColor: 'transparent' }}
                onFlip={handleFlipChange}
                onChangeOrientation={() => setFlipBookKey(Date.now())}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Pages key={index}>
                    <Document file={pdfUrl}>
                      <Page
                        pageNumber={index + 1}
                        width={isMobile ? 330 : 550}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                    </Document>
                  </Pages>
                ))}
              </HTMLFlipBook>
            </div>
          ) : null}

          {/* Page indicator */}
          {!isLoading && !error && numPages > 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 text-black px-4 py-2 rounded-full shadow-lg">
              Page {currentPage + 1} of {numPages}
            </div>
          )}

          {/* Zoom controls */}
          {!isLoading && !error && numPages > 0 && (
            <div className="absolute top-20 right-4 flex flex-col gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.2))}
                className="bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg transition-all hover:scale-110"
                title="Zoom In"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.2))}
                className="bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg transition-all hover:scale-110"
                title="Zoom Out"
              >
                <Minus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="bg-white/80 hover:bg-white text-black rounded px-3 py-2 shadow-lg transition-all hover:scale-110 text-xs font-medium"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
            </div>
          )}
        </div>

        {/* Single Document component for loading - outside the flipbook */}
        <div style={{ display: 'none' }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          />
        </div>
      </div>
    </div>
  );
}

const Memorial = () => {
  const [searchParams] = useSearchParams();
  const teamCode = searchParams.get('teamCode') || '';
  const { juryMemorials, isLoading, error } = useJuryMemorials(teamCode);
  const [showFlipbook, setShowFlipbook] = useState(null);
  const [flipbookTitle, setFlipbookTitle] = useState(null);

  const handlePreview = (url: string, title: string) => {
    setShowFlipbook(url);
    setFlipbookTitle(title);
  }

  const handleClosePreview = () => {
    setShowFlipbook(null);
    setFlipbookTitle(null);
  }

  const handleGoBack = () => {
    // Navigate to /juri-dashboard without using Next.js Link
    window.location.href = "/juri-dashboard?view=team"
  }

  if (isLoading) {
    return <MemorialUploadSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Back button added here */}
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back to Dashboard</span>
        </Button>
      </div>

      <Card className="shadow-lg rounded-xl border border-gray-200">
        <CardHeader className="pb-6 border-b border-gray-200">
          <CardTitle className="text-3xl font-bold text-gray-900">Submitted Memorials</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Review and preview all memorial documents submitted by teams.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {juryMemorials.length > 0 ? (
              juryMemorials.map((memorial) => (
                <div
                  key={memorial.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0 flex-grow">
                    <FileText className="h-6 w-6 text-gray-700 shrink-0" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900 break-words">
                        {memorial.file.split("/").pop()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">{memorial.moot_problem_display}</span> -{" "}
                        {new Date(memorial.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="default"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-transparent"
                      onClick={() => handlePreview(`${import.meta.env.VITE_API_URL}${memorial.file}`, memorial.file.split("/").pop() || "Document Preview")}
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="default"
                      className="bg-[#2d4817] hover:bg-[#2a4015] text-white"
                      asChild
                    >
                      <a href={`${import.meta.env.VITE_API_URL}${memorial.file}`} download={memorial.file.split("/").pop()}>
                        <Download className="mr-2 h-5 w-5" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-medium">No memorials have been submitted yet.</p>
                <p className="text-md mt-2">Once teams upload their documents, they will appear here for review.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showFlipbook && (
        <PDFFlipbook 
          pdfUrl={showFlipbook} 
          onClose={handleClosePreview} 
          title={flipbookTitle}
        />
      )}
    </div>
  )
}

export default Memorial