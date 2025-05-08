import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//Micro componentes
import EmailInput from './forms/EmailInput';
import PasswordInput from './forms/PasswordInput';
import ErrorMessage from './forms/ErrorMessage';
import { triggerAnimation } from '../utils/animationUtils';

//Hooks
import useFormField from '../hooks/useFormField';

//Utils
import { validateFields } from '../utils/formUtils';


function LoginForm() {
  const emailField = useFormField();
  const passwordField = useFormField();
  const [errorMessage, setErrorMessage] = useState ('')
  const errorRef = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateFields([emailField.value, passwordField.value])) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, 'animate__headShake');
      return;
    }
  };
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
          <EmailInput {...emailField} label="Correo electrónico"/>
          <PasswordInput {...passwordField} label="Contraseña"/>
          <ErrorMessage
            message={errorMessage}
            forwardedRef={errorRef}
          />
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
            <div className="text-center mt-3">
              <Link to="/register" className="btn btn-link">¿Quieres registrar a tu empresa? Click aquí</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
export default LoginForm;
