const Footer = () => {

  return (
    <>
      <footer className="p-4 text-center border-t">
        <p>
          &copy; {new Date().getFullYear()} Banco Rossum. Todos los derechos
          reservados
        </p>
      </footer>
    </>
  );
};

export default Footer;
