function SubmitButton({ isSubmitting, text = "Enviar" }) {
    return (
      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : text}
      </button>
    );
  }
  
  export default SubmitButton;
  