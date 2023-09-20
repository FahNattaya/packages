import * as ejs from 'ejs';
import * as fs from 'fs';
import * as htmlPdf from 'html-pdf';
import * as path from 'path';
import { EDocumentService } from '../src/modules/e-document/e-document.service';

jest.mock('fs');
jest.mock('path');
jest.mock('ejs');
jest.mock('html-pdf');

describe('PDF Generator', () => {
	beforeEach(() => {
		(path.resolve as jest.Mock).mockReturnValue('dummy/path');
		(fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from('dummy_data'));
		(ejs.renderFile as jest.Mock).mockImplementation((_, __, callback) => {
			callback(null, 'dummy_html');
		});
		console.log = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create contract', async () => {
		const body = {};
		const mockBuffer = Buffer.from('dummy_data');
		(htmlPdf.create as jest.Mock).mockReturnValue({
			toBuffer: (callback: (err: Error | null, buffer: Buffer) => void) => {
				callback(null, mockBuffer);
			},
		});

		const res = await EDocumentService.createEContract(body);
		expect(res).toEqual({
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: Buffer.from('dummy_data').toString('base64'),
		});
	});
});

describe('createPdfBuffer', () => {
	beforeEach(() => {
		console.log = jest.fn();
	});
	it('should create a PDF buffer', async () => {
		const mockBuffer = Buffer.from('test_buffer');
		(htmlPdf.create as jest.Mock).mockReturnValue({
			toBuffer: (callback: (err: Error | null, buffer: Buffer) => void) => {
				callback(null, mockBuffer);
			},
		});

		const html = '<h1>Test</h1>';
		const options = {
			format: 'A4' as const,
			type: 'jpeg' as const,
			quality: '100',
		};

		const result = await EDocumentService.createPdfBuffer(html, options);

		expect(result).toEqual(mockBuffer);
		expect(htmlPdf.create).toHaveBeenCalledWith(html, options);
	});

	it('should reject with error if PDF creation fails', async () => {
		const mockError = new Error('PDF creation failed');
		(htmlPdf.create as jest.Mock).mockReturnValue({
			toBuffer: (callback: (err: Error | null, buffer: Buffer) => void) => {
				callback(mockError, Buffer.from(''));
			},
		});

		const html = '<h1>Test</h1>';
		const options = {
			format: 'A4' as const,
			type: 'jpeg' as const,
			quality: '100',
		};

		await expect(EDocumentService.createPdfBuffer(html, options)).rejects.toEqual(mockError);
		expect(htmlPdf.create).toHaveBeenCalledWith(html, options);
	});
});
