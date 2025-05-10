function NameInput({ value, onChange, label = "Nombre" }) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default NameInput;
  