// src/views/Register.jsx

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerAgent } from "../services/firebaseService";
import { auth } from "../firebase/firebaseConfig";

// Microcomponentes
import NameInput from "../components/formElements/NameInput";
import EmailInput from "../components/formElements/EmailInput";
import PasswordInput from "../components/formElements/PasswordInput";
import AuthForm from "../components/AuthForm";

// Utils y hooks
import useFormField from "../hooks/useFormField";
import { validateFields } from "../utils/formUtils";
import { passwordsMatch } from "../utils/passwordUtils";
import { triggerAnimation } from "../utils/animationUtils";

function Register() {
  const fullName = useFormField();
  const email = useFormField();
  const password = useFormField();
  const confirmPassword = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [fullName.value, email.value, password.value, confirmPassword.value];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    if (!passwordsMatch(password.value, confirmPassword.value)) {
      setErrorMessage("Las contraseñas no coinciden");
      triggerAnimation(errorRef, "animate__headShake");
      password.reset();
      confirmPassword.reset();
      return;
    }

    setIsSubmitting(true);

    try {
      const currentUser = auth.currentUser;
      await registerAgent({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        companyId: `company-${currentUser.uid}`,
      });

      navigate("/admin-dashboard");
    } catch (error) {
      setErrorMessage("Error al registrar agente");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registrar Agente</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={[
            <NameInput key="name" {...fullName} label="Nombre completo" />,
            <EmailInput key="email" {...email} label="Correo electrónico" />,
            <PasswordInput key="password" {...password} label="Contraseña" />,
            <PasswordInput key="confirm" {...confirmPassword} label="Confirmar contraseña" />,
          ]}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Registrar Agente"
        />
      </div>
    </div>
  );
}

export default Register;
