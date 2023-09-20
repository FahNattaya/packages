import { load } from 'cheerio';
import ejs from 'ejs';
import fs from 'fs';
import htmlPdf from 'html-pdf';
import moment from 'moment';
import 'moment/locale/th';
import path from 'path';
import phantom from 'phantomjs-prebuilt';
moment.locale('th');

export class EDocumentService {
	static getFileAsBase64 = (filePath: string): string => {
		const file = fs.readFileSync(path.resolve(__dirname, filePath));
		return Buffer.from(file).toString('base64');
	};

	static renderHtml = async (data: any): Promise<string> => {
		const templateData = {
			...data,
			logo: data.dataImageURI,
			font1: data.dataFontURI,
			font2: data.dataFontWebFontURI,
			bootstrap: data.dataCSSURI,
			style: data.dataStyleURI,
		};

		return new Promise((resolve, reject) => {
			ejs.renderFile(path.resolve(__dirname, '../../templates/html/template.html'), templateData, (err, html) => {
				if (err) {
					reject(err);
				} else {
					resolve(load(html).html());
				}
			});
		});
	};

	static createPdfBuffer = async (html: string, options: htmlPdf.CreateOptions): Promise<Buffer> => {
		const pdfCreate = htmlPdf.create(html, options);

		return new Promise((resolve, reject) => {
			pdfCreate.toBuffer((err: Error | null, buffer: Buffer) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer);
				}
			});
		});
	};

	static createEContract = async (body: any): Promise<any> => {
		const dataImageURI = `data:image/png;base64,${EDocumentService.getFileAsBase64(
			'../../templates/assets/images/awn_logo.png',
		)}`;
		const dataFontURI = `data:font/woff;base64,${EDocumentService.getFileAsBase64(
			'../../templates/assets/fonts/db_helvethaica_x_med_v3.2.woff',
		)}`;
		const dataFontWebFontURI = `data:font/woff;base64,${EDocumentService.getFileAsBase64(
			'../../templates/assets/fonts/db_helvethaicaais_x_v3.2-webfont.woff',
		)}`;
		const dataCSSURI = `data:text/css;base64,${EDocumentService.getFileAsBase64(
			'../../templates/assets/css/bootstrap.css',
		)}`;
		const dataStyleURI = `data:text/css;base64,${EDocumentService.getFileAsBase64(
			'../../templates/assets/css/style.css',
		)}`;

		const bodyData = {
			...body,
			toDay: moment()
				.year(moment().year() + 543)
				.format('DD MMM YYYY'),
		};
		const html = await EDocumentService.renderHtml({
			...bodyData,
			dataImageURI,
			dataFontURI,
			dataFontWebFontURI,
			dataCSSURI,
			dataStyleURI,
		});

		const options = {
			format: 'A4' as const,
			type: 'jpeg' as const,
			quality: '100',
			phantomPath: phantom.path,
		};

		const buffer = await EDocumentService.createPdfBuffer(html, options);
		const response = {
			resultCode: '20000',
			resultDescription: 'Success',
			developerMessage: 'Success',
			data: buffer.toString('base64'),
		};
		return response;
	};
}
