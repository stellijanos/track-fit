class PdfResponse {
    constructor(buffer, filename) {
        this.pdfBuffer = buffer;
        this.name = 'PdfResponse';
        this.filename = filename;
    }
}

module.exports = PdfResponse;
