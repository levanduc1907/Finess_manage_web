import { remark } from 'remark';
import remarkHtml from 'remark-html';

import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

export type TError = {
  error: string;
  message: string | string[];
  statusCode: number;
};
export const formatErrorMessage = (error: TError) => {
  if (Array.isArray(error?.message))
    return error?.message?.map((item: string) => item)?.join(', ');
  return error?.message;
};

export const addPrefixApplicantSTTNo = (
  uid: string | undefined,
  i18nPrefix: string,
) => {
  return uid ? `${i18nPrefix} ${uid?.toString()?.padStart(2, '0')}` : '';
};

export const isEmpty = (value: null | undefined | string | object) => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    Object.keys(value).length === 0
  );
};

export const convertStringToPairs = (inputStringLikeTuple: string) => {
  if (!inputStringLikeTuple) return [];

  // Remove parentheses and split by comma
  const locations = inputStringLikeTuple.replace(/[()]/g, '').split(', ');

  // Create an array to store pairs
  const pairs = [];

  // Iterate through locations and create pairs
  for (let i = 0; i < locations.length; i += 2) {
    pairs.push(`(${locations[i]}, ${locations[i + 1]})`);
  }

  return pairs;
};

export const calculateIncomeTax = (
  monthlyIncome: number,
  socialInsurance: number,
  unemploymentInsurance: number,
): number => {
  // Thu nhập chịu thuế = Thu nhập hàng tháng - Đóng bảo hiểm xã hội - Đóng bảo hiểm thất nghiệp
  const taxableIncome = monthlyIncome - socialInsurance - unemploymentInsurance;

  // Mức thuế suất tương ứng
  let taxRate: number;
  if (taxableIncome <= 1950000) {
    taxRate = 0.05;
  } else if (taxableIncome <= 3300000) {
    taxRate = 0.1;
  } else if (taxableIncome <= 6950000) {
    taxRate = 0.2;
  } else if (taxableIncome <= 9000000) {
    taxRate = 0.23;
  } else if (taxableIncome <= 18000000) {
    taxRate = 0.33;
  } else {
    taxRate = 0.45;
  }

  // Thuế thu nhập cá nhân = Thu nhập chịu thuế * Thuế suất
  const incomeTax = taxableIncome * taxRate;

  return incomeTax;
};

export function markdownToHtml(markdownText: string) {
  const file = remark().use(remarkHtml).processSync(markdownText);
  return String(file);
}

export function htmlToMarkdown(htmlText: string) {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlText);

  return String(file);
}
