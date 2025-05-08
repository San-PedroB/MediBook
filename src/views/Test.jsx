import { useState } from 'react';

function TestInput() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    console.log("Evento completo:", e); // 🔍 Muestra el evento entero
    console.log("Elemento HTML:", e.target); // 🔍 El input
    console.log("Nuevo valor:", e.target.value); // 🔍 El texto ingresado
    setName(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h3>Escribe tu nombre</h3>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={handleChange}
        placeholder="Ingresa tu nombre"
      />
      <p className="mt-2">Estado actual: {name}</p>
    </div>
  );
}

export default TestInput;
