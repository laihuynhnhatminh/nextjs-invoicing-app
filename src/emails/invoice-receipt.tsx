import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface InvoiceReceiptEmailProps {
  invoiceId: number;
  name: string;
  date: string;
  value: number;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const InvoiceReceiptEmail = ({
  invoiceId,
  name,
  date,
  value,
}: InvoiceReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Apple Receipt</Preview>

    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row>
            <Column align="right" style={tableCell}>
              <Text style={heading}>Invoice {invoiceId}</Text>
            </Column>
          </Row>
        </Section>
        <Section style={informationTable}>
          <Row style={informationTableRow}>
            <Column colSpan={2}>
              <Section>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>APPLE ID</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: '#15c',
                        textDecoration: 'underline',
                      }}
                    >
                      {name}
                    </Link>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>INVOICE DATE</Text>
                    <Text style={informationTableValue}>{date}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>ORDER ID</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: '#15c',
                        textDecoration: 'underline',
                      }}
                    >
                      {invoiceId}
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
            <Column style={informationTableColumn} colSpan={2}>
              <Text style={informationTableLabel}>BILLED TO</Text>
              <Text style={informationTableValue}>
                Visa .... 7461 (Apple Pay)
              </Text>
              <Text style={informationTableValue}>{name}</Text>
              <Text style={informationTableValue}>2125 Chestnut St</Text>
              <Text style={informationTableValue}>San Francisco, CA 94123</Text>
              <Text style={informationTableValue}>USA</Text>
            </Column>
          </Row>
        </Section>
        <Section style={productTitleTable}>
          <Text style={productsTitle}>Invoice</Text>
        </Section>
        <Section>
          <Row>
            <Column style={{ width: '64px' }}>
              <Img
                src={`${baseUrl}/static/bird-icon.png`}
                width="64"
                height="64"
                alt="HBO Max"
                style={productIcon}
              />
            </Column>
            <Column style={{ paddingLeft: '22px' }}>
              <Text style={productTitle}>Invoice</Text>
              <Text style={productDescription}>XM-4000</Text>
            </Column>

            <Column style={productPriceWrapper} align="right">
              <Text style={productPrice}>{value}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine} />
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>{value}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={walletBottomLine} />
        <Text style={footerText}>
          1. 3% savings is earned as Daily Cash and is transferred to your Apple
          Cash card when transactions post to your Apple Card account. If you do
          not have an Apple Cash card, Daily Cash can be applied by you as a
          credit on your statement balance. 3% is the total amount of Daily Cash
          earned for these purchases. See the Apple Card Customer Agreement for
          more details on Daily Cash and qualifying transactions.
        </Text>
        <Text style={footerText}>2. Subject to credit approval.</Text>
        <Text style={footerText}>
          To access and use all the features of Apple Card, you must add Apple
          Card to Wallet on an iPhone or iPad with iOS or iPadOS 13.2 or later.
          Update to the latest version of iOS or iPadOS by going to Settings
          &gt; General &gt; Software Update. Tap Download and Install.
        </Text>
        <Text style={footerText}>
          Available for qualifying applicants in the United States.
        </Text>
        <Text style={footerText}>
          Apple Card is issued by Goldman Sachs Bank USA, Salt Lake City Branch.
        </Text>
        <Text style={footerText}>
          If you reside in the US territories, please call Goldman Sachs at
          877-255-5923 with questions about Apple Card.
        </Text>
        <Text style={footerTextCenter}>
          Privacy: We use a
          <Link href={`${baseUrl}`} style={footerLink}>
            {' '}
            Subscriber ID{' '}
          </Link>
          to provide reports to developers.
        </Text>
        <Text style={footerTextCenter}>
          Get help with subscriptions and purchases.
          <Link href={`${baseUrl}/dashboard`} style={footerLink}>
            Visit Apple Support.
          </Link>
        </Text>
        <Text style={footerTextCenter}>
          Learn how to{' '}
          <Link href={`${baseUrl}/manage-password`}>
            manage your password preferences
          </Link>{' '}
          for iTunes, Apple Books, and App Store purchases.
        </Text>

        <Text style={footerTextCenter}>
          {' '}
          You have the option to stop receiving email receipts for your
          subscription renewals. If you have opted out, you can still view your
          receipts in your account under Purchase History.
        </Text>
        <Text style={footerLinksWrapper}>
          <Link href={`${baseUrl}/terms-of-sale`}>Terms of Sale</Link> •{' '}
          <Link href={`${baseUrl}/privacy-policy`}>Privacy Policy </Link>
        </Text>
        <Text style={footerCopyright}>
          Copyright © 2025 Invoicipedia. <br />{' '}
          <Link href={`${baseUrl}`}>All rights reserved</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default InvoiceReceiptEmail;

InvoiceReceiptEmail.PreviewProps = {
  invoiceId: 107,
  name: 'Alan Turing',
  date: '12 Jan 2025',
  value: 200,
} as InvoiceReceiptEmailProps;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: '#ffffff',
};

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
  maxWidth: '100%',
};

const tableCell = { display: 'table-cell' };

const heading = {
  fontSize: '32px',
  fontWeight: '300',
  color: '#888888',
};

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
};

const informationTableRow = {
  height: '46px',
};

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
};

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
};

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
};

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
};

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText };

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
};

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
};

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
};

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
};

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
};

const productPriceLine = { margin: '30px 0 0 0' };

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
};

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' };

const walletBottomLine = { margin: '16px 0 16px 0' };

const footerText = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '0',
  lineHeight: 'auto',
  marginBottom: '16px',
};

const footerTextCenter = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  margin: '20px 0',
  lineHeight: 'auto',
  textAlign: 'center' as const,
};

const footerLink = { color: 'rgb(0,115,255)' };

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
};

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
};
