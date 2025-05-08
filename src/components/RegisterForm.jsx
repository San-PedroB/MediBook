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
import useFormField from '../hooks/useFormField';

//-------------------------------------------------------------------

function RegisterForm() {
  const fullName = useFormField();
  const email = useFormField();
  const password = useFormField();
  const confirmPassword = useFormField();
  const companyName = useFormField();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef(null); // 👈 ref para el mensaje

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [fullName.value, email.value, password.value, confirmPassword.value, companyName.value];

    if(!validateFields(fields)){
      setErrorMessage("Complete todo los campos")
      triggerAnimation(errorRef, 'animate__headShake');
      return;
    }

    if(!passwordsMatch(password.value, confirmPassword.value)){
      setErrorMessage("Las contraseñas no coinciden");
      triggerAnimation(errorRef, 'animate__headShake');

      password.reset();
      confirmPassword.reset();
      return;
    }

    setIsSubmitting(true);

    try {
      await registerAdmin({ fullName:fullName.value, email:email.value, password:password.value, companyName:companyName.value });
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
          <NameInput {...fullName} label="Nombre completoooooo"/>
          <EmailInput {...email} label="Correo electrssssógggggnico" />
          <PasswordInput {...password} label="Contraseña" />
          <PasswordInput {...confirmPassword} label="Confirmar Contraseña" />
          <NameInput {...companyName} label="Nombre de la empresa" />
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
