import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface InvoicePaymentEmailProps {
  invoiceId: number;
}

const baseUrl = process.env.VERCEL_URL ? process.env.VERCEL_URL : '';

export const InvoicePaymentEmail = ({
  invoiceId,
}: InvoicePaymentEmailProps) => (
  <Html>
    <Head />
    <Preview>New Invoice</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Invoice {invoiceId}</Heading>
        <Text style={paragraph}>
          You have a new invoice due for payment. Please go to the link below
          and pay the invoice.
        </Text>
        <Section style={buttonContainer}>
          <Button
            style={button}
            href={`${baseUrl}/invoices/${invoiceId}/payment`}
          >
            Pay Invoice
          </Button>
        </Section>
        <Hr style={hr} />
        <Link href={`${baseUrl}`} style={reportLink}>
          NextJS Invoice App
        </Link>
      </Container>
    </Body>
  </Html>
);

InvoicePaymentEmail.PreviewProps = {
  invoiceId: 107,
} as InvoicePaymentEmailProps;

export default InvoicePaymentEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};

const buttonContainer = {
  padding: '27px 0 27px',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '11px 23px',
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc',
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px',
};
