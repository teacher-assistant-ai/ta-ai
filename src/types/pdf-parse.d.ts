declare module "pdf-parse/lib/pdf-parse" {
  interface PDFParseResult {
    text: string;
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }

  function PDFParse(
    dataBuffer: Buffer | Uint8Array,
    options?: any
  ): Promise<PDFParseResult>;
  export default PDFParse;
}
