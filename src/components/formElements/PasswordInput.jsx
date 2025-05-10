function PasswordInput({ value, onChange, label = "Contraseña" }) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type="password"
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default PasswordInput;
  