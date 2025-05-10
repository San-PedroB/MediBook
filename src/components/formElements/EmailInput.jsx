function EmailInput({ value, onChange, label = "Correo electrónico" }) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type="email"
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default EmailInput;
  