import Container from './Container';

export default function Footer() {
  return (
    <footer className="mb-8 mt-6">
      <Container className="flex justify-between gap-4">
        <p>Invoicipedia &copy; {new Date().getFullYear()}</p>
        <p>Created and copied by Himemiya Cafe (Minh Lai Huynh Nhat)</p>
      </Container>
    </footer>
  );
}
