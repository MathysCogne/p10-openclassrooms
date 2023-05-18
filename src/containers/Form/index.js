import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import "./style.scss";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const sendContact = useCallback(async (evt) => {
    evt.preventDefault();
    setSending(true);

    // We try to call mockContactApi
    try {
      await mockContactApi();
      setSending(false);
      setShowConfirmation(true);
    } catch (err) {
      setSending(false);
      onError(err);
    }
  }, [onSuccess, onError]);

  return (
    // Ajout d'une condition pour afficher le message de confirmation
    // Ajour de required sur le form 
    <form onSubmit={sendContact} required>
      {showConfirmation ? (
        <div className="message__cont">
          <p className="message__text">Votre message a été envoyé avec succès, merci à très vite :)</p>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <Field placeholder="" label="Nom" required/>
            <Field placeholder="" label="Prénom" required/>
            <Select
              selection={["Personel", "Entreprise"]}
              onChange={() => null}
              label="Personel / Entreprise"
              type="large"
              titleEmpty
            />
            <Field placeholder="" label="Email" required/>
            {/* Ajout d'une redirection vers onSuccess() */}
            <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} onClick={() => onSuccess()}>
              {sending ? "En cours" : "Envoyer"}
            </Button>
          </div>
          <div className="col">
            <Field
              placeholder="message"
              label="Message"
              type={FIELD_TYPES.TEXTAREA}
              required
            />
          </div>
        </div>
      )}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
