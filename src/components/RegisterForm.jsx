import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/firebaseService';

//Micro componentes
import NameInput from './forms/NameInput';
import EmailInput from './forms/EmailInput';
import PasswordInput from './forms/PasswordInput';
import SubmitButton from './forms/SubmitButton';
import ErrorMessage from './forms/ErrorMessage';
import { triggerAnimation } from '../utils/animationUtils';


//Utils
import { passwordsMatch } from '../utils/passwordUtils';
import { validateFields } from '../utils/formUtils';

//-------------------------------------------------------------------

function RegisterForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef(null); // 👈 ref para el mensaje

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [fullName, email, password, confirmPassword, companyName];

    if(!validateFields(fields)){
      setErrorMessage("Complete todo los campos")
      triggerAnimation(errorRef, 'animate__headShake');
      return;
    }

    if(!passwordsMatch(password, confirmPassword)){
      setErrorMessage("Las contraseñas no coinciden");
      triggerAnimation(errorRef, 'animate__headShake');

      setPassword('');
      setConfirmPassword('');
      return;
    }

    setIsSubmitting(true);

    try {
      await registerAdmin({ fullName, email, password, companyName });
      console.log("Administrador registrado exitosamente 🚀");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar administrador:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={handleRegister}>
          <NameInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Nombre completo"
          />
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} label="Correo electrónico" />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Contraseña" />
          <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirmar contraseña" />
          <NameInput value={companyName} onChange={(e) => setCompanyName(e.target.value)} label="Nombre de la empresa" />
          <ErrorMessage message={errorMessage} forwardedRef={errorRef} />
          <div className="d-grid">
            <SubmitButton isSubmitting={isSubmitting} text="Registrarse" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
